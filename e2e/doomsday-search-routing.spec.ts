import { expect, test } from '@playwright/test';

const cases = [
  {
    lang: 'en',
    guidePath: '/guides/doomsday-clock/',
    indexPath: '/guides/',
    changelogPath: '/changelog/v33/',
    hotkeysPath: '/guides/hotkeys/',
    seoTitle: 'OpenFront Doomsday Clock: Rules, Waves & Survival',
    description: /rising territory-share test, not a moving safe circle/i,
    indexLink: 'complete Doomsday Clock guide',
    changelogLink: 'complete Doomsday Clock rules and survival guide',
  },
  {
    lang: 'zh',
    guidePath: '/zh/guides/doomsday-clock/',
    indexPath: '/zh/guides/',
    changelogPath: '/zh/changelog/v33/',
    hotkeysPath: '/zh/guides/hotkeys/',
    seoTitle: 'OpenFront 末日时钟：规则、波次与生存攻略',
    description: /检查的是领土占比，不是向地图中心收缩的安全圈/,
    indexLink: '末日时钟完整攻略',
    changelogLink: '末日时钟完整规则与生存攻略',
  },
  {
    lang: 'fr',
    guidePath: '/fr/guides/doomsday-clock/',
    indexPath: '/fr/guides/',
    changelogPath: '/fr/changelog/v33/',
    hotkeysPath: '/fr/guides/hotkeys/',
    seoTitle: 'Doomsday Clock OpenFront : règles, vagues et survie',
    description: /part de terrain croissante, pas un cercle sûr mobile/i,
    indexLink: 'guide complet de la Doomsday Clock',
    changelogLink: 'guide complet des règles et de la survie Doomsday Clock',
  },
  {
    lang: 'de',
    guidePath: '/de/guides/doomsday-clock/',
    indexPath: '/de/guides/',
    changelogPath: '/de/changelog/v33/',
    hotkeysPath: '/de/guides/hotkeys/',
    seoTitle: 'OpenFront Doomsday Clock: Regeln, Wellen & Überleben',
    description: /steigenden Gebietsanteil, keinen wandernden Sicherheitskreis/i,
    indexLink: 'vollständige Doomsday-Clock-Guide',
    changelogLink: 'vollständige Regel- und Überlebensguide zur Doomsday Clock',
  },
  {
    lang: 'nl',
    guidePath: '/nl/guides/doomsday-clock/',
    indexPath: '/nl/guides/',
    changelogPath: '/nl/changelog/v33/',
    hotkeysPath: '/nl/guides/hotkeys/',
    seoTitle: 'OpenFront Doomsday Clock: regels, golven & overleven',
    description: /stijgend landaandeel, niet een bewegende veilige cirkel/i,
    indexLink: 'complete Doomsday Clock-gids',
    changelogLink: 'complete Doomsday Clock-regel- en overlevingsgids',
  },
] as const;

for (const entry of cases) {
  test(`Doomsday guide[${entry.lang}] owns the search intent`, async ({ page }) => {
    await page.goto(entry.guidePath, { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(entry.seoTitle);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', entry.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      new RegExp(`${entry.guidePath.replaceAll('/', '\\/')}$`),
    );
    await expect(page.locator('link[rel="alternate"]')).toHaveCount(6);
  });

  test(`Doomsday guide[${entry.lang}] receives explicit index and v33 routes`, async ({ page }) => {
    await page.goto(entry.indexPath, { waitUntil: 'domcontentloaded' });
    const indexRoute = page.locator('section[data-doomsday-route]');
    await expect(indexRoute.getByRole('link', { name: entry.indexLink, exact: true })).toHaveAttribute(
      'href',
      entry.guidePath,
    );

    await page.goto(entry.changelogPath, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('link', { name: entry.changelogLink, exact: true })).toHaveAttribute(
      'href',
      entry.guidePath,
    );
  });

  test(`Hotkeys[${entry.lang}] does not claim the Doomsday intent`, async ({ page }) => {
    await page.goto(entry.hotkeysPath, { waitUntil: 'domcontentloaded' });

    await expect(page).not.toHaveTitle(/Doomsday|末日时钟/i);
    await expect(page.locator('meta[name="description"]')).not.toHaveAttribute('content', /Doomsday|末日时钟/i);
  });
}
