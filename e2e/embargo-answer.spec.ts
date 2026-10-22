import { expect, test } from '@playwright/test';

const cases = [
  { lang: 'en', prefix: '/', heading: 'Embargo', rail: 'station' },
  { lang: 'zh', prefix: '/zh/', heading: '禁运', rail: '站' },
  { lang: 'fr', prefix: '/fr/', heading: 'embargo', rail: 'gare' },
  { lang: 'de', prefix: '/de/', heading: 'Embargo', rail: 'Bahnhof' },
  { lang: 'nl', prefix: '/nl/', heading: 'embargo', rail: 'station' },
] as const;

for (const item of cases) {
  const answer = `${item.prefix}guides/embargo-timing-and-trade-control/`;
  const alias = `${item.prefix}guides/stop-trading-with-enemies-v35/`;

  test(`embargo[${item.lang}] has one discoverable current answer`, async ({ page }) => {
    await page.goto(`${item.prefix}guides/`, { waitUntil: 'domcontentloaded' });
    const entry = page.locator(`main a[href="${answer}"]`).first();
    await expect(entry).toBeVisible();
    await expect(page.locator(`main a[href="${alias}"]`)).toHaveCount(0);
    await entry.click();
    await expect(page).toHaveURL(new RegExp(`${answer}$`));
    await expect(page.locator('article > header h1')).toContainText(item.heading);
    const prose = page.locator('article .prose').first();
    await expect(prose.locator('h2')).toHaveCount(4);
    await expect(prose).toContainText('3000');
    await expect(prose).toContainText(item.rail);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href', `https://openfront.fyi${answer}`,
    );
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(6);
  });

  test(`embargo[${item.lang}] redirects the duplicate URL`, async ({ page }) => {
    await page.goto(alias, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(new RegExp(`${answer}$`));
    await expect(page.locator('article > header h1')).toContainText(item.heading);
  });
}
