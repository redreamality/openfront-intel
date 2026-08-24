import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const SITE_HOST = 'openfront.fyi';
const SITE_ORIGIN = `https://${SITE_HOST}`;
const INDEXNOW_KEY = '4aa3a7277ff993208d51a9063b1af3f2';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY_LOCATION = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;
const args = process.argv.slice(2).filter((argument) => argument !== '--');

function option(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function wait(milliseconds) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));
}

async function fetchWithRetry(url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
      if (response.ok) return response;
      lastError = new Error(`${url} returned ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < attempts) await wait(attempt * 3_000);
  }
  throw lastError;
}

async function readSitemap() {
  const sitemapFile = option('--sitemap-file');
  if (sitemapFile) return readFile(resolve(sitemapFile), 'utf8');

  const sitemapUrl = option('--sitemap-url') ?? `${SITE_ORIGIN}/sitemap-0.xml`;
  return (await fetchWithRetry(sitemapUrl)).text();
}

const sitemap = await readSitemap();
const urlList = [...new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]))];
const invalidUrls = urlList.filter((url) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol !== 'https:' || parsed.hostname !== SITE_HOST;
  } catch {
    return true;
  }
});

if (urlList.length === 0) throw new Error('Sitemap contains no URLs.');
if (urlList.length > 10_000) throw new Error(`IndexNow accepts at most 10,000 URLs; received ${urlList.length}.`);
if (invalidUrls.length > 0) throw new Error(`Sitemap contains invalid or off-site URLs: ${invalidUrls.join(', ')}`);

if (!args.includes('--submit')) {
  console.log(`[indexnow] dry run: validated ${urlList.length} URLs from ${urlList[0]} to ${urlList.at(-1)}.`);
  process.exit(0);
}

const publishedKey = await (await fetchWithRetry(KEY_LOCATION)).text();
if (publishedKey.trim() !== INDEXNOW_KEY) {
  throw new Error(`Published key file does not match ${KEY_LOCATION}.`);
}

const response = await fetch(INDEXNOW_ENDPOINT, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
  signal: AbortSignal.timeout(30_000),
});

if (response.status !== 200 && response.status !== 202) {
  throw new Error(`IndexNow submission failed with ${response.status}: ${(await response.text()).slice(0, 500)}`);
}

console.log(`[indexnow] submitted ${urlList.length} URLs; endpoint returned ${response.status}.`);
