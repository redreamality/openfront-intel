import { expect, test } from '@playwright/test';
import { latestOpenFrontRelease } from '../src/config/openfront-release';

const cases = [
  { prefix: '/', prompt: 'renewal prompt', reserve: 'original expiry' },
  { prefix: '/zh/', prompt: '续期提示', reserve: '原期限布防' },
  { prefix: '/fr/', prompt: 'renouvellement', reserve: 'échéance initiale' },
  { prefix: '/de/', prompt: 'Abfrage', reserve: 'ursprünglichen Ablauf' },
  { prefix: '/nl/', prompt: 'verlenging', reserve: 'oorspronkelijke afloop' },
];

for (const item of cases) {
  test(`Nation alliance renewal ${item.prefix} keeps consent and historical scope`, async ({ page }) => {
    await page.goto(item.prefix, { waitUntil: 'domcontentloaded' });
    const latest = page.locator('[data-home-latest-guide][data-guide-slug="nation-alliance-decisions"]');
    await expect(latest).toBeVisible();
    await latest.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(new RegExp(`${item.prefix}guides/nation-alliance-decisions/$`));

    const prose = page.locator('main .prose');
    await expect(prose.locator('p').first()).toContainText('v0.36.4');
    await expect(prose.locator('p').first()).toContainText(item.prompt);
    await expect(prose.locator('p').first()).toContainText(item.reserve);
    await expect(prose.locator('p').nth(1)).toContainText('2026-09-18');
    await expect(prose.locator('p').nth(1)).toContainText('v0.34.9');
    await expect(prose.locator('a[href="https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.4"]')).toBeVisible();

    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (item.prefix === '/de/') {
      const tableRegion = page.getByRole('region', { name: 'Bündnisstatus im Spiel' });
      await expect(tableRegion).toHaveAttribute('tabindex', '0');
      await tableRegion.focus();
      await expect(tableRegion).toBeFocused();
    }
    const release = prose.locator(`a[href="${item.prefix}changelog/v36/"]`);
    await expect(release).toBeVisible();
    await release.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(new RegExp(`${item.prefix}changelog/v36/$`));
    await expect(page.locator('h1')).toContainText(latestOpenFrontRelease.displayVersion);
  });
}
