import { expect, test } from '@playwright/test';

const homepageCases = [
  { lang: 'en', path: '/', prefix: '/' },
  { lang: 'zh', path: '/zh/', prefix: '/zh/' },
  { lang: 'fr', path: '/fr/', prefix: '/fr/' },
  { lang: 'de', path: '/de/', prefix: '/de/' },
  { lang: 'nl', path: '/nl/', prefix: '/nl/' },
] as const;

const latestGuideSlugs = {
  en: ['hotkeys', 'land-combat', 'mirv', 'mobile-app-download', 'nations-pressure'],
  localized: ['land-combat', 'mirv', 'mobile-app-download', 'nations-pressure', 'nuke-calculator'],
} as const;

for (const homepageCase of homepageCases) {
  test(`homepage[${homepageCase.lang}] features the five newest guides`, async ({ page }) => {
    await page.goto(homepageCase.path, { waitUntil: 'domcontentloaded' });

    const section = page.locator('[data-home-latest-guides]');
    await expect(section).toBeVisible();

    const links = section.locator('[data-home-latest-guide]');
    const expectedSlugs = homepageCase.lang === 'en' ? latestGuideSlugs.en : latestGuideSlugs.localized;
    await expect(links).toHaveCount(expectedSlugs.length);
    await expect(section.locator(`a[href="${homepageCase.prefix}guides/"]`)).toHaveCount(1);

    for (const [index, slug] of expectedSlugs.entries()) {
      const link = links.nth(index);
      await expect(link).toHaveAttribute('data-guide-slug', slug);
      await expect(link).toHaveAttribute('href', `${homepageCase.prefix}guides/${slug}/`);
    }
  });
}
