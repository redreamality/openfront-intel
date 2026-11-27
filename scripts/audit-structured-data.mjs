import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { parse } from 'parse5';

const dist = resolve(process.argv[2] ?? 'dist');
const files = (directory) => readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => entry.isDirectory()
    ? files(join(directory, entry.name))
    : entry.name.endsWith('.html') ? [join(directory, entry.name)] : []);
const descendants = (node) => [node, ...(node.childNodes ?? []).flatMap(descendants)];
const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const text = (node) => node.nodeName === '#text'
  ? node.value : (node.childNodes ?? []).map(text).join('');
const siteOrigin = 'https://openfront.fyi';
let checked = 0;
let articles = 0;
const homeLanguages = new Set();
const failures = [];
const htmlFiles = files(dist);
assert.ok(htmlFiles.length > 0, 'Build output must contain HTML pages');

for (const file of htmlFiles) {
  try {
    const dom = descendants(parse(readFileSync(file, 'utf8')));
    if (dom.some((node) => node.tagName === 'meta'
      && attr(node, 'name') === 'robots' && attr(node, 'content')?.includes('noindex'))) continue;
    const canonical = attr(dom.find((node) => node.tagName === 'link'
      && attr(node, 'rel') === 'canonical'), 'href');
    // Astro redirect documents have no content or canonical metadata.
    if (!canonical && dom.some((node) => node.tagName === 'meta'
      && attr(node, 'http-equiv')?.toLowerCase() === 'refresh')) continue;
    assert.ok(canonical, 'Missing canonical');
    assert.equal(new URL(canonical).origin, siteOrigin);
    const scripts = dom.filter((node) => node.tagName === 'script'
      && attr(node, 'type') === 'application/ld+json');
    assert.ok(scripts.length > 0, 'Missing JSON-LD');
    const nodes = scripts.flatMap((node) => {
      const data = JSON.parse(text(node));
      assert.equal(data['@context'], 'https://schema.org');
      return data['@graph'] ?? [data];
    });
    const one = (type) => {
      const found = nodes.filter((node) => node['@type'] === type);
      assert.equal(found.length, 1, `Expected exactly one ${type}`);
      return found[0];
    };
    const organization = one('Organization');
    const website = one('WebSite');
    const pages = nodes.filter((node) => ['WebPage', 'CollectionPage', 'AboutPage', 'ContactPage']
      .includes(node['@type']));
    assert.equal(pages.length, 1, 'Expected exactly one page entity');
    const page = pages[0];
    assert.equal(organization['@id'], `${siteOrigin}/#organization`);
    assert.equal(organization.name, 'OpenFront Intel');
    assert.ok(organization.sameAs.length > 0, 'Missing publisher profiles');
    for (const href of organization.sameAs) {
      const profile = new URL(href);
      assert.equal(profile.protocol, 'https:');
      assert.equal(profile.search, '', 'Tracking parameters in sameAs');
      assert.ok(profile.pathname.toLowerCase().includes('openfrontintel'), 'Non-project sameAs');
      assert.notEqual(profile.hostname, 'openfront.io', 'Game is not the publisher');
    }
    assert.equal(website['@id'], `${siteOrigin}/#website`);
    assert.equal(website.publisher['@id'], organization['@id']);
    assert.equal(page['@id'], `${canonical}#webpage`);
    assert.equal(page.url, canonical);
    assert.equal(page.inLanguage, attr(dom.find((node) => node.tagName === 'html'), 'lang'));
    assert.equal(page.name, text(dom.find((node) => node.tagName === 'title')));
    assert.equal(page.description, attr(dom.find((node) => node.tagName === 'meta'
      && attr(node, 'name') === 'description'), 'content'));
    const path = new URL(canonical).pathname.replace(/^\/(?:zh|fr|de|nl)\//, '/');
    const expectedPageType = path === '/about/' ? 'AboutPage'
      : path === '/contact/' ? 'ContactPage'
      : /^\/(?:guides|strategies|maps|mechanics|database|changelog|whats-new)\/$/.test(path)
        ? 'CollectionPage' : 'WebPage';
    assert.equal(page['@type'], expectedPageType);
    const ids = new Set(nodes.map((node) => node['@id']).filter(Boolean));
    assert.equal(ids.size, nodes.filter((node) => node['@id']).length, 'Duplicate entity IDs');
    const checkRefs = (value) => {
      if (!value || typeof value !== 'object') return;
      if (Object.keys(value).length === 1 && value['@id']) {
        assert.ok(ids.has(value['@id']), `Unresolved reference ${value['@id']}`);
      }
      Object.values(value).forEach(checkRefs);
    };
    nodes.forEach(checkRefs);
    if (/^\/(?:(?:zh|fr|de|nl)\/)?$/.test(new URL(canonical).pathname)) {
      homeLanguages.add(page.inLanguage);
    }
    if (/^\/(?:guides|strategies|maps|changelog)\/.+\/$/.test(path)) {
      const article = one('Article');
      const heading = dom.find((node) => node.tagName === 'h1');
      assert.equal(article.headline, text(heading));
      assert.equal(article.mainEntityOfPage['@id'], page['@id']);
      assert.equal(page.mainEntity['@id'], article['@id']);
      assert.equal(article.author['@id'], organization['@id']);
      assert.equal(article.publisher['@id'], organization['@id']);
      assert.equal(article.inLanguage, page.inLanguage);
      assert.ok(article.image.every((url) => new URL(url).protocol === 'https:'));
      assert.ok(Number.isFinite(Date.parse(article.datePublished)), 'Missing/invalid published date');
      assert.ok(Date.parse(article.dateModified) >= Date.parse(article.datePublished), 'Invalid modified date');
      articles += 1;
    }
    const crumbs = nodes.filter((node) => node['@type'] === 'BreadcrumbList');
    assert.ok(crumbs.length <= 1, 'Duplicate BreadcrumbList');
    checked += 1;
  } catch (error) {
    failures.push(`${file}: ${error.message}`);
  }
}

assert.deepEqual([...homeLanguages].sort(), ['de', 'en', 'fr', 'nl', 'zh-CN']);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
}
console.log(`[schema] ${checked}/${checked + failures.length} pages passed; ${articles} articles; five homepages checked.`);
