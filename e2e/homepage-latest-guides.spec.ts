import { expect, test } from '@playwright/test';

const homepageCases = [
  { lang: 'en', path: '/', prefix: '/' },
  { lang: 'zh', path: '/zh/', prefix: '/zh/' },
  { lang: 'fr', path: '/fr/', prefix: '/fr/' },
  { lang: 'de', path: '/de/', prefix: '/de/' },
  { lang: 'nl', path: '/nl/', prefix: '/nl/' },
] as const;

const latestGuideSlugs = [
  'mobile-alternatives',
  'mobile-app-download',
  'mobile-controls',
  'mobile-reddit-community',
  'transport-landings',
] as const;

for (const homepageCase of homepageCases) {
  test(`homepage[${homepageCase.lang}] features the five newest guides`, async ({ page }) => {
    await page.goto(homepageCase.path, { waitUntil: 'domcontentloaded' });

    const section = page.locator('[data-home-latest-guides]');
    await expect(section).toBeVisible();

    const links = section.locator('[data-home-latest-guide]');
    await expect(links).toHaveCount(latestGuideSlugs.length);
    await expect(section.locator(`a[href="${homepageCase.prefix}guides/"]`)).toHaveCount(1);

    for (const [index, slug] of latestGuideSlugs.entries()) {
      const link = links.nth(index);
      await expect(link).toHaveAttribute('data-guide-slug', slug);
      await expect(link).toHaveAttribute('href', `${homepageCase.prefix}guides/${slug}/`);
    }
  });
}
