import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';

const maps = JSON.parse(
  readFileSync(new URL('../src/data/maps.json', import.meta.url), 'utf8'),
) as { meta: { total: number } };

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

test('provenance distinguishes the extraction checkout from the editorial snapshot scope', async ({ page }) => {
  await page.goto('/database/units/', { waitUntil: 'domcontentloaded' });

  const provenance = page.locator('[data-provenance-panel]');
  await expect(provenance).toContainText('generated from the recorded upstream checkout');
  await expect(provenance).toContainText('editorial validation scope and embedded fallback remain v32');
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
  { lang: 'en', path: '/mechanics/', text: 'Numeric examples are scoped to the v32 data snapshot' },
  { lang: 'zh', path: '/zh/mechanics/', text: '数值示例适用于 v32 数据快照' },
  { lang: 'fr', path: '/fr/mechanics/', text: 'Les exemples numériques sont limités à l’instantané v32' },
  { lang: 'de', path: '/de/mechanics/', text: 'Zahlenbeispiele gelten für den v32-Datenstand' },
  { lang: 'nl', path: '/nl/mechanics/', text: 'Cijfervoorbeelden gelden voor de v32-datasnapshot' },
];

for (const mechanicsCase of mechanicsCases) {
  test(`mechanics[${mechanicsCase.lang}] states the snapshot scope`, async ({ page }) => {
    await page.goto(mechanicsCase.path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toContainText(mechanicsCase.text);
  });
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
