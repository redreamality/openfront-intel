import { expect, test } from '@playwright/test';

const languages = ['en', 'fr', 'de', 'nl', 'zh'] as const;
for (const lang of languages) {
  const prefix = lang === 'en' ? '' : `/${lang}`;
  test(`search recovery ${lang} links factory investment decisions to the basic answer`, async ({ page }) => {
    for (const slug of ['factory-upgrades', 'port-vs-factory', 'building-timing']) {
      await page.goto(`${prefix}/guides/${slug}/`, { waitUntil: 'domcontentloaded' });
      await page.locator('[data-article-answer-route="factory"] a').click();
      await expect(page).toHaveURL(new RegExp(`${prefix}/guides/what-do-factories-do/$`));
      await expect(page.locator('[data-factory-answer]')).toBeVisible();
    }
  });
  test(`search recovery ${lang} preserves distinct titles and index signals`, async ({ page }) => {
    const titles = new Set<string>();
    for (const path of ['guides/', 'strategies/', 'guides/what-do-factories-do/', 'guides/how-many-factories/', 'guides/seekable-replay-viewer/', 'guides/replay-review/']) {
      const response = await page.goto(`${prefix}/${path}`, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);
      const title = await page.title();
      expect(title).toContain('OpenFront');
      expect(title).not.toContain('…');
      expect([...title].length).toBeLessThanOrEqual(lang === 'zh' ? 40 : 68);
      expect(titles.has(title)).toBe(false);
      titles.add(title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://openfront.fyi${prefix}/${path}`);
      await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(6);
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
    }
  });

  test(`search recovery ${lang} distinguishes player tracking from game data`, async ({ page }) => {
    await page.goto(`${prefix}/database/`, { waitUntil: 'domcontentloaded' });
    const route = page.locator('[data-player-stats-route]');
    await expect(route).toBeVisible();
    await expect(route.locator('a')).toHaveAttribute('href', 'https://ofstats.io/');
    const destination = page.waitForURL('https://ofstats.io/');
    // Keep the test independent of the external tool while verifying the real exit link.
    await page.route('https://ofstats.io/', route => route.fulfill({ contentType: 'text/html', body: '<h1>OFstats</h1>' }));
    await route.locator('a').click();
    await destination;
    await expect(page.locator('h1')).toHaveText('OFstats');
  });
}
