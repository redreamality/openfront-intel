import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const LANGUAGES = ['en', 'fr', 'de', 'nl', 'zh'];
const CORE_PAGES = [
  { collection: 'guides', slug: 'first-match', latinMin: 8_000, hanMin: 10_000 },
  { collection: 'guides', slug: 'hotkeys', latinMin: 1_500, hanMin: 2_500 },
  { collection: 'guides', slug: 'water-nukes', latinMin: 1_500, hanMin: 2_500 },
  { collection: 'strategies', slug: 'economy-fundamentals', latinMin: 1_500, hanMin: 2_500 },
  { collection: 'strategies', slug: 'ffa-opening', latinMin: 1_500, hanMin: 2_500 },
  { collection: 'strategies', slug: 'nuclear-deterrence', latinMin: 1_500, hanMin: 2_500 },
  { collection: 'strategies', slug: 'team-naval-control', latinMin: 1_500, hanMin: 2_500 },
];

const strict = process.argv.includes('--strict');

function splitDocument(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: '', body: source };
  return { frontmatter: match[1], body: match[2] };
}

function plainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+[.)]\s+/gm, '')
    .replace(/[|>*_~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function latinWordCount(text) {
  return text.match(/[\p{L}\p{N}]+(?:['’‑-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

function hanCharacterCount(text) {
  return text.match(/\p{Script=Han}/gu)?.length ?? 0;
}

function longParagraphs(markdown) {
  return markdown
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .filter((block) => !/^(---|#{1,6}\s|```|>|[-*+]\s|\d+[.)]\s|\|)/.test(block))
    .map((block) => plainText(block))
    .filter((block) => [...block].length > 240);
}

function headingCount(markdown) {
  return markdown.match(/^#{2,4}\s+.+$/gm)?.length ?? 0;
}

async function auditPage(page, lang) {
  const relative = `src/content/${page.collection}/${lang}/${page.slug}.mdx`;
  const source = await readFile(resolve(relative), 'utf8');
  const { frontmatter, body } = splitDocument(source);
  const text = plainText(body);
  const count = lang === 'zh' ? hanCharacterCount(text) : latinWordCount(text);
  const minimum = lang === 'zh' ? page.hanMin : page.latinMin;
  const paragraphs = longParagraphs(body);
  const headings = headingCount(body);
  const hasUpdatedDate = /^updatedDate:\s*2026-07-16\s*$/m.test(frontmatter);
  return {
    relative,
    lang,
    count,
    minimum,
    headings,
    longParagraphs: paragraphs.length,
    hasUpdatedDate,
    passes: count >= minimum && headings >= 8 && paragraphs.length === 0 && hasUpdatedDate,
  };
}

const results = [];
for (const page of CORE_PAGES) {
  for (const lang of LANGUAGES) results.push(await auditPage(page, lang));
}

console.log('Core content audit');
console.log('lang  page                           count/min      h2-h4  >240  updated  status');
for (const result of results) {
  const page = result.relative.replace(/^src\/content\//, '').replace(/\.mdx$/, '');
  console.log([
    result.lang.padEnd(5),
    page.padEnd(30),
    `${result.count}/${result.minimum}`.padEnd(14),
    String(result.headings).padEnd(6),
    String(result.longParagraphs).padEnd(5),
    (result.hasUpdatedDate ? 'yes' : 'no').padEnd(8),
    result.passes ? 'PASS' : 'FAIL',
  ].join(' '));
}

const failures = results.filter((result) => !result.passes);
console.log(`\n${results.length - failures.length}/${results.length} localized core pages pass.`);
if (strict && failures.length > 0) process.exitCode = 1;
