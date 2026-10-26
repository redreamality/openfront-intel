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
      ['Nation beachheads and routes', /Hard and Impossible Nations.*1%.*300 and 500/is],
      ['early economy', /few Ports or Factories.*faster.*six building levels/is],
      ['Ranked FFA', /four to ten players.*twenty-minute timer/is],
      ['trusted account', /Ranked requires a trusted account/i],
      ['progression', /Prestige at level 100.*P1 to P10.*Legend/is],
      ['replay rollout', /Replay seeking.*initially disabled by default.*gradual rollout/is],
      ['controls', /R opens quick chat.*F opens the emoji menu.*moves to X/is],
      ['new maps', /Madagascar.*Brain Rot.*Ommatrypta/is],
      ['v35.3 visibility', /Map Layers.*holding Space/is],
      ['renewal is not guaranteed', /Renewal.*not a guaranteed acceptance/i],
    ],
  },
  {
    lang: 'zh',
    headings: [/^直接答案：/, /^下一局应该怎样改变决策/, /^来源状态/],
    facts: [
      ['Nation beachheads and routes', /Hard 与 Impossible Nation.*1%.*300.*500/is],
      ['early economy', /少量港口或工厂.*生成速度.*六级/is],
      ['Ranked FFA', /排位 FFA.*四至十名.*二十分钟/is],
      ['trusted account', /排位需要可信账户/],
      ['progression', /一百级的 Prestige.*P1.*P10.*Legend/is],
      ['replay rollout', /回放.*最初默认关闭并逐步开放/is],
      ['controls', /R 打开快捷聊天.*F 打开表情菜单.*改为 X/is],
      ['new maps', /Madagascar.*Brain Rot.*Ommatrypta/is],
      ['v35.3 visibility', /Map Layers.*Space/is],
      ['renewal is not guaranteed', /不保证任何一次请求一定获准/],
    ],
  },
  {
    lang: 'fr',
    headings: [/^Réponse directe/i, /^Que faut-il changer/i, /^Sources, limites/i],
    facts: [
      ['Nation beachheads and routes', /Nations Hard et Impossible.*1 %.*300 et 500/is],
      ['early economy', /peu de Ports ou de Factories.*plus vite.*six niveaux/is],
      ['Ranked FFA', /quatre à dix joueurs.*vingt minutes/is],
      ['trusted account', /compte trusted est nécessaire/i],
      ['progression', /Prestige au niveau 100.*P1 à P10.*Legend/is],
      ['replay rollout', /replays.*désactivé par défaut.*déploiement progressif/is],
      ['controls', /R ouvre le chat rapide.*F les émojis.*X sélectionne/is],
      ['new maps', /Madagascar.*Brain Rot.*Ommatrypta/is],
      ['v35.3 visibility', /Map Layers.*Space/is],
      ['renewal is not guaranteed', /Une acceptation reste incertaine/i],
    ],
  },
  {
    lang: 'de',
    headings: [/^Direkte Antwort/i, /^Was solltest du/i, /^Quellenstatus/i],
    facts: [
      ['Nation beachheads and routes', /Hard und Impossible.*1 %.*300.*500 Tiles/is],
      ['early economy', /wenige Häfen oder Fabriken.*schneller.*sechs Gebäudestufen/is],
      ['Ranked FFA', /vier bis zehn Spieler.*zwanzig Minuten/is],
      ['trusted account', /Ranked verlangt ein vertrauenswürdiges Konto/i],
      ['progression', /Prestige ab Stufe 100.*P1 bis P10.*Legend/is],
      ['replay rollout', /Replay.*standardmäßig deaktiviert.*schrittweise freigegeben/is],
      ['controls', /R öffnet den Schnellchat.*F das Emoji-Menü.*X wählt/is],
      ['new maps', /Madagascar.*Brain Rot.*Ommatrypta/is],
      ['v35.3 visibility', /Map Layers.*Space/is],
      ['renewal is not guaranteed', /Eine Zustimmung bleibt trotzdem unsicher/i],
    ],
  },
  {
    lang: 'nl',
    headings: [/^Direct antwoord/i, /^Wat moet je/i, /^Bronstatus/i],
    facts: [
      ['Nation beachheads and routes', /Hard en Impossible.*1%.*300 en 500 tiles/is],
      ['early economy', /weinig havens of fabrieken.*sneller.*zes gebouwlevels/is],
      ['Ranked FFA', /vier tot tien spelers.*twintig minuten/is],
      ['trusted account', /Ranked vereist een trusted account/i],
      ['progression', /Prestige op level 100.*P1 tot P10.*Legend/is],
      ['replay rollout', /replaytijdlijn.*standaard uitgeschakeld.*geleidelijke uitrol/is],
      ['controls', /R opent quick chat.*F het emojimenu.*X selecteert/is],
      ['new maps', /Madagascar.*Brain Rot.*Ommatrypta/is],
      ['v35.3 visibility', /Map Layers.*Space/is],
      ['renewal is not guaranteed', /garandeert geen aanvaarding/i],
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
    ['no inherited v34 patch claims', !body.includes('v0.34.')],
    ['v35.4 saving fix', /v0\.35\.4/.test(body) && /XP/.test(body) &&
      /stats|statistics|统计|statistiques|Statistiken|statistieken/i.test(body) &&
      /rewards|奖励|récompenses|Belohnungen|beloningen/i.test(body)],
    ['v35.5 team maps', ['Madagascar', 'Rio de Janeiro', 'Bab el-Mandeb', 'New Zealand', 'Branching Paths'].every(
      (name) => body.includes(name),
    )],
    ['v35.5 portal and screen boundaries', ['Poki', 'CrazyGames', 'Account', '1280px', 'Solo', 'United States'].every(
      (name) => body.includes(name),
    )],
    ['v35.5 live rotation boundary', /rotation|轮换|Kartenrotation|rotatie/i.test(body) &&
      /between releases|两个版本之间|entre deux versions|zwischen Releases|tussen releases/i.test(body)],
    ['v35 patch sources', ['v0.35.0', 'v0.35.1', 'v0.35.2', 'v0.35.3', 'v0.35.4', 'v0.35.5'].every(
      (tag) => body.includes(`](https://github.com/openfrontio/OpenFrontIO/releases/tag/${tag})`),
    )],
    ['canonical category', frontmatterValue(frontmatter, 'category') ===
      (contract.lang === 'zh' ? '版本笔记' : 'Release Notes')],
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
