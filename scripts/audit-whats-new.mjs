import { readdir, readFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';

const root = resolve('src/content/whatsNew');
const languages = ['en', 'fr', 'de', 'nl', 'zh'];
const allowedSource = /^https:\/\/github\.com\/openfrontio\/OpenFrontIO\/(pull|issues|releases|blob|commit)\//;
const statuses = new Set(['released', 'merged', 'in-development', 'watching']);
const files = (await readdir(root)).filter((file) => file.endsWith('.json')).sort();
const failures = [];

async function collectFiles(directory, extension) {
  const result = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) result.push(...(await collectFiles(path, extension)));
    else if (item.name.endsWith(extension)) result.push(path);
  }
  return result;
}

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

for (const file of files) {
  const relative = `src/content/whatsNew/${file}`;
  let entry;
  try {
    entry = JSON.parse(await readFile(resolve(relative), 'utf8'));
  } catch (error) {
    fail(relative, `invalid JSON (${error.message})`);
    continue;
  }

  const expectedId = basename(file, '.json');
  if (entry.id !== expectedId) fail(relative, `id must match filename (${expectedId})`);
  if (!statuses.has(entry.status)) fail(relative, `unsupported status ${entry.status}`);
  if (!entry.impact) fail(relative, 'impact is required');
  for (const key of ['firstSeenAt', 'verifiedAt']) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry[key] ?? '') || Number.isNaN(Date.parse(entry[key]))) {
      fail(relative, `${key} must be an ISO date`);
    }
  }
  if (entry.status === 'released') {
    if (!entry.releaseTag || !entry.releaseUrl) fail(relative, 'released entries require releaseTag and releaseUrl');
  } else if (!entry.reviewBy) {
    fail(relative, 'pre-release entries require reviewBy');
  }
  if (!/^[-a-z0-9]+(?:\/[-a-z0-9]+)*\/$/.test(entry.relatedPath ?? '')) fail(relative, 'relatedPath must be a relative trailing-slash path');
  if (!Array.isArray(entry.sources) || entry.sources.length === 0) fail(relative, 'at least one source is required');
  for (const source of entry.sources ?? []) {
    if (!allowedSource.test(source.url ?? '')) fail(relative, `source URL is outside the public OpenFrontIO repository: ${source.url}`);
  }
  for (const lang of languages) {
    if (!entry.locales?.[lang]?.title || !entry.locales?.[lang]?.summary) fail(relative, `missing ${lang} title or summary`);
  }
}

const publicFiles = [
  ...(await collectFiles(resolve('src/content/changelog'), '.mdx')),
  ...(await collectFiles(resolve('src/content/guides'), '.mdx')),
  ...(await collectFiles(resolve('src/pages'), '.astro')),
];
for (const path of publicFiles) {
  const relative = path.replaceAll('\\', '/');
  const source = await readFile(path, 'utf8');
  if (/https:\/\/github\.com\/openfrontio\/OpenFrontIO\/(pull|issues)\//.test(source)) {
    fail(relative, 'public version articles must not expose Issue or PR URLs');
  }
}

console.log(`What's New audit: ${files.length} internal entries, ${publicFiles.length} public files`);
if (failures.length > 0) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS internal sources are validated and public articles contain no Issue or PR URLs`);
}
