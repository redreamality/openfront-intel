import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
async function loadModule(path) {
  const output = ts.transpileModule(await readFile(resolve(ROOT, path), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(output.outputText).toString('base64')}`);
}

const { latestOpenFrontRelease: release } = await loadModule('src/config/openfront-release.ts');
const { ui } = await loadModule('src/i18n/ui.ts');
const contracts = [
  { lang: 'en', headings: [/^Direct answer/, /^What should/, /^Which fixes/],
    warning: /v36\.2 changes that latter warning back to solid red/,
    queue: /FFA Rating from OFstats replaces the ranked FFA queue/,
    guests: /Guests can play shared saves/,
    thresholds: /10% to 99\.9%.*80%.*default/is },
  { lang: 'zh', headings: [/^直接答案/, /^下一局/, /^哪些修复/],
    warning: /v36\.2 把后一种恢复为实心红色/,
    queue: /FFA Rating 取代旧排位 FFA 队列/,
    guests: /访客可以游玩别人分享的存档/,
    thresholds: /10% 至 99\.9%.*默认仍是 80%/is },
  { lang: 'fr', headings: [/^Réponse directe/, /^Que faut/, /^Quelles corrections/],
    warning: /v36\.2 rétablit le rouge fixe/,
    queue: /FFA Rating, fourni par OFstats, remplace la file FFA classée/,
    guests: /visiteurs peuvent jouer aux sauvegardes partagées/,
    thresholds: /10 % à 99,9 %.*80 %.*défaut/is },
  { lang: 'de', headings: [/^Direkte Antwort/, /^Was solltest/, /^Welche Korrekturen/],
    warning: /v36\.2 verwendet dafür wieder durchgehendes Rot/,
    queue: /FFA Rating von OFstats ersetzt die bisherige Ranked-FFA-Warteschlange/,
    guests: /Gäste können geteilte Spielstände spielen/,
    thresholds: /10 % bis 99,9 %.*80 %.*Standard/is },
  { lang: 'nl', headings: [/^Direct antwoord/, /^Wat moet/, /^Welke correcties/],
    warning: /v36\.2 maakt dat laatste weer egaal rood/,
    queue: /FFA Rating van OFstats vervangt de ranked-FFA-wachtrij/,
    guests: /Gasten mogen gedeelde saves spelen/,
    thresholds: /10% tot 99,9%.*80% standaard/is },
];

let failed = 0;
for (const contract of contracts) {
  const path = `src/content/changelog/${contract.lang}/${release.series}.mdx`;
  const source = await readFile(resolve(ROOT, path), 'utf8');
  const document = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!document) throw new Error(`Missing frontmatter: ${path}`);
  const [, frontmatter, body] = document;
  const field = (key) => {
    const match = frontmatter.match(new RegExp(`^${key}:\\s*(?:"([^"]*)"|'([^']*)'|(.+))$`, 'm'));
    return (match?.[1] ?? match?.[2] ?? match?.[3] ?? '').trim();
  };
  const headings = [...body.matchAll(/^## (.+)$/gm)];
  const sections = headings.map((heading, index) =>
    body.slice(heading.index + heading[0].length, headings[index + 1]?.index ?? body.length));
  const clean = (text) => text.replace(/https?:\/\/\S+/g, ' ').replace(/<[^>]+>/g, ' ');
  const count = (text) => contract.lang === 'zh'
    ? [...new Intl.Segmenter('zh', { granularity: 'word' }).segment(clean(text))]
      .filter(({ isWordLike }) => isWordLike).length
    : (clean(text).match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu)?.length ?? 0);
  const counts = sections.map(count);
  const checks = [
    ['latest series', release.series === 'v36'],
    ['version', field('version') === release.series],
    ['released', field('releaseStatus') === 'released'],
    ['tags', field('tags') === '[changelog, balance, features]'],
    ['category', field('category') === (contract.lang === 'zh' ? '版本笔记' : 'Release Notes')],
    ['title', field('title').includes(release.displayVersion)],
    ['description', field('description').includes(release.displayVersion)],
    ['home CTA placeholder', ui[contract.lang]['home.cta.latest'].includes('{series}')],
    ['three sections', sections.length === 3],
    ...contract.headings.map((pattern, index) => [`heading ${index + 1}`, pattern.test(headings[index]?.[1] ?? '')]),
    ...counts.map((value, index) => [`section ${index + 1} >=401 (${value})`, value >= 401]),
    ['current warning overrides original flash', contract.warning.test(body)],
    ['FFA Rating replaces old queue', contract.queue.test(body)],
    ['guest shared save access', contract.guests.test(body)],
    ['private threshold and default', contract.thresholds.test(body)],
    ['shared release facts', ['Saved games', 'Continue', 'OFstats', 'Atlas', 'World 4000',
      'Giant World', 'World 10000', 'The Box', '210', '50', 'ZQSD', 'SAM'].every((signal) => body.includes(signal))],
    ['current source', body.includes(`](${release.releaseUrl})`)],
    ['series sources', ['v0.36.0', 'v0.36.1', 'v0.36.2'].every((tag) =>
      body.includes(`](https://github.com/openfrontio/OpenFrontIO/releases/tag/${tag})`))],
    ['no inherited v35 patch claims', !body.includes('v0.35.')],
    ['no third-level section bypass', !/^### /m.test(body)],
  ];
  const errors = checks.filter(([, pass]) => !pass).map(([label]) => label);
  if (errors.length) {
    failed++;
    console.error(`FAIL ${path}: ${errors.join('; ')}`);
  } else {
    console.log(`PASS ${path}: ${counts.join('/')} words; zh uses Intl.Segmenter isWordLike`);
  }
}
console.log(`${contracts.length - failed}/${contracts.length} latest-release contracts pass for ${release.tag}`);
if (failed) process.exitCode = 1;
