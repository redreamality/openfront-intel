import { expect, test } from '@playwright/test';

for (const lang of ['en', 'zh', 'fr', 'de', 'nl']) {
  const prefix = lang === 'en' ? '' : `/${lang}`;
  test(`lobby routing[${lang}] keeps both reading links in the reader language`, async ({ page }) => {
    for (const slug of ['list-lobbies', 'public-special-lobbies']) {
      await page.goto(`${prefix}/guides/lobby-pool-routing/`, { waitUntil: 'domcontentloaded' });
      const target = `${prefix}/guides/${slug}/`;
      const link = page.locator(`article .prose a[href="${target}"]`);
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute('href', target);
      await Promise.all([
        page.waitForURL(new RegExp(`${target}$`), { waitUntil: 'domcontentloaded' }),
        link.click(),
      ]);
      await expect(page.locator('article > header h1')).toBeVisible();
      expect((await page.title()).trim().length).toBeGreaterThan(0);
      await expect(page.locator('link[rel="canonical"]'))
        .toHaveAttribute('href', `https://openfront.fyi${target}`);
      await expect(page.locator('html')).toHaveAttribute('lang', lang === 'zh' ? 'zh-CN' : lang);
    }
  });
}
