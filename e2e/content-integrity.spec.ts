import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';

const maps = JSON.parse(
  readFileSync(new URL('../src/data/maps.json', import.meta.url), 'utf8'),
) as { meta: { total: number }; list: Array<{ id: string }> };

const formulas = JSON.parse(
  readFileSync(new URL('../src/data/formulas.json', import.meta.url), 'utf8'),
) as {
  groups: {
    troops: {
      items: Array<{ i18n: { en: { name: string; expr: string } } }>;
    };
  };
};

const v33MapIds = [
  'sol', 'russia', 'unitedstates', 'france', 'germany', 'china', 'vietnam',
  'scandinavia', 'balkhash', 'baltics', 'caspiansea', 'clearwaterlakes',
  'crimea', 'fingerlakes', 'gulfofguinea', 'hecatestrait', 'irishsea',
  'lasvegasstrip', 'levant', 'tierradelfuego', 'branchingpaths', 'morethanluck',
];

test('v33 map extraction contains the 117-map pool and all 22 additions', () => {
  expect(maps.meta.total).toBe(117);
  const extractedIds = new Set(maps.list.map((map) => map.id));
  for (const id of v33MapIds) expect(extractedIds.has(id), `missing map id: ${id}`).toBe(true);
});

test('population-cap data matches the v33.1 source formula', () => {
  const populationCap = formulas.groups.troops.items.find(
    (item) => item.i18n.en.name === 'Population cap base',
  );
  expect(populationCap?.i18n.en.expr).toBe(
    '2 × (tiles^0.6 × 1000 + 50,000) + Σ(cityLevel × 250,000)',
  );
  expect(populationCap?.i18n.en.expr).not.toContain('0.6 × tiles^0.6');
});

for (const version of ['24', '25', '26', '27', '28', '29', '30', '31', '32']) {
  test(`changelog v${version} links to the official semantic-version release`, async ({ page }) => {
    await page.goto(`/changelog/v${version}/`, { waitUntil: 'domcontentloaded' });

    const provenance = page.locator('[data-provenance-panel]');
    await expect(provenance).toBeVisible();
    await expect(provenance.getByRole('link', { name: /GitHub Release/ })).toHaveAttribute(
      'href',
      `https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.${version}.0`,
    );
  });
}

test('changelog v33 uses the official v0.33.4 Release URL', async ({ page }) => {
  await page.goto('/changelog/v33/', { waitUntil: 'domcontentloaded' });

  const provenance = page.locator('[data-provenance-panel]');
  await expect(provenance).toBeVisible();
  await expect(provenance.getByRole('link', { name: /GitHub Release/ })).toHaveAttribute(
    'href',
    'https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.4',
  );
});

test('provenance distinguishes the extraction checkout from the editorial snapshot scope', async ({ page }) => {
  await page.goto('/database/units/', { waitUntil: 'domcontentloaded' });

  const provenance = page.locator('[data-provenance-panel]');
  await expect(provenance).toContainText('generated from the recorded upstream checkout');
  await expect(provenance).toContainText('editorial validation scope and embedded fallback remain v33');
});

const aboutCases = [
  { lang: 'en', path: '/about/', text: `${maps.meta.total} maps listed and categorized.` },
  { lang: 'zh', path: '/zh/about/', text: `${maps.meta.total} 张地图列表与分类。` },
  { lang: 'fr', path: '/fr/about/', text: `Liste et catégories des ${maps.meta.total} cartes.` },
  { lang: 'de', path: '/de/about/', text: `Liste und Kategorisierung der ${maps.meta.total} Karten.` },
  { lang: 'nl', path: '/nl/about/', text: `Een lijst en categorisatie van ${maps.meta.total} kaarten.` },
];

for (const aboutCase of aboutCases) {
  test(`about[${aboutCase.lang}] uses the extracted map count`, async ({ page }) => {
    await page.goto(aboutCase.path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toContainText(aboutCase.text);
  });
}

const mechanicsCases = [
  { lang: 'en', path: '/mechanics/', text: 'Numeric examples are scoped to the v33 editorial data snapshot' },
  { lang: 'zh', path: '/zh/mechanics/', text: '数值示例适用于 v33 编辑数据快照' },
  { lang: 'fr', path: '/fr/mechanics/', text: 'Les exemples numériques sont limités à l’instantané éditorial v33' },
  { lang: 'de', path: '/de/mechanics/', text: 'Zahlenbeispiele gelten für den redaktionellen v33-Datenstand' },
  { lang: 'nl', path: '/nl/mechanics/', text: 'Cijfervoorbeelden gelden voor de redactionele v33-datasnapshot' },
];

for (const mechanicsCase of mechanicsCases) {
  test(`mechanics[${mechanicsCase.lang}] states the snapshot scope`, async ({ page }) => {
    await page.goto(mechanicsCase.path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toContainText(mechanicsCase.text);
  });
}

const economyGrowthCases = [
  {
    lang: 'en',
    path: '/mechanics/economy/',
    indexPath: '/mechanics/',
    firstMatchPath: '/guides/first-match/',
    directAnswer: 'Direct answer: when should you stop expanding?',
    formula: '2 × (tiles^0.6 × 1000 + 50,000)',
    peak: '42% of cap',
    highBand: 'Above 80%',
  },
  {
    lang: 'zh',
    path: '/zh/mechanics/economy/',
    indexPath: '/zh/mechanics/',
    firstMatchPath: '/zh/guides/first-match/',
    directAnswer: '直接答案：什么时候该停止扩张？',
    formula: '2 × (tiles^0.6 × 1000 + 50,000)',
    peak: '上限的 42%',
    highBand: '高于 80%',
  },
  {
    lang: 'fr',
    path: '/fr/mechanics/economy/',
    indexPath: '/fr/mechanics/',
    firstMatchPath: '/fr/guides/first-match/',
    directAnswer: "Réponse directe : quand arrêter l'expansion ?",
    formula: '2 × (tiles^0.6 × 1000 + 50 000)',
    peak: '42 % du plafond',
    highBand: 'Plus de 80 %',
  },
  {
    lang: 'de',
    path: '/de/mechanics/economy/',
    indexPath: '/de/mechanics/',
    firstMatchPath: '/de/guides/first-match/',
    directAnswer: 'Direkte Antwort: Wann solltest du die Expansion stoppen?',
    formula: '2 × (tiles^0.6 × 1000 + 50.000)',
    peak: '42 % des Limits',
    highBand: 'Über 80 %',
  },
  {
    lang: 'nl',
    path: '/nl/mechanics/economy/',
    indexPath: '/nl/mechanics/',
    firstMatchPath: '/nl/guides/first-match/',
    directAnswer: 'Direct antwoord: wanneer stop je met uitbreiden?',
    formula: '2 × (tiles^0.6 × 1000 + 50.000)',
    peak: '42% van het plafond',
    highBand: 'Boven 80%',
  },
] as const;

for (const economyCase of economyGrowthCases) {
  test(`economy growth[${economyCase.lang}] gives the current cap and reserve decision`, async ({ page }) => {
    await page.goto(economyCase.path, { waitUntil: 'domcontentloaded' });

    const main = page.locator('main');
    await expect(main.getByRole('heading', { level: 2, name: economyCase.directAnswer })).toBeVisible();
    await expect(main).toContainText(economyCase.formula);
    await expect(main).not.toContainText('0.6 × tiles^0.6');
    await expect(main).toContainText(economyCase.peak);
    await expect(main).toContainText(economyCase.highBand);
    await expect(main.locator('[data-freshness-summary]')).toContainText('v33.1');
    await expect(
      main.locator('a[href="https://github.com/openfrontio/OpenFrontIO/blob/v0.33.1/src/core/configuration/Config.ts#L817-L857"]'),
    ).toHaveCount(1);
  });

  test(`economy growth[${economyCase.lang}] keeps two natural inbound paths`, async ({ page }) => {
    await page.goto(economyCase.indexPath, { waitUntil: 'domcontentloaded' });
    await expect(page.locator(`main a[href="${economyCase.path}"]`)).toHaveCount(1);

    await page.goto(economyCase.firstMatchPath, { waitUntil: 'domcontentloaded' });
    await expect(page.locator(`main a[href="${economyCase.path}"]`)).toHaveCount(1);
  });
}

const freshnessLanguages = [
  {
    lang: 'en',
    prefix: '',
    labels: ['Applies to', 'Last verified', 'What changed in this version'],
    hotkeyFact: 'x1/x5',
    waterNukeFact: 'detour',
  },
  {
    lang: 'zh',
    prefix: '/zh',
    labels: ['适用版本', '最后核验', '本版本关键变化'],
    hotkeyFact: 'x1/x5',
    waterNukeFact: '绕开',
  },
  {
    lang: 'fr',
    prefix: '/fr',
    labels: ['Version applicable', 'Dernière vérification', 'Changement clé de cette version'],
    hotkeyFact: 'x1/x5',
    waterNukeFact: 'contourner',
  },
  {
    lang: 'de',
    prefix: '/de',
    labels: ['Gilt für', 'Zuletzt geprüft', 'Wichtigste Änderung dieser Version'],
    hotkeyFact: 'x1/x5',
    waterNukeFact: 'umfahren',
  },
  {
    lang: 'nl',
    prefix: '/nl',
    labels: ['Geldt voor', 'Laatst gecontroleerd', 'Belangrijkste wijziging in deze versie'],
    hotkeyFact: 'x1/x5',
    waterNukeFact: 'om',
  },
] as const;

const freshnessPages = [
  { route: '/guides/first-match/', fact: '22' },
  { route: '/guides/doomsday-clock/', fact: '150' },
  { route: '/guides/hotkeys/', fact: 'hotkey' },
  { route: '/guides/water-nukes/', fact: 'water-nukes' },
  { route: '/strategies/economy-fundamentals/', fact: 'v32' },
  { route: '/strategies/ffa-opening/', fact: '22' },
  { route: '/strategies/nuclear-deterrence/', fact: 'MIRV' },
  { route: '/strategies/team-naval-control/', fact: '3' },
] as const;

for (const language of freshnessLanguages) {
  for (const freshnessPage of freshnessPages) {
    test(`freshness summary[${language.lang}] appears on ${freshnessPage.route}`, async ({ page }) => {
      await page.goto(`${language.prefix}${freshnessPage.route}`, { waitUntil: 'domcontentloaded' });

      const freshness = page.locator('[data-freshness-summary]');
      await expect(freshness).toBeVisible();
      await expect(freshness.locator('dd')).toHaveCount(3);
      await expect(freshness).toContainText('v33');
      await expect(freshness).toContainText('2026');
      for (const label of language.labels) await expect(freshness).toContainText(label);
      const expectedFact = freshnessPage.fact === 'hotkey'
        ? language.hotkeyFact
        : freshnessPage.fact === 'water-nukes'
          ? language.waterNukeFact
          : freshnessPage.fact;
      await expect(freshness).toContainText(expectedFact);
    });
  }
}

const v32Cases = [
  { path: '/changelog/v32/', answer: 'what matters in v32?', trade: '400 active ships', nuke: '10 tiles per tick' },
  { path: '/zh/changelog/v32/', answer: 'v32 到底改变了什么？', trade: '400 艘活跃船只', nuke: '10 tiles/tick' },
  { path: '/fr/changelog/v32/', answer: 'que change vraiment la v32 ?', trade: '400 navires actifs', nuke: '10 tiles par tick' },
  { path: '/de/changelog/v32/', answer: 'Was ändert v32 wirklich?', trade: '400 aktiven Schiffen', nuke: '10 Tiles pro Tick' },
  { path: '/nl/changelog/v32/', answer: 'wat verandert v32 echt?', trade: '400 actieve schepen', nuke: '10 tiles per tick' },
];

for (const v32Case of v32Cases) {
  test(`${v32Case.path} explains the player-facing v32 changes`, async ({ page }) => {
    await page.goto(v32Case.path, { waitUntil: 'domcontentloaded' });
    const main = page.locator('main');
    await expect(main).toContainText(v32Case.answer);
    await expect(main).toContainText(v32Case.trade);
    await expect(main).toContainText(v32Case.nuke);
    await expect(main).toContainText('Doomsday Clock');
  });
}

const v33Cases = [
  {
    path: '/changelog/v33/',
    grace: '10-minute grace period',
    ranked: '1 minute',
    veteran: '3 veterancy levels',
    maps: '117-map',
    replay: 'replay desync errors',
    tribe: 'custom tribe names',
    thresholds: '2%, 4%, 7%, 11%, 17%, 25%, and 35%',
    rot: 'territory rot',
    batch: 'Press the same build key twice to toggle x1 / x5',
    timing: 'One Silo releases its queued bombs one tick apart',
    single: 'New placements, Hydrogen Bombs, and MIRVs remain single actions',
  },
  {
    path: '/zh/changelog/v33/',
    grace: '10 分钟宽限期',
    ranked: '1 分钟',
    veteran: '3 级熟练度',
    maps: '117 张地图',
    replay: '回放 desync 错误',
    tribe: '自定义 tribe 名称',
    thresholds: '2%、4%、7%、11%、17%、25%，最终到 35%',
    rot: '领土腐化',
    batch: '同一建造键连按两次，会为可升级建筑或原子弹在 x1 / x5 间切换',
    timing: '同一 Silo 的核弹每隔 1 tick 发出一枚',
    single: '新建建筑、氢弹和 MIRV 仍是单次操作',
  },
  {
    path: '/fr/changelog/v33/',
    grace: 'grâce de 10 minutes',
    ranked: '1 minute',
    veteran: '3 niveaux de vétérérance',
    maps: '117 cartes',
    replay: 'erreurs de desync des replays',
    tribe: 'noms de tribe personnalisés',
    thresholds: '2 %, 4 %, 7 %, 11 %, 17 %, 25 %, puis 35 %',
    rot: 'corruption territoriale',
    batch: 'Appuyer deux fois sur la même touche de construction bascule entre x1 et x5',
    timing: 'Un même Silo espace ses tirs d’un tick',
    single: 'nouvelle structure, Hydrogen Bomb et MIRV restent unitaires',
  },
  {
    path: '/de/changelog/v33/',
    grace: '10 Minuten Schonzeit',
    ranked: '1 Minute',
    veteran: '3 Veteranenstufen',
    maps: '117 Karten',
    replay: 'Desync-Fehler in Replays',
    tribe: 'benutzerdefinierte Tribe-Namen',
    thresholds: '2 %, 4 %, 7 %, 11 %, 17 %, 25 % und schließlich 35 %',
    rot: 'Gebietszerfall',
    batch: 'Ein zweiter Druck auf denselben Bau-Hotkey',
    timing: 'Dasselbe Silo startet seine Nukes mit je einem Tick Abstand',
    single: 'Neubauten, Hydrogen Bomb und MIRV bleiben Einzelaktionen',
  },
  {
    path: '/nl/changelog/v33/',
    grace: '10 minuten respijt',
    ranked: '1 minuut',
    veteran: '3 veterancy-niveaus',
    maps: '117 kaarten',
    replay: 'desyncfouten in replays',
    tribe: 'aangepaste tribe-namen',
    thresholds: '2%, 4%, 7%, 11%, 17%, 25% en uiteindelijk 35%',
    rot: 'landrot',
    batch: 'Druk dezelfde bouwtoets twee keer',
    timing: 'Eén Silo vuurt zijn nukes met telkens één tick ertussen',
    single: 'nieuwbouw, Hydrogen Bomb en MIRV blijven enkele acties',
  },
];

for (const v33Case of v33Cases) {
  test(`${v33Case.path} explains the player-facing v33.4 changes`, async ({ page }) => {
    await page.goto(v33Case.path, { waitUntil: 'domcontentloaded' });
    const main = page.locator('main');
    await expect(main).toContainText(v33Case.grace);
    await expect(main).toContainText(v33Case.ranked);
    await expect(main).toContainText(v33Case.veteran);
    await expect(main).toContainText(v33Case.maps);
    await expect(main).toContainText('v0.33.4');
    await expect(main).toContainText(v33Case.replay);
    await expect(main).toContainText(v33Case.tribe);
    await expect(main).toContainText(v33Case.thresholds);
    await expect(main).toContainText(v33Case.rot);
    await expect(main).toContainText(v33Case.batch);
    await expect(main).toContainText(v33Case.timing);
    await expect(main).toContainText(v33Case.single);
    await expect(main).toContainText('150');
    await expect(main).toContainText('MIRV');
  });
}

const doomsdayCases = [
  {
    lang: 'en',
    path: '/guides/doomsday-clock/',
    v32Path: '/changelog/v32/',
    v33Path: '/changelog/v33/',
    notCircle: 'It is not a circle',
    warning: '30 seconds',
    team: 'every living teammate',
    noInstantWin: 'does not award an instant win',
    troopRate: '2%',
    warshipRate: '50%',
    floor: '5%',
    floorTransition: '40% to 5%',
    thresholds: '2%, 4%, 7%, 11%, 17%, 25%, and 35%',
    rot: 'territory rot',
    deadline: '150 seconds',
    equalSafe: 'equal to or above',
    recoveryHeading: 'A 30-second recovery playbook',
    shapeHeading: 'Choose territory by shape, not by distance from center',
    faqHeading: 'Doomsday Clock FAQ',
  },
  {
    lang: 'zh',
    path: '/zh/guides/doomsday-clock/',
    v32Path: '/zh/changelog/v32/',
    v33Path: '/zh/changelog/v33/',
    notCircle: '不是从地图边缘向中心移动的安全圈',
    warning: '30 秒',
    team: '所有存活队友的领土相加',
    noInstantWin: '不会立即判胜',
    troopRate: '2%',
    warshipRate: '50%',
    floor: '5%',
    floorTransition: '40% 降到 5%',
    thresholds: '2%、4%、7%、11%、17%、25% 和 35%',
    rot: '领土腐化',
    deadline: '150 秒',
    equalSafe: '等于或高于',
    recoveryHeading: '30 秒警告期的救场流程',
    shapeHeading: '判断领土形状，而不是判断离中心多远',
    faqHeading: '末日时钟常见问题',
  },
  {
    lang: 'fr',
    path: '/fr/guides/doomsday-clock/',
    v32Path: '/fr/changelog/v32/',
    v33Path: '/fr/changelog/v33/',
    notCircle: 'Ce n’est pas un cercle',
    warning: '30 secondes',
    team: 'territoires de tous les coéquipiers vivants',
    noInstantWin: 'ne donne toutefois pas une victoire instantanée',
    troopRate: '2 %',
    warshipRate: '50 %',
    floor: '5 %',
    floorTransition: '40 % à 5 %',
    thresholds: '2 %, 4 %, 7 %, 11 %, 17 %, 25 %, puis 35 %',
    rot: 'corruption territoriale',
    deadline: '150 secondes',
    equalSafe: 'égal ou supérieur',
    recoveryHeading: 'Plan de récupération pendant les 30 secondes',
    shapeHeading: 'Choisir la forme du territoire, pas sa distance au centre',
    faqHeading: 'Questions fréquentes sur la Doomsday Clock',
  },
  {
    lang: 'de',
    path: '/de/guides/doomsday-clock/',
    v32Path: '/de/changelog/v32/',
    v33Path: '/de/changelog/v33/',
    notCircle: 'Sie ist kein Kreis',
    warning: '30 Sekunden',
    team: 'Gebiete aller lebenden Teammitglieder',
    noInstantWin: 'vergibt aber keinen Sofortsieg',
    troopRate: '2 %',
    warshipRate: '50 %',
    floor: '5 %',
    floorTransition: '40 % auf 5 %',
    thresholds: '2 %, 4 %, 7 %, 11 %, 17 %, 25 % und schließlich 35 %',
    rot: 'Gebietszerfall',
    deadline: '150 Sekunden',
    equalSafe: 'gleich oder größer',
    recoveryHeading: 'Rettungsplan für die 30-Sekunden-Warnung',
    shapeHeading: 'Gebietsform statt Entfernung zur Mitte wählen',
    faqHeading: 'Häufige Fragen zur Doomsday Clock',
  },
  {
    lang: 'nl',
    path: '/nl/guides/doomsday-clock/',
    v32Path: '/nl/changelog/v32/',
    v33Path: '/nl/changelog/v33/',
    notCircle: 'Het is geen cirkel',
    warning: '30 seconden',
    team: 'gebieden van alle levende teamgenoten',
    noInstantWin: 'geeft geen directe overwinning',
    troopRate: '2%',
    warshipRate: '50%',
    floor: '5%',
    floorTransition: '40% naar 5%',
    thresholds: '2%, 4%, 7%, 11%, 17%, 25% en uiteindelijk 35%',
    rot: 'landrot',
    deadline: '150 seconden',
    equalSafe: 'gelijk aan of hoger',
    recoveryHeading: 'Herstelplan voor de waarschuwing van 30 seconden',
    shapeHeading: 'Kies de vorm van je gebied, niet de afstand tot het midden',
    faqHeading: 'Veelgestelde vragen over de Doomsday Clock',
  },
] as const;

for (const doomsdayCase of doomsdayCases) {
  test(`Doomsday guide[${doomsdayCase.lang}] explains the current territory-threshold rules`, async ({ page }) => {
    await page.goto(doomsdayCase.path, { waitUntil: 'domcontentloaded' });

    const main = page.locator('main');
    await expect(main).toContainText(doomsdayCase.notCircle);
    await expect(main).toContainText(doomsdayCase.warning);
    await expect(main).toContainText(doomsdayCase.team);
    await expect(main).toContainText(doomsdayCase.noInstantWin);
    await expect(main).toContainText(doomsdayCase.troopRate);
    await expect(main).toContainText(doomsdayCase.warshipRate);
    await expect(main).toContainText(doomsdayCase.floor);
    await expect(main).toContainText(doomsdayCase.floorTransition);
    await expect(main).toContainText(doomsdayCase.thresholds);
    await expect(main).toContainText(doomsdayCase.rot);
    await expect(main).toContainText(doomsdayCase.deadline);
    await expect(main).toContainText(doomsdayCase.equalSafe);
    await expect(main.getByRole('heading', { level: 2, name: doomsdayCase.recoveryHeading })).toBeVisible();
    await expect(main.getByRole('heading', { level: 2, name: doomsdayCase.shapeHeading })).toBeVisible();
    await expect(main.getByRole('heading', { level: 2, name: doomsdayCase.faqHeading })).toBeVisible();

    const waveTable = main.locator('table').filter({ hasText: '45:00' }).first();
    await expect(waveTable).toBeVisible();
    await expect(waveTable.locator('tbody tr')).toHaveCount(4);

    const timingTable = main.locator('table').filter({ hasText: '41:00' }).first();
    await expect(timingTable).toBeVisible();
    await expect(timingTable.locator('tbody tr')).toHaveCount(4);

    await expect(
      main.locator('a[href="https://github.com/openfrontio/OpenFrontIO/blob/v0.33.2/src/core/game/DoomsdayClock.ts"]'),
    ).toHaveCount(1);
  });

  test(`Doomsday guide[${doomsdayCase.lang}] has natural entries from both version overviews`, async ({ page }) => {
    await page.goto(doomsdayCase.v32Path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator(`main a[href="${doomsdayCase.path}"]`)).toHaveCount(1);

    await page.goto(doomsdayCase.v33Path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator(`main a[href="${doomsdayCase.path}"]`)).toHaveCount(1);
  });
}

const mirvSamCases = [
  {
    lang: 'en',
    mechanicsPath: '/mechanics/nukes/',
    strategyPath: '/strategies/nuclear-deterrence/',
    carrier: 'carrier remains outside the SAM target list',
    warhead: 'normal NukeExecution and SAM trajectory checks',
    cooldown: 'Missile Silo on cooldown',
    batch: 'Atom Bomb x1/x2/x5/xMax',
    timing: 'One Silo releases queued bombs one tick apart',
    strategy: 'trajectory, range, timing, ready-shot, and cooldown logic',
  },
  {
    lang: 'zh',
    mechanicsPath: '/zh/mechanics/nukes/',
    strategyPath: '/zh/strategies/nuclear-deterrence/',
    carrier: 'MIRV 载体仍不在 SAM 目标列表中',
    warhead: '接受 SAM 弹道检查',
    cooldown: 'Missile Silo 进入冷却',
    batch: '原子弹 x1/x2/x5/xMax',
    timing: '同一 Silo 的核弹每隔 1 tick 发出一枚',
    strategy: '按弹道、射程、时机、可用弹量与冷却检查',
  },
  {
    lang: 'fr',
    mechanicsPath: '/fr/mechanics/nukes/',
    strategyPath: '/fr/strategies/nuclear-deterrence/',
    carrier: 'le véhicule reste hors de la liste SAM',
    warhead: 'contrôle de trajectoire normal',
    cooldown: 'Missile Silo en cooldown',
    batch: 'Atom Bomb x1/x2/x5/xMax',
    timing: 'Un même Silo espace ses bombes d’un tick',
    strategy: 'selon la trajectoire, la portée, le timing, les tirs prêts et le cooldown',
  },
  {
    lang: 'de',
    mechanicsPath: '/de/mechanics/nukes/',
    strategyPath: '/de/strategies/nuclear-deterrence/',
    carrier: 'Der Träger bleibt außerhalb der SAM-Zielliste',
    warhead: 'normale Flugbahnprüfung',
    cooldown: 'Missile Silo auf Cooldown',
    batch: 'Atom Bomb x1/x2/x5/xMax',
    timing: 'Dasselbe Silo startet seine Bomben mit je einem Tick Abstand',
    strategy: 'nach Flugbahn, Reichweite, Timing, bereiten Schüssen und Cooldown',
  },
  {
    lang: 'nl',
    mechanicsPath: '/nl/mechanics/nukes/',
    strategyPath: '/nl/strategies/nuclear-deterrence/',
    carrier: 'de drager blijft buiten de SAM-doellijst',
    warhead: 'normale baancontrole',
    cooldown: 'Missile Silo op cooldown',
    batch: 'Atom Bomb x1/x2/x5/xMax',
    timing: 'Dezelfde Silo lanceert bommen met telkens één tick ertussen',
    strategy: 'op baan, bereik, timing, gereed schot en cooldown',
  },
];

for (const mirvSamCase of mirvSamCases) {
  test(`MIRV/SAM mechanics[${mirvSamCase.lang}] distinguish carrier and warheads`, async ({ page }) => {
    await page.goto(mirvSamCase.mechanicsPath, { waitUntil: 'domcontentloaded' });

    const main = page.locator('main');
    await expect(main).toContainText(mirvSamCase.carrier);
    await expect(main).toContainText(mirvSamCase.warhead);
    await expect(main).toContainText(mirvSamCase.cooldown);
    await expect(main).toContainText(mirvSamCase.batch);
    await expect(main).toContainText(mirvSamCase.timing);
    await expect(main.getByRole('link', { name: /SAM|上游/ })).toHaveAttribute(
      'href',
      'https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/core/execution/SAMLauncherExecution.ts',
    );
    await expect(
      main.locator('a[href="https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/core/execution/NukeExecution.ts"]'),
    ).toHaveCount(1);
  });

  test(`MIRV/SAM strategy[${mirvSamCase.lang}] keeps the same decision rule`, async ({ page }) => {
    await page.goto(mirvSamCase.strategyPath, { waitUntil: 'domcontentloaded' });

    const main = page.locator('main');
    await expect(main).toContainText(mirvSamCase.strategy);
    await expect(main).toContainText('MIRV');
  });
}

const hotkeySelectionCases = [
  {
    lang: 'en',
    path: '/guides/hotkeys/',
    selection: 'Right-click cancels an active warship or boat selection in v33.1',
    batch: 'Press 8 once to arm one Atom Bomb',
    single: 'Hydrogen Bombs and MIRVs do not gain the x5 hotkey batch',
    cost: 'escalating cost',
  },
  {
    lang: 'zh',
    path: '/zh/guides/hotkeys/',
    selection: '选中战舰或船只时右键会先取消选择',
    batch: '按一次 8 武装 1 枚原子弹',
    single: '氢弹和 MIRV 都不会获得 x5 热键批量',
    cost: '逐级递增成本计价',
  },
  {
    lang: 'fr',
    path: '/fr/guides/hotkeys/',
    selection: 'une sélection active de Warships ou de bateaux',
    batch: 'Appuyez une fois sur 8 pour armer une Atom Bomb x1',
    single: 'Hydrogen et MIRV n’obtiennent pas le lot x5',
    cost: 'coût croissant de chaque niveau',
  },
  {
    lang: 'de',
    path: '/de/guides/hotkeys/',
    selection: 'hebt ein Rechtsklick zuerst eine aktive Warship- oder Bootsauswahl auf',
    batch: 'Drücke 8 einmal für eine Atom Bomb x1',
    single: 'Hydrogen Bomb und MIRV erhalten keine x5-Hotkey-Menge',
    cost: 'steigenden Preis',
  },
  {
    lang: 'nl',
    path: '/nl/guides/hotkeys/',
    selection: 'wist een rechtermuisklik eerst een actieve oorlogsschip- of bootselectie',
    batch: 'Druk 8 eenmaal voor een Atom Bomb x1',
    single: 'Hydrogen Bomb en MIRV krijgen geen x5-hotkeybundel',
    cost: 'stijgende prijs',
  },
];

for (const hotkeyCase of hotkeySelectionCases) {
  test(`hotkeys[${hotkeyCase.lang}] documents v33.4 bulk controls and selection cancel`, async ({ page }) => {
    await page.goto(hotkeyCase.path, { waitUntil: 'domcontentloaded' });
    const main = page.locator('main');
    await expect(main).toContainText(hotkeyCase.selection);
    await expect(main).toContainText(hotkeyCase.batch);
    await expect(main).toContainText(hotkeyCase.single);
    await expect(main).toContainText(hotkeyCase.cost);
  });
}

const waterNukeBatchCases = [
  {
    lang: 'en',
    path: '/guides/water-nukes/',
    unchanged: 'changes the tempo, not the conversion rule',
    batch: 'Atom Bombs can be launched in x2/x5/xMax batches',
    timing: 'One Silo releases queued bombs one tick apart',
  },
  {
    lang: 'zh',
    path: '/zh/guides/water-nukes/',
    unchanged: '改变的是打击节奏，不是地形转换机制',
    batch: '径向菜单可选原子弹 x2/x5/xMax',
    timing: '同一 Silo 的核弹逐 tick 发出',
  },
  {
    lang: 'fr',
    path: '/fr/guides/water-nukes/',
    unchanged: 'change le rythme, pas la conversion',
    batch: 'Atom Bombs x2/x5/xMax',
    timing: 'Un même Silo espace les bombes d’un tick',
  },
  {
    lang: 'de',
    path: '/de/guides/water-nukes/',
    unchanged: 'ändert das Tempo, nicht die Geländeumwandlung',
    batch: 'Atom Bombs x2/x5/xMax',
    timing: 'Dasselbe Silo feuert im Tick-Abstand',
  },
  {
    lang: 'nl',
    path: '/nl/guides/water-nukes/',
    unchanged: 'verandert het tempo, niet de omzetting',
    batch: 'Atom Bombs x2/x5/xMax',
    timing: 'Dezelfde Silo vuurt per tick',
  },
] as const;

for (const waterNukeCase of waterNukeBatchCases) {
  test(`Water Nukes[${waterNukeCase.lang}] applies v33.4 timing without changing conversion`, async ({ page }) => {
    await page.goto(waterNukeCase.path, { waitUntil: 'domcontentloaded' });
    const main = page.locator('main');
    await expect(main).toContainText(waterNukeCase.unchanged);
    await expect(main).toContainText(waterNukeCase.batch);
    await expect(main).toContainText(waterNukeCase.timing);
  });
}

const waterNukePathfindingCases = [
  {
    lang: 'en',
    path: '/guides/water-nukes/',
    limitation: 'Known v33.4 ship-route limitation',
    cost: 'three times the normal step cost',
    release: 'upcoming fix until a Release includes it',
  },
  {
    lang: 'zh',
    path: '/zh/guides/water-nukes/',
    limitation: 'v33.4 已知舰船绕路问题',
    cost: '单步成本提高到正常值的 3 倍',
    release: '只能把它视为即将发布的修复',
  },
  {
    lang: 'fr',
    path: '/fr/guides/water-nukes/',
    limitation: 'Limite connue des routes navales en v33.4',
    cost: 'un coût trois fois supérieur',
    release: 'Traitez-le comme un correctif à venir jusqu’à sa publication',
  },
  {
    lang: 'de',
    path: '/de/guides/water-nukes/',
    limitation: 'Bekannte Schiffsweg-Einschränkung in v33.4',
    cost: 'dreifachen Schrittkostenwert',
    release: 'Bis zu einem Release bleibt er ein kommender Fix',
  },
  {
    lang: 'nl',
    path: '/nl/guides/water-nukes/',
    limitation: 'Bekende beperking van scheepsroutes in v33.4',
    cost: 'drie keer de normale stapkosten',
    release: 'Behandel dit als een komende fix totdat een Release hem bevat',
  },
] as const;

for (const pathfindingCase of waterNukePathfindingCases) {
  test(`Water Nukes[${pathfindingCase.lang}] separates the v33.4 detour from the unreleased fix`, async ({ page }) => {
    await page.goto(pathfindingCase.path, { waitUntil: 'domcontentloaded' });
    const main = page.locator('main');
    await expect(main).toContainText(pathfindingCase.limitation);
    await expect(main).toContainText(pathfindingCase.cost);
    await expect(main).toContainText(pathfindingCase.release);

    const issueSource = main.locator('a[href="https://github.com/openfrontio/OpenFrontIO/issues/4760"]');
    const fixSource = main.locator('a[href="https://github.com/openfrontio/OpenFrontIO/pull/4975"]');
    await expect(issueSource).toHaveCount(1);
    await expect(fixSource).toHaveCount(1);

    const comparisonImages = main.locator('img[src^="https://github.com/user-attachments/assets/"]');
    await expect(comparisonImages).toHaveCount(2);
  });
}

const mapFlowCases = [
  { path: '/database/maps/', heading: 'A three-pass map check', steps: ['Contact distance', 'Water routes', 'Spawn fairness'] },
  { path: '/zh/database/maps/', heading: '三步选图检查', steps: ['接敌距离', '水路连通', '出生公平'] },
  { path: '/fr/database/maps/', heading: 'Vérification de carte en trois passes', steps: ['Distance de contact', 'Routes maritimes', 'Équité des spawns'] },
  { path: '/de/database/maps/', heading: 'Kartenprüfung in drei Schritten', steps: ['Kontaktentfernung', 'Wasserwege', 'Spawn-Fairness'] },
  { path: '/nl/database/maps/', heading: 'Kaartcontrole in drie stappen', steps: ['Contactafstand', 'Waterroutes', 'Spawn-gelijkheid'] },
];

for (const mapFlowCase of mapFlowCases) {
  test(`${mapFlowCase.path} includes a code-native map reading diagram`, async ({ page }) => {
    await page.goto(mapFlowCase.path, { waitUntil: 'domcontentloaded' });
    const flow = page.locator('[data-map-reading-flow]');
    await expect(flow).toBeVisible();
    await expect(flow.getByRole('heading', { name: mapFlowCase.heading })).toBeVisible();
    const steps = flow.locator('ol > li');
    await expect(steps).toHaveCount(3);
    for (const [index, label] of mapFlowCase.steps.entries()) {
      await expect(steps.nth(index)).toContainText(label);
    }
  });
}

const collectionCases = [
  { path: '/guides/', heading: 'How these guides are produced' },
  { path: '/strategies/', heading: 'How to read these strategies' },
  { path: '/zh/guides/', heading: '这些教程如何编写' },
  { path: '/zh/strategies/', heading: '如何阅读这些策略' },
  { path: '/fr/guides/', heading: 'Comment ces tutoriels sont produits' },
  { path: '/fr/strategies/', heading: 'Comment lire ces stratégies' },
  { path: '/de/guides/', heading: 'Wie diese Anleitungen entstehen' },
  { path: '/de/strategies/', heading: 'So liest du diese Strategien' },
  { path: '/nl/guides/', heading: 'Hoe deze gidsen tot stand komen' },
  { path: '/nl/strategies/', heading: 'Hoe je deze strategieën leest' },
];

for (const collectionCase of collectionCases) {
  test(`${collectionCase.path} explains its editorial method`, async ({ page }) => {
    await page.goto(collectionCase.path, { waitUntil: 'domcontentloaded' });
    const intro = page.locator('[data-collection-intro]');
    await expect(intro).toBeVisible();
    await expect(intro.getByRole('heading', { name: collectionCase.heading })).toBeVisible();
  });
}

test('sitemap omits fabricated lastmod values and contains every legal route', async ({ request }) => {
  const response = await request.get('/sitemap-0.xml');
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();

  expect(xml).not.toContain('<lastmod>');
  expect(xml).not.toContain('<loc>https://openfront.fyi/404/</loc>');

  for (const langPrefix of ['', 'zh/', 'fr/', 'de/', 'nl/']) {
    for (const page of ['privacy', 'contact', 'editorial-policy']) {
      expect(xml).toContain(`<loc>https://openfront.fyi/${langPrefix}${page}/</loc>`);
    }
  }
});

test('localized privacy page exposes canonical and complete hreflang links', async ({ page }) => {
  await page.goto('/zh/privacy/', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://openfront.fyi/zh/privacy/',
  );

  const alternates = {
    en: 'https://openfront.fyi/privacy/',
    fr: 'https://openfront.fyi/fr/privacy/',
    nl: 'https://openfront.fyi/nl/privacy/',
    de: 'https://openfront.fyi/de/privacy/',
    'zh-CN': 'https://openfront.fyi/zh/privacy/',
    'x-default': 'https://openfront.fyi/privacy/',
  };

  for (const [hreflang, href] of Object.entries(alternates)) {
    await expect(page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`)).toHaveAttribute('href', href);
  }
});

test('privacy disclosure matches the consent-gated analytics behavior', async ({ page }) => {
  await page.goto('/privacy/', { waitUntil: 'domcontentloaded' });

  const main = page.locator('main');
  await expect(main).toContainText('only after you choose “Allow analytics”');
  await expect(main).toContainText('does not serve Google AdSense advertisements');
  await expect(page.locator('script[data-openfront-analytics]')).toHaveCount(0);
  await expect(page.getByTestId('consent-banner')).toBeVisible();
});
