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
  const errors = output.diagnostics?.filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  ) ?? [];
  if (errors.length > 0) {
    throw new Error(`${modulePath} could not be loaded: ${errors.map(({ messageText }) => messageText).join('; ')}`);
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
    content: body.slice(
      match.index + match[0].length,
      headings[index + 1]?.index ?? body.length,
    ).trim(),
  }));
}

function hasMatch(value, pattern) {
  pattern.lastIndex = 0;
  return pattern.test(value);
}

function findSection(sections, headingPattern) {
  return sections.find(({ heading }) => hasMatch(heading, headingPattern));
}

const contracts = [
  {
    lang: 'en',
    headingPatterns: [
      /^Direct answer:/i,
      /^v33\.5 /i,
      /^v33\.4 /i,
      /^v33\.3 /i,
      /^v33\.2 /i,
      /^v33\.1 /i,
      /^MIRV and SAM:/i,
      /^Doomsday Clock:/i,
      /^Ranked 2v2:/i,
      /^Warship veterancy:/i,
      /22 new maps$/i,
      /^Source status$/i,
    ],
    bodyPatterns: [
      ['versioned replay', /versioned replay shells/i],
      ['managed-lobby boundary', /ordinary Host UI/i],
      ['bulk controls', /x5 ghost badge/i],
      ['same-Silo timing', /same-Silo/i],
      ['territory thresholds', /2%, 4%, 7%, 11%, 17%, 25%, and 35%/i],
      ['replay hotfix', /replay desync errors/i],
      ['map pool', /117-map/i],
      ['warship veterancy', /3 veterancy levels/i],
    ],
  },
  {
    lang: 'zh',
    headingPatterns: [
      /^直接答案[：:]/,
      /^v33\.5 更新[：:]/i,
      /^v33\.4 更新[：:]/i,
      /^v33\.3 修复[：:]/i,
      /^v33\.2 更新[：:]/i,
      /^v33\.1 热修[：:]/i,
      /^MIRV 与 SAM[：:]/i,
      /^Doomsday Clock[：:]/i,
      /^Ranked 2v2[：:]/i,
      /^战舰熟练度[：:]/,
      /22 张新地图$/,
      /^来源状态$/,
    ],
    bodyPatterns: [
      ['versioned replay', /版本化 replay shell/i],
      ['managed-lobby boundary', /普通 Host UI/i],
      ['bulk controls', /x5 ghost badge/i],
      ['same-Silo timing', /同一 Silo 内逐 tick/i],
      ['territory thresholds', /2%、4%、7%、11%、17%、25%.*35%/],
      ['replay hotfix', /回放 desync 错误/i],
      ['map pool', /117 张地图/],
      ['warship veterancy', /3 级熟练度/],
    ],
  },
  {
    lang: 'fr',
    headingPatterns: [
      /^Réponse directe\s*:/i,
      /^v33\.5\s*:/i,
      /v33\.4\s*:/i,
      /v33\.3\s*:/i,
      /v33\.2\s*:/i,
      /v33\.1\s*:/i,
      /^MIRV et SAM\s*:/i,
      /^Doomsday Clock\s*:/i,
      /^Ranked 2v2\s*:/i,
      /^Vétérance navale\s*:/i,
      /22 nouvelles cartes$/i,
      /^Statut de la source$/i,
    ],
    bodyPatterns: [
      ['versioned replay', /shells de replay versionnés/i],
      ['managed-lobby boundary', /Host ordinaire/i],
      ['bulk controls', /fantôme x5/i],
      ['same-Silo timing', /même Silo.*tick/i],
      ['territory thresholds', /2 %, 4 %, 7 %, 11 %, 17 %, 25 %.*35 %/i],
      ['replay hotfix', /erreurs de desync des replays/i],
      ['map pool', /117 cartes/i],
      ['warship veterancy', /3 niveaux de vétérérance/i],
    ],
  },
  {
    lang: 'de',
    headingPatterns: [
      /^Direkte Antwort:/i,
      /^v33\.5:/i,
      /^v33\.4-Update:/i,
      /^v33\.3-Fixes:/i,
      /^v33\.2-Update:/i,
      /^v33\.1-Hotfix:/i,
      /^MIRV und SAM:/i,
      /^Doomsday Clock:/i,
      /^Ranked 2v2:/i,
      /^Warship-Veteranenstatus:/i,
      /22 neue Karten$/i,
      /^Quellenstatus$/i,
    ],
    bodyPatterns: [
      ['versioned replay', /versionierte Replay-Shells/i],
      ['managed-lobby boundary', /normalen Host-UI/i],
      ['bulk controls', /x5-Ghost-Badge/i],
      ['same-Silo timing', /desselben Silos.*Tick/i],
      ['territory thresholds', /2 %, 4 %, 7 %, 11 %, 17 %, 25 %.*35 %/i],
      ['replay hotfix', /Desync-Fehler in Replays/i],
      ['map pool', /117 Karten/i],
      ['warship veterancy', /3 Veteranenstufen/i],
    ],
  },
  {
    lang: 'nl',
    headingPatterns: [
      /^Direct antwoord:/i,
      /^v33\.5:/i,
      /^v33\.4-update:/i,
      /^v33\.3-fixes:/i,
      /^v33\.2-update:/i,
      /^v33\.1-hotfix:/i,
      /^MIRV en SAM:/i,
      /^Doomsday Clock:/i,
      /^Ranked 2v2:/i,
      /^Warship-veterancy:/i,
      /22 nieuwe kaarten$/i,
      /^Bronstatus$/i,
    ],
    bodyPatterns: [
      ['versioned replay', /Versie-replay-shells/i],
      ['managed-lobby boundary', /gewone Host-UI/i],
      ['bulk controls', /x5-ghostbadge/i],
      ['same-Silo timing', /dezelfde Silo.*tick/i],
      ['territory thresholds', /2%, 4%, 7%, 11%, 17%, 25%.*35%/i],
      ['replay hotfix', /desyncfouten in replays/i],
      ['map pool', /117 kaarten/i],
      ['warship veterancy', /3 veterancy-niveaus/i],
    ],
  },
];

const { latestOpenFrontRelease: release } = await loadTypeScriptModule(RELEASE_CONFIG_PATH);
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
  const sourceSection = findSection(
    sections,
    contract.headingPatterns[contract.headingPatterns.length - 1],
  );

  const checks = [
    ['home CTA {series} placeholder', ui[contract.lang]['home.cta.latest'].includes('{series}')],
    ['frontmatter version', version === release.series],
    ['title display version', title.includes(release.displayVersion)],
    ['description display version', description.includes(release.displayVersion)],
    ['official tag', body.includes(`\`${release.tag}\``)],
    [
      'official Release source',
      sourceSection?.content.includes(`](${release.releaseUrl})`) ?? false,
    ],
    ...contract.headingPatterns.map((pattern) => [
      `section ${pattern}`,
      Boolean(findSection(sections, pattern)),
    ]),
    ...contract.bodyPatterns.map(([label, pattern]) => [
      label,
      hasMatch(body, pattern),
    ]),
  ];

  const failedChecks = checks.filter(([, passes]) => !passes).map(([label]) => label);
  if (failedChecks.length > 0) {
    failures.push({ relativePath, failedChecks });
    console.error(`FAIL ${relativePath}: ${failedChecks.join(', ')}`);
  } else {
    console.log(`PASS ${relativePath} (${sections.length} sections)`);
  }
}

if (failures.length > 0) {
  console.error(`\n${failures.length}/${contracts.length} latest-release contracts failed.`);
  process.exitCode = 1;
} else {
  console.log(`\n${contracts.length}/${contracts.length} latest-release contracts pass for ${release.tag}.`);
}
