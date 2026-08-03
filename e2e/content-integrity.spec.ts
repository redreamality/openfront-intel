import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';

const maps = JSON.parse(
  readFileSync(new URL('../src/data/maps.json', import.meta.url), 'utf8'),
) as { meta: { total: number }; list: Array<{ id: string }> };

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

test('changelog v33 keeps the beta tag in the official Release URL', async ({ page }) => {
  await page.goto('/changelog/v33/', { waitUntil: 'domcontentloaded' });

  const provenance = page.locator('[data-provenance-panel]');
  await expect(provenance).toBeVisible();
  await expect(provenance.getByRole('link', { name: /GitHub Release/ })).toHaveAttribute(
    'href',
    'https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.0-beta1',
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
  { lang: 'en', path: '/mechanics/', text: 'Numeric examples are scoped to the v33 beta data snapshot' },
  { lang: 'zh', path: '/zh/mechanics/', text: '数值示例适用于 v33 beta 数据快照' },
  { lang: 'fr', path: '/fr/mechanics/', text: 'Les exemples numériques sont limités à l’instantané v33 beta' },
  { lang: 'de', path: '/de/mechanics/', text: 'Zahlenbeispiele gelten für den v33-Beta-Datenstand' },
  { lang: 'nl', path: '/nl/mechanics/', text: 'Cijfervoorbeelden gelden voor de v33-beta-datasnapshot' },
];

for (const mechanicsCase of mechanicsCases) {
  test(`mechanics[${mechanicsCase.lang}] states the snapshot scope`, async ({ page }) => {
    await page.goto(mechanicsCase.path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toContainText(mechanicsCase.text);
  });
}

const freshnessLanguages = [
  {
    lang: 'en',
    prefix: '',
    labels: ['Applies to', 'Last verified', 'What changed in this version'],
    hotkeyFact: 'right-click',
  },
  {
    lang: 'zh',
    prefix: '/zh',
    labels: ['适用版本', '最后核验', '本版本关键变化'],
    hotkeyFact: '右键',
  },
  {
    lang: 'fr',
    prefix: '/fr',
    labels: ['Version applicable', 'Dernière vérification', 'Changement clé de cette version'],
    hotkeyFact: 'clic droit',
  },
  {
    lang: 'de',
    prefix: '/de',
    labels: ['Gilt für', 'Zuletzt geprüft', 'Wichtigste Änderung dieser Version'],
    hotkeyFact: 'Rechtsklick',
  },
  {
    lang: 'nl',
    prefix: '/nl',
    labels: ['Geldt voor', 'Laatst gecontroleerd', 'Belangrijkste wijziging in deze versie'],
    hotkeyFact: 'rechtermuisklik',
  },
] as const;

const freshnessPages = [
  { route: '/guides/first-match/', fact: '22' },
  { route: '/guides/hotkeys/', fact: 'hotkey' },
  { route: '/guides/water-nukes/', fact: 'MIRV' },
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
      await expect(freshness).toContainText(
        freshnessPage.fact === 'hotkey' ? language.hotkeyFact : freshnessPage.fact,
      );
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
  { path: '/changelog/v33/', grace: '10-minute grace period', ranked: '1 minute', veteran: '3 veterancy levels', maps: '117-map' },
  { path: '/zh/changelog/v33/', grace: '10 分钟宽限期', ranked: '1 分钟', veteran: '3 级熟练度', maps: '117 张地图' },
  { path: '/fr/changelog/v33/', grace: 'grâce de 10 minutes', ranked: '1 minute', veteran: '3 niveaux de vétérérance', maps: '117 cartes' },
  { path: '/de/changelog/v33/', grace: '10 Minuten Schonzeit', ranked: '1 Minute', veteran: '3 Veteranenstufen', maps: '117 Karten' },
  { path: '/nl/changelog/v33/', grace: '10 minuten respijt', ranked: '1 minuut', veteran: '3 veterancy-niveaus', maps: '117 kaarten' },
];

for (const v33Case of v33Cases) {
  test(`${v33Case.path} explains the player-facing v33 beta changes`, async ({ page }) => {
    await page.goto(v33Case.path, { waitUntil: 'domcontentloaded' });
    const main = page.locator('main');
    await expect(main).toContainText(v33Case.grace);
    await expect(main).toContainText(v33Case.ranked);
    await expect(main).toContainText(v33Case.veteran);
    await expect(main).toContainText(v33Case.maps);
    await expect(main).toContainText('MIRV');
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
    strategy: 'trajectory, range, timing, ready-shot, and cooldown logic',
  },
  {
    lang: 'zh',
    mechanicsPath: '/zh/mechanics/nukes/',
    strategyPath: '/zh/strategies/nuclear-deterrence/',
    carrier: 'MIRV 载体仍不在 SAM 目标列表中',
    warhead: '接受 SAM 弹道检查',
    cooldown: 'Missile Silo 进入冷却',
    strategy: '按弹道、射程、时机、可用弹量与冷却检查',
  },
  {
    lang: 'fr',
    mechanicsPath: '/fr/mechanics/nukes/',
    strategyPath: '/fr/strategies/nuclear-deterrence/',
    carrier: 'le véhicule reste hors de la liste SAM',
    warhead: 'contrôle de trajectoire normal',
    cooldown: 'Missile Silo en cooldown',
    strategy: 'selon la trajectoire, la portée, le timing, les tirs prêts et le cooldown',
  },
  {
    lang: 'de',
    mechanicsPath: '/de/mechanics/nukes/',
    strategyPath: '/de/strategies/nuclear-deterrence/',
    carrier: 'Der Träger bleibt außerhalb der SAM-Zielliste',
    warhead: 'normale Flugbahnprüfung',
    cooldown: 'Missile Silo auf Cooldown',
    strategy: 'nach Flugbahn, Reichweite, Timing, bereiten Schüssen und Cooldown',
  },
  {
    lang: 'nl',
    mechanicsPath: '/nl/mechanics/nukes/',
    strategyPath: '/nl/strategies/nuclear-deterrence/',
    carrier: 'de drager blijft buiten de SAM-doellijst',
    warhead: 'normale baancontrole',
    cooldown: 'Missile Silo op cooldown',
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
    await expect(main.getByRole('link', { name: /SAM|上游/ })).toHaveAttribute(
      'href',
      'https://github.com/openfrontio/OpenFrontIO/blob/v0.33.0-beta1/src/core/execution/SAMLauncherExecution.ts',
    );
  });

  test(`MIRV/SAM strategy[${mirvSamCase.lang}] keeps the same decision rule`, async ({ page }) => {
    await page.goto(mirvSamCase.strategyPath, { waitUntil: 'domcontentloaded' });

    const main = page.locator('main');
    await expect(main).toContainText(mirvSamCase.strategy);
    await expect(main).toContainText('MIRV');
  });
}

const hotkeySelectionCases = [
  { lang: 'en', path: '/guides/hotkeys/', text: 'Cancel an active warship/boat selection' },
  { lang: 'zh', path: '/zh/guides/hotkeys/', text: '有战舰/船只选择时取消选择' },
  { lang: 'fr', path: '/fr/guides/hotkeys/', text: 'Annuler une sélection active de Warships/bateaux' },
  { lang: 'de', path: '/de/guides/hotkeys/', text: 'eine aktive Warship-/Bootsauswahl aufheben' },
  { lang: 'nl', path: '/nl/guides/hotkeys/', text: 'een actieve oorlogsschip-/bootselectie wissen' },
];

for (const hotkeyCase of hotkeySelectionCases) {
  test(`hotkeys[${hotkeyCase.lang}] documents v33 right-click selection cancel`, async ({ page }) => {
    await page.goto(hotkeyCase.path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toContainText(hotkeyCase.text);
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
