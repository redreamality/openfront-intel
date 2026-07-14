import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE_ORIGIN = 'https://openfront.fyi';

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function routeForFile(file) {
  const path = relative(DIST, file).split(sep).join('/');
  if (path === 'index.html') return '/';
  if (path.endsWith('/index.html')) return `/${path.slice(0, -'index.html'.length)}`;
  return `/${path}`;
}

function candidateFiles(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return [];
  }

  const relativePath = decoded.replace(/^\/+/, '');
  const direct = resolve(DIST, relativePath);
  if (direct !== DIST && !direct.startsWith(`${DIST}${sep}`)) return [];

  if (decoded.endsWith('/')) return [join(direct, 'index.html'), `${direct}.html`];
  return [direct, `${direct}.html`, join(direct, 'index.html')];
}

if (!existsSync(DIST)) {
  console.error('[links] dist/ does not exist. Run pnpm build first.');
  process.exit(1);
}

const htmlFiles = walk(DIST).filter((file) => file.endsWith('.html'));
const failures = new Set();
let checkedLinks = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const pageUrl = new URL(routeForFile(file), SITE_ORIGIN);
  const hrefPattern = /<(?:a|link)\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi;

  for (const match of html.matchAll(hrefPattern)) {
    const href = match[2].trim();
    if (!href || href.startsWith('#')) continue;

    let target;
    try {
      target = new URL(href, pageUrl);
    } catch {
      failures.add(`${routeForFile(file)} -> invalid URL: ${href}`);
      continue;
    }

    if (target.origin !== SITE_ORIGIN) continue;
    checkedLinks += 1;

    if (target.pathname === '/openfront-intel' || target.pathname.startsWith('/openfront-intel/')) {
      failures.add(`${routeForFile(file)} -> legacy deployment path: ${href}`);
      continue;
    }

    if (!candidateFiles(target.pathname).some(existsSync)) {
      failures.add(`${routeForFile(file)} -> missing target: ${href}`);
    }
  }
}

if (failures.size > 0) {
  console.error(`[links] ${failures.size} broken internal link(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`[links] checked ${checkedLinks} internal hrefs across ${htmlFiles.length} HTML files; no broken links found.`);
