import { expect, test } from '@playwright/test';

const homeCases = [
  { path: '/', phrase: 'Maps, Units, Mechanics & Strategy' },
  { path: '/fr/', phrase: 'cartes, unités, mécaniques et stratégies' },
  { path: '/nl/', phrase: 'kaarten, eenheden, mechanieken en strategie' },
  { path: '/de/', phrase: 'Karten, Einheiten, Mechaniken & Strategie' },
  { path: '/zh/', phrase: '地图、单位、机制与实战策略' },
];

for (const homeCase of homeCases) {
  test(`${homeCase.path} uses an intent-rich homepage title`, async ({ page }) => {
    await page.goto(homeCase.path, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(new RegExp(homeCase.phrase));
  });
}

const sectionCases = [
  { path: '/mechanics/nukes/', phrase: 'Rules, Stats & Examples' },
  { path: '/fr/mechanics/nukes/', phrase: 'règles, chiffres, exemples' },
  { path: '/nl/mechanics/nukes/', phrase: 'regels, cijfers en voorbeelden' },
  { path: '/de/mechanics/nukes/', phrase: 'Regeln, Werte und Beispiele' },
  { path: '/zh/mechanics/nukes/', phrase: '规则、数值与实战例子' },
];

for (const sectionCase of sectionCases) {
  test(`${sectionCase.path} adds a localized click-oriented benefit`, async ({ page }) => {
    await page.goto(sectionCase.path, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(new RegExp(sectionCase.phrase));
    expect([...(await page.title())].length).toBeLessThanOrEqual(sectionCase.path.startsWith('/zh/') ? 40 : 68);
  });
}

test('utility pages use specific search-intent titles', async ({ page }) => {
  await page.goto('/glossary/', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('OpenFront.io Glossary: Units, Modes & Strategy Terms');

  await page.goto('/zh/shortcuts/', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('OpenFront.io 快捷键大全：键盘、鼠标与高效操作');
});

test('long visible headings still receive a concise SEO title', async ({ page }) => {
  await page.goto('/fr/strategies/economy-fundamentals/', { waitUntil: 'domcontentloaded' });
  const title = await page.title();
  expect(title).toContain('OpenFront.io');
  expect(title).toContain('tactiques');
  expect(title).toContain('contres');
  expect(title).not.toBe("Fondamentaux de l'économie — Pourquoi vous perdez la course à l'argent");
  expect([...title].length).toBeLessThanOrEqual(68);
});
