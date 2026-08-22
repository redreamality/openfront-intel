import { test, expect } from '@playwright/test';

const locales = [
  {
    lang: 'en',
    prefix: '',
    indexTitle: 'Map guides',
    svalmelAnswer: 'Direct answer: how should you play Svalmel?',
    dyslexdriaAnswer: 'Direct answer: how should you play Dyslexdria?',
    spawnBoundary: 'not human spawn',
    transportBoundary: 'does not require a Port',
    databasePurpose: 'complete map list and category reference',
  },
  {
    lang: 'zh',
    prefix: '/zh',
    indexTitle: '地图攻略',
    svalmelAnswer: '直接答案：Svalmel 应该怎样打？',
    dyslexdriaAnswer: '直接答案：Dyslexdria 应该怎样打？',
    spawnBoundary: '不是人类出生点',
    transportBoundary: '不要求 Port',
    databasePurpose: '完整地图清单与分类',
  },
  {
    lang: 'fr',
    prefix: '/fr',
    indexTitle: 'Guides des cartes',
    svalmelAnswer: 'Réponse directe : comment jouer Svalmel ?',
    dyslexdriaAnswer: 'Réponse directe : comment jouer Dyslexdria ?',
    spawnBoundary: 'pas des spawns humains',
    transportBoundary: 'ne demande pas de Port',
    databasePurpose: 'liste complète et les catégories',
  },
  {
    lang: 'de',
    prefix: '/de',
    indexTitle: 'Kartenanleitungen',
    svalmelAnswer: 'Direkte Antwort: Wie spielt man Svalmel?',
    dyslexdriaAnswer: 'Direkte Antwort: Wie spielt man Dyslexdria?',
    spawnBoundary: 'keine Menschen-Spawns',
    transportBoundary: 'braucht keinen Port',
    databasePurpose: 'vollständige Kartenliste mit Kategorien',
  },
  {
    lang: 'nl',
    prefix: '/nl',
    indexTitle: 'Kaartgidsen',
    svalmelAnswer: 'Het directe antwoord: hoe speel je Svalmel?',
    dyslexdriaAnswer: 'Het directe antwoord: hoe speel je Dyslexdria?',
    spawnBoundary: 'geen menselijke spawn',
    transportBoundary: 'geen Port nodig',
    databasePurpose: 'volledige kaartenlijst met categorieën',
  },
] as const;

const licenseUrl = 'https://creativecommons.org/licenses/by-sa/4.0/';
const rawRoot = 'https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.33.7/resources/maps';
const sourceRoot = 'https://github.com/openfrontio/OpenFrontIO/blob/v0.33.7/resources/maps';

for (const locale of locales) {
  const indexPath = `${locale.prefix}/maps/`;
  const svalmelPath = `${locale.prefix}/maps/svalmel/`;
  const dyslexdriaPath = `${locale.prefix}/maps/dyslexdria/`;
  const databasePath = `${locale.prefix}/database/maps/`;

  test(`map database[${locale.lang}] exposes the localized strategy index`, async ({ page }) => {
    await page.goto(databasePath, { waitUntil: 'domcontentloaded' });
    const entry = page.locator('[data-map-guides-entry]');

    await expect(entry).toBeVisible();
    await expect(entry).toContainText(locale.databasePurpose);
    await expect(entry.locator(`a[href="${indexPath}"]`)).toBeVisible();
  });

  test(`map index[${locale.lang}] links to both verified map pages`, async ({ page }) => {
    await page.goto(indexPath, { waitUntil: 'domcontentloaded' });
    const main = page.locator('main');

    await expect(main.getByRole('heading', { level: 1, name: locale.indexTitle })).toBeVisible();
    await expect(main.locator(`a[href="${svalmelPath}"]`)).toHaveCount(1);
    await expect(main.locator(`a[href="${dyslexdriaPath}"]`)).toHaveCount(1);
  });

  test(`Svalmel map page[${locale.lang}] preserves topology, scenarios, and attribution`, async ({ page }) => {
    await page.goto(svalmelPath, { waitUntil: 'domcontentloaded' });
    const main = page.locator('main');

    await expect(main.getByRole('heading', { level: 2, name: locale.svalmelAnswer })).toBeVisible();
    await expect(main).toContainText(/91[,.]48/);
    await expect(main).toContainText(/35[,.]28/);
    await expect(main).toContainText(locale.spawnBoundary);
    await expect(main).toContainText(locale.transportBoundary);
    await expect(main.locator('h2').filter({ hasText: /Scenario|场景|Scénario|Szenario/ })).toHaveCount(3);
    await expect(main.locator(`img[src="${rawRoot}/svalmel/thumbnail.webp"]`)).toHaveCount(1);
    await expect(main.locator(`a[href="${licenseUrl}"]`)).toHaveCount(1);
    await expect(main.locator(`a[href="${sourceRoot}/svalmel/thumbnail.webp"]`)).toHaveCount(1);
    await expect(main.locator(`a[href="${dyslexdriaPath}"]`)).toHaveCount(2);
    await expect(main.locator('a[href*="/issues/"], a[href*="/pull/"]')).toHaveCount(0);
  });

  test(`Dyslexdria map page[${locale.lang}] preserves impassable, scenarios, and attribution`, async ({ page }) => {
    await page.goto(dyslexdriaPath, { waitUntil: 'domcontentloaded' });
    const main = page.locator('main');

    await expect(main.getByRole('heading', { level: 2, name: locale.dyslexdriaAnswer })).toBeVisible();
    await expect(main).toContainText(/16[,.]77/);
    await expect(main).toContainText('175');
    await expect(main).toContainText('224');
    await expect(main).toContainText(locale.spawnBoundary);
    await expect(main).toContainText(locale.transportBoundary);
    await expect(main.locator('h2').filter({ hasText: /Scenario|场景|Scénario|Szenario/ })).toHaveCount(3);
    await expect(main.locator(`img[src="${rawRoot}/dyslexdria/thumbnail.webp"]`)).toHaveCount(1);
    await expect(main.locator(`a[href="${licenseUrl}"]`)).toHaveCount(1);
    await expect(main.locator(`a[href="${sourceRoot}/dyslexdria/thumbnail.webp"]`)).toHaveCount(1);
    await expect(main.locator(`a[href="${svalmelPath}"]`)).toHaveCount(2);
    await expect(main.locator('a[href*="/issues/"], a[href*="/pull/"]')).toHaveCount(0);
  });
}
