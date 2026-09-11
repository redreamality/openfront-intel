import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const RELEASE_CONFIG_PATH = resolve(ROOT, 'src/config/openfront-release.ts');
const UI_CONFIG_PATH = resolve(ROOT, 'src/i18n/ui.ts');

async function loadTypeScriptModule(modulePath) {
  const source = await readFile(modulePath, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: modulePath,
    reportDiagnostics: true,
  });
  const errors =
    output.diagnostics?.filter(
      (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
    ) ?? [];
  if (errors.length > 0) {
    throw new Error(
      `${modulePath} could not be loaded: ${errors
        .map(({ messageText }) => messageText)
        .join('; ')}`,
    );
  }

  const moduleUrl = `data:text/javascript;base64,${Buffer.from(output.outputText).toString('base64')}`;
  return import(moduleUrl);
}

function splitDocument(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error('MDX frontmatter block is missing');
  return { frontmatter: match[1], body: match[2] };
}

function frontmatterValue(frontmatter, key) {
  const match = frontmatter.match(
    new RegExp(`^${key}:\\s*(?:"([^"]*)"|'([^']*)'|(.+))\\s*$`, 'm'),
  );
  return (match?.[1] ?? match?.[2] ?? match?.[3] ?? '').trim();
}

function parseLevelTwoSections(body) {
  const headings = [...body.matchAll(/^##\s+(.+)$/gm)];
  return headings.map((match, index) => ({
    heading: match[1].trim(),
    content: body
      .slice(match.index + match[0].length, headings[index + 1]?.index ?? body.length)
      .trim(),
  }));
}

function countLatinWords(value) {
  return (
    value
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu)?.length ?? 0
  );
}

function countHanCharacters(value) {
  return value.match(/[\p{Script=Han}]/gu)?.length ?? 0;
}

function hasMatch(value, pattern) {
  pattern.lastIndex = 0;
  return pattern.test(value);
}

const contracts = [
  {
    lang: 'en',
    headings: [/^Direct answer:/i, /^What should you change/i, /^Source status/i],
    facts: [
      ['attack ratios and density', /troop ratio.*troop density/is],
      ['large-territory boundary', /100,000 tiles/i],
      ['MIRV price and cooldown', /25 million.*60-second/is],
      ['Nation target strategy', /Hard and Impossible Nations.*valuable bordering rival/is],
      ['Team threshold', /Team games.*80%.*95%/is],
      ['Water Nuke routing', /Water-Nuked.*pathfinding/is],
      ['rail boundary', /rails cannot cross impassable terrain/i],
      ['tutorial', /20-step in-game tutorial/i],
      ['trusted and Detailed View', /trusted-only.*Detailed View/is],
      ['map preloading', /map preloading/i],
      ['clan and cosmetics', /clan treasury.*cosmetic inventory/is],
      ['performance', /39% lower tick cost/i],
      ['maps', /Yangtze River.*Qing China/is],
    ],
  },
  {
    lang: 'zh',
    headings: [/^直接答案：/, /^下一局应该怎样改变决策/, /^来源状态/],
    facts: [
      ['attack ratios and density', /troop ratio.*troop density/is],
      ['large-territory boundary', /100,000 tiles/i],
      ['MIRV price and cooldown', /25,000,000 Gold.*60 秒/is],
      ['Nation target strategy', /Hard 与 Impossible Nations.*价值高/is],
      ['Team threshold', /Team.*95%.*80%/is],
      ['Water Nuke routing', /Water Nuke.*正确寻路/is],
      ['rail boundary', /Railroad 不能跨越 impassable terrain/i],
      ['tutorial', /20 步局内教程/i],
      ['trusted and Detailed View', /trusted-only lobby.*Detailed View/is],
      ['map preloading', /地图预加载/i],
      ['clan and cosmetics', /Clan treasury.*外观库存/is],
      ['performance', /tick cost 降低 39%/i],
      ['maps', /Yangtze River.*Qing China/is],
    ],
  },
  {
    lang: 'fr',
    headings: [/^Réponse directe/i, /^Que faut-il changer/i, /^Sources, limites/i],
    facts: [
      ['attack ratios and density', /troop ratio.*troop density/is],
      ['large-territory boundary', /100 000 tiles/i],
      ['MIRV price and cooldown', /25 millions.*60 secondes/is],
      ['Nation target strategy', /Nations Hard et Impossible.*rival frontalier/is],
      ['Team threshold', /Team.*80 %.*95 %|Team.*95 %.*80 %/is],
      ['Water Nuke routing', /Water Nuke.*pathfinding/is],
      ['rail boundary', /rails ne peuvent pas traverser un terrain impassable/i],
      ['tutorial', /tutoriel en 20 étapes/i],
      ['trusted and Detailed View', /trusted-only.*Detailed View/is],
      ['map preloading', /préchargement des cartes/i],
      ['clan and cosmetics', /clan treasury.*inventaire cosmétique/is],
      ['performance', /39 % de coût de tick en moins/i],
      ['maps', /Yangtze River.*Qing China/is],
    ],
  },
  {
    lang: 'de',
    headings: [/^Direkte Antwort/i, /^Was solltest du/i, /^Quellenstatus/i],
    facts: [
      ['attack ratios and density', /troop ratio.*troop density/is],
      ['large-territory boundary', /100\.000 Tiles/i],
      ['MIRV price and cooldown', /25 Millionen.*60 Sekunden/is],
      ['Nation target strategy', /Hard- und Impossible-Nations.*wertvollen angrenzenden Gegner/is],
      ['Team threshold', /Team.*80 %.*95 %|Team.*95 %.*80 %/is],
      ['Water Nuke routing', /Water Nukes.*routen/is],
      ['rail boundary', /Railroad darf unpassierbares Gelände nicht kreuzen/i],
      ['tutorial', /Tutorial mit 20 Schritten/i],
      ['trusted and Detailed View', /trusted-only.*Detailed View/is],
      ['map preloading', /Karten-Vorladen/i],
      ['clan and cosmetics', /Clan-Treasury.*Kosmetikinventar/is],
      ['performance', /39 % niedrigere Tick-Kosten/i],
      ['maps', /Yangtze River.*Qing China/is],
    ],
  },
  {
    lang: 'nl',
    headings: [/^Direct antwoord/i, /^Wat moet je/i, /^Bronstatus/i],
    facts: [
      ['attack ratios and density', /troop ratio.*troop density/is],
      ['large-territory boundary', /100\.000 tiles/i],
      ['MIRV price and cooldown', /25 miljoen.*60 seconden/is],
      ['Nation target strategy', /Hard en Impossible Nations.*waardevolle aangrenzende rivaal/is],
      ['Team threshold', /Team.*80%.*95%|Team.*95%.*80%/is],
      ['Water Nuke routing', /Water Nuke.*pathfinding/is],
      ['rail boundary', /Railroad kan onbegaanbaar terrein niet kruisen/i],
      ['tutorial', /tutorial met 20 stappen/i],
      ['trusted and Detailed View', /trusted-only.*Detailed View/is],
      ['map preloading', /vooraf laden van kaarten/i],
      ['clan and cosmetics', /clan treasury.*cosmetische inventory/is],
      ['performance', /39% lagere tickkosten/i],
      ['maps', /Yangtze River.*Qing China/is],
    ],
  },
];

const { latestOpenFrontRelease: release } =
  await loadTypeScriptModule(RELEASE_CONFIG_PATH);
const { ui } = await loadTypeScriptModule(UI_CONFIG_PATH);
const failures = [];

for (const contract of contracts) {
  const relativePath = `src/content/changelog/${contract.lang}/${release.series}.mdx`;
  const source = await readFile(resolve(ROOT, relativePath), 'utf8');
  const { frontmatter, body } = splitDocument(source);
  const sections = parseLevelTwoSections(body);
  const title = frontmatterValue(frontmatter, 'title');
  const description = frontmatterValue(frontmatter, 'description');
  const version = frontmatterValue(frontmatter, 'version');
  const releaseStatus = frontmatterValue(frontmatter, 'releaseStatus');
  const tags = frontmatterValue(frontmatter, 'tags');
  const sectionCounts = sections.map(({ content }) =>
    contract.lang === 'zh'
      ? countHanCharacters(content)
      : countLatinWords(content),
  );

  const checks = [
    ['home CTA {series} placeholder', ui[contract.lang]['home.cta.latest'].includes('{series}')],
    ['frontmatter version', version === release.series],
    ['frontmatter release status', releaseStatus === 'released'],
    ['frontmatter tags', tags === '[changelog, balance, features]'],
    ['title display version', title.includes(release.displayVersion)],
    ['description display version', description.includes(release.displayVersion)],
    ['official tag', body.includes(`${release.tag}`)],
    ['official Release source', body.includes(`](${release.releaseUrl})`)],
    ['exactly three level-two sections', sections.length === 3],
    ...contract.headings.map((pattern) => [
      `section ${pattern}`,
      sections.some(({ heading }) => hasMatch(heading, pattern)),
    ]),
    ...sectionCounts.map((count, index) => [
      `section ${index + 1} has 401+ ${contract.lang === 'zh' ? 'Han characters' : 'words'} (found ${count})`,
      count >= 401,
    ]),
    ...contract.facts.map(([label, pattern]) => [label, hasMatch(body, pattern)]),
  ];

  const failedChecks = checks.filter(([, passes]) => !passes).map(([label]) => label);
  if (failedChecks.length > 0) {
    failures.push({ relativePath, failedChecks });
    console.error(`FAIL ${relativePath}: ${failedChecks.join(', ')}`);
  } else {
    console.log(
      `PASS ${relativePath} (${sections.length} sections; counts ${sectionCounts.join('/')})`,
    );
  }
}

if (failures.length > 0) {
  console.error(`\n${failures.length}/${contracts.length} latest-release contracts failed.`);
  process.exitCode = 1;
} else {
  console.log(
    `\n${contracts.length}/${contracts.length} latest-release contracts pass for ${release.tag}.`,
  );
}
