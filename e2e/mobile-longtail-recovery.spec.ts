import { expect, test } from '@playwright/test';

const locales = ['en', 'zh', 'fr', 'de', 'nl'] as const;
for (const lang of locales) {
  const prefix = lang === 'en' ? '' : `/${lang}`;
  test(`mobile recovery ${lang}: platform choice and touch instructions`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${prefix}/guides/mobile-app-download/`, { waitUntil: 'domcontentloaded' });
    const panel = page.locator('[data-mobile-platform-routes]');
    await expect(panel).toBeVisible();
    await expect(panel.locator('[data-platform]')).toHaveCount(3);
    await expect(panel.locator('[data-official-mobile-play]')).toHaveAttribute('href', 'https://openfront.io/');
    await expect(panel.locator('[data-platform="ios"]')).toContainText('Safari');
    await expect(panel.locator('[data-platform="desktop"] a')).toHaveAttribute('href', 'https://store.steampowered.com/app/3560670/OpenFront/');
    await panel.locator(`a[href="${prefix}/guides/mobile-controls/"]`).click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/guides/mobile-controls/$`));
    await expect(page.locator('article > header h1')).toBeVisible();
  });

  test(`replay recovery ${lang}: playback and review form a complete path`, async ({ page }) => {
    await page.goto(`${prefix}/guides/seekable-replay-viewer/`, { waitUntil: 'domcontentloaded' });
    const playback = page.locator('[data-longtail-answer="playback"]');
    await expect(playback).toContainText('New Replay Viewer');
    await playback.locator(`a[href="${prefix}/guides/replay-review/"]`).click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/guides/replay-review/$`));
    await page.locator(`[data-longtail-answer="review"] a[href="${prefix}/guides/seekable-replay-viewer/"]`).click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/guides/seekable-replay-viewer/$`));
  });

  test(`long tail recovery ${lang}: map comparison and MIRV decisions have direct routes`, async ({ page }) => {
    await page.goto(`${prefix}/guides/map-size-compact-mode/`, { waitUntil: 'domcontentloaded' });
    const maps = page.locator('[data-longtail-answer="maps"]');
    await expect(maps).toContainText('Compact');
    await maps.locator(`a[href="${prefix}/database/maps/"]`).click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/database/maps/$`));
    await expect(page.locator('h1')).toBeVisible();

    await page.goto(`${prefix}/guides/mirv/`, { waitUntil: 'domcontentloaded' });
    const mirv = page.locator('[data-longtail-answer="mirv"]');
    await expect(mirv).toContainText('SAM');
    await mirv.locator(`a[href="${prefix}/guides/mirv-price-ladder/"]`).click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/guides/mirv-price-ladder/$`));
    await page.goto(`${prefix}/guides/mirv/`, { waitUntil: 'domcontentloaded' });
    await page.locator(`[data-longtail-answer="mirv"] a[href="${prefix}/guides/crown-position-mirv-defense/"]`).click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/guides/crown-position-mirv-defense/$`));
    await expect(page.locator('article > header h1')).toBeVisible();
  });
}
