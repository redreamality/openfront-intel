import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE_ORIGIN = 'https://openfront.fyi';
const DESCRIPTION_MIN = 110;
const DESCRIPTION_MAX = 160;
const TITLE_MIN = 15;
const REQUIRED_OG = ['og:title', 'og:type', 'og:image', 'og:url'];
const REQUIRED_HREFLANGS = ['en', 'fr', 'nl', 'de', 'zh-CN', 'x-default'];

function walkFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walkFiles(path) : [path];
  });
}

function walkNodes(node, visit) {
  visit(node);
  for (const child of node.childNodes ?? []) walkNodes(child, visit);
  if (node.content) walkNodes(node.content, visit);
}

function attributes(node) {
  return Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
}

function textContent(node) {
  if (node.nodeName === '#text') return node.value ?? '';
  return (node.childNodes ?? []).map(textContent).join('');
}

function elements(document, tagName) {
  const matches = [];
  walkNodes(document, (node) => {
    if (node.tagName === tagName) matches.push(node);
  });
  return matches;
}

function routeForFile(file) {
  const path = relative(DIST, file).split(sep).join('/');
  if (path === 'index.html') return '/';
  if (path === '404.html') return '/404/';
  if (path.endsWith('/index.html')) return `/${path.slice(0, -'index.html'.length)}`;
  return `/${path}`;
}

function canonicalPathname(pathname) {
  if (pathname === '/') return pathname;
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function parsePage(file) {
  const html = readFileSync(file, 'utf8');
  const document = parse(html);
  const route = routeForFile(file);
  const title = elements(document, 'title').map(textContent).join('').trim();
  const headings = elements(document, 'h1').map(textContent).map((value) => value.trim()).filter(Boolean);
  const metas = elements(document, 'meta').map(attributes);
  const links = elements(document, 'link').map(attributes);
  const anchors = elements(document, 'a').map(attributes);
  const images = elements(document, 'img').map(attributes);
  const robots = metas.find((meta) => meta.name?.toLowerCase() === 'robots')?.content?.toLowerCase() ?? '';
  const description = metas.find((meta) => meta.name?.toLowerCase() === 'description')?.content?.trim() ?? '';
  const canonical = links.find((link) => link.rel?.toLowerCase() === 'canonical')?.href ?? '';
  const alternates = links.filter((link) => link.rel?.toLowerCase() === 'alternate' && link.hreflang && link.href);
  const openGraph = new Map(
    metas
      .filter((meta) => meta.property?.toLowerCase().startsWith('og:'))
      .map((meta) => [meta.property.toLowerCase(), meta.content?.trim() ?? '']),
  );

  return {
    anchors,
    alternates,
    canonical,
    description,
    file,
    headings,
    htmlBytes: Buffer.byteLength(html),
    images,
    indexable: !robots.includes('noindex'),
    openGraph,
    route,
    title,
  };
}

function addIssue(issues, name, route, detail) {
  const entries = issues.get(name) ?? [];
  entries.push(detail ? `${route} (${detail})` : route);
  issues.set(name, entries);
}

if (!existsSync(DIST)) {
  console.error('[seo] dist/ does not exist. Run pnpm build first.');
  process.exit(1);
}

const htmlFiles = walkFiles(DIST).filter((file) => file.endsWith('.html'));
if (htmlFiles.length === 0) {
  console.error('[seo] dist/ contains 0 HTML files. Wait for pnpm build to finish.');
  process.exit(1);
}

const pages = htmlFiles.map(parsePage);
const indexablePages = pages.filter((page) => page.indexable);
const pagesByCanonical = new Map(indexablePages.map((page) => [new URL(page.route, SITE_ORIGIN).toString(), page]));
const pagesByPathname = new Map(indexablePages.map((page) => [page.route, page]));
const issues = new Map();

for (const page of indexablePages) {
  const titleMaximum = page.route.startsWith('/zh/') ? 40 : 68;
  if (!page.title) addIssue(issues, 'Title tag missing or empty', page.route);
  else if ([...page.title].length < TITLE_MIN) {
    addIssue(issues, 'Title too short', page.route, `${[...page.title].length} characters`);
  } else if ([...page.title].length > titleMaximum) {
    addIssue(issues, 'Title too long', page.route, `${[...page.title].length} characters`);
  } else if (page.title.includes('…')) {
    addIssue(issues, 'Title contains generated truncation', page.route, page.title);
  }

  const descriptionLength = [...page.description].length;
  if (!page.description) addIssue(issues, 'Meta description tag missing or empty', page.route);
  else if (descriptionLength < DESCRIPTION_MIN) {
    addIssue(issues, 'Meta description too short', page.route, `${descriptionLength} characters`);
  } else if (descriptionLength > DESCRIPTION_MAX) {
    addIssue(issues, 'Meta description too long', page.route, `${descriptionLength} characters`);
  }

  if (page.headings.length === 0) addIssue(issues, 'H1 tag missing or empty', page.route);
  else if (page.headings.length > 1) addIssue(issues, 'Multiple H1 tags', page.route, `${page.headings.length} headings`);

  const missingOpenGraph = REQUIRED_OG.filter((property) => !page.openGraph.get(property));
  if (missingOpenGraph.length > 0) {
    addIssue(issues, 'Open Graph tags incomplete', page.route, `missing ${missingOpenGraph.join(', ')}`);
  }

  const expectedCanonical = new URL(page.route, SITE_ORIGIN).toString();
  if (page.canonical !== expectedCanonical) {
    addIssue(issues, 'Canonical is not self-referencing', page.route, page.canonical || 'missing');
  }

  const hreflangs = new Map(page.alternates.map((alternate) => [alternate.hreflang, alternate.href]));
  const missingHreflangs = REQUIRED_HREFLANGS.filter((hreflang) => !hreflangs.has(hreflang));
  const extraHreflangs = [...hreflangs.keys()].filter((hreflang) => !REQUIRED_HREFLANGS.includes(hreflang));
  if (missingHreflangs.length > 0 || extraHreflangs.length > 0) {
    addIssue(
      issues,
      'Hreflang set incomplete',
      page.route,
      `missing=${missingHreflangs.join(',') || 'none'} extra=${extraHreflangs.join(',') || 'none'}`,
    );
  }

  for (const alternate of page.alternates) {
    const target = pagesByCanonical.get(alternate.href);
    if (!target) {
      addIssue(issues, 'Hreflang target missing or non-indexable', page.route, `${alternate.hreflang} -> ${alternate.href}`);
      continue;
    }
    const returns = target.alternates.some(({ href }) => href === expectedCanonical);
    if (!returns) {
      addIssue(issues, 'Missing reciprocal hreflang (no return-tag)', page.route, `${alternate.hreflang} -> ${alternate.href}`);
    }
  }
}

const sitemapFiles = walkFiles(DIST).filter((file) => /^sitemap-\d+\.xml$/.test(relative(DIST, file)));
const sitemapLocations = new Set();
const sitemapHreflangs = new Set();
for (const sitemapFile of sitemapFiles) {
  const xml = readFileSync(sitemapFile, 'utf8');
  for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) sitemapLocations.add(match[1]);
  for (const match of xml.matchAll(/<xhtml:link\b[^>]*\bhreflang="([^"]+)"/g)) sitemapHreflangs.add(match[1]);
}

for (const page of indexablePages) {
  const canonical = new URL(page.route, SITE_ORIGIN).toString();
  if (!sitemapLocations.has(canonical)) addIssue(issues, 'Indexable page not in sitemap', page.route);
}
for (const location of sitemapLocations) {
  if (!pagesByCanonical.has(location)) addIssue(issues, 'Sitemap URL is missing or non-indexable', new URL(location).pathname);
}
for (const hreflang of sitemapHreflangs) {
  if (!REQUIRED_HREFLANGS.includes(hreflang) && hreflang !== 'x-default') {
    addIssue(issues, 'Sitemap hreflang differs from HTML', '/sitemap-0.xml', hreflang);
  }
}

for (const hreflang of REQUIRED_HREFLANGS.filter((value) => value !== 'x-default')) {
  if (!sitemapHreflangs.has(hreflang)) {
    addIssue(issues, 'Sitemap hreflang differs from HTML', '/sitemap-0.xml', `missing ${hreflang}`);
  }
}

const incomingLinks = new Map(indexablePages.map((page) => [page.route, new Set()]));
for (const page of indexablePages) {
  const pageUrl = new URL(page.route, SITE_ORIGIN);
  for (const anchor of page.anchors) {
    const href = anchor.href?.trim();
    if (!href || href.startsWith('#') || /^(?:mailto|tel|javascript):/i.test(href)) continue;

    let target;
    try {
      target = new URL(href, pageUrl);
    } catch {
      continue;
    }

    const isSiteHostname = target.hostname === pageUrl.hostname || target.hostname === `www.${pageUrl.hostname}`;
    if (!isSiteHostname) continue;

    const normalizedPath = canonicalPathname(target.pathname);
    const targetPage = pagesByPathname.get(normalizedPath);
    if (target.protocol !== 'https:' || target.hostname !== pageUrl.hostname || (targetPage && target.pathname !== targetPage.route)) {
      addIssue(issues, 'Page has links to redirect', page.route, href);
    }

    if (targetPage && !anchor.rel?.toLowerCase().split(/\s+/).includes('nofollow')) {
      incomingLinks.get(targetPage.route).add(page.route);
    }
  }

  for (const image of page.images) {
    const source = image.src?.trim();
    if (!source) continue;
    let target;
    try {
      target = new URL(source, pageUrl);
    } catch {
      continue;
    }
    if (target.hostname === pageUrl.hostname && target.protocol !== 'https:') {
      addIssue(issues, 'Page has redirected image', page.route, source);
    }
  }
}

for (const [route, sources] of incomingLinks) {
  if (route === '/') continue;
  if (sources.size === 0) addIssue(issues, 'Indexable page has no dofollow incoming internal links', route);
  else if (sources.size === 1) {
    addIssue(issues, 'Page has only one dofollow incoming internal link', route, [...sources][0]);
  }
}

const largestPages = [...indexablePages]
  .sort((left, right) => right.htmlBytes - left.htmlBytes)
  .slice(0, 10)
  .map((page) => `${page.route} (${(page.htmlBytes / 1024).toFixed(1)} KiB)`);

console.log(`[seo] audited ${indexablePages.length} indexable pages across ${htmlFiles.length} HTML files.`);
console.log(`[seo] sitemap contains ${sitemapLocations.size} URLs; largest HTML pages: ${largestPages.join(', ')}`);

if (issues.size === 0) {
  console.log('[seo] no SEO contract violations found.');
} else {
  console.error(`[seo] ${issues.size} issue type(s) found:`);
  const verbose = process.argv.includes('--verbose');
  for (const [name, entries] of issues) {
    console.error(`\n${name}: ${entries.length}`);
    const visible = verbose ? entries : entries.slice(0, 20);
    for (const entry of visible) console.error(`- ${entry}`);
    if (!verbose && entries.length > visible.length) console.error(`- ... ${entries.length - visible.length} more (use --verbose)`);
  }
  process.exitCode = 1;
}
