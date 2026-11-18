import { expect, test } from '@playwright/test';
import { latestOpenFrontRelease } from '../src/config/openfront-release';

const cases = [
  { prefix: '/', warning: 'solid red', guest: 'Guests can play shared saves', renewal: 'renewal prompt' },
  { prefix: '/zh/', warning: '实心红色', guest: '访客可以游玩别人分享的存档', renewal: '续期提示' },
  { prefix: '/fr/', warning: 'rouge fixe', guest: 'visiteurs peuvent jouer aux sauvegardes partagées', renewal: 'renouvellement' },
  { prefix: '/de/', warning: 'durchgehendes Rot', guest: 'Gäste können geteilte Spielstände spielen', renewal: 'Erneuerungsaufforderung' },
  { prefix: '/nl/', warning: 'egaal rood', guest: 'Gasten mogen gedeelde saves spelen', renewal: 'alliantieprompt' },
];

for (const item of cases) {
  test(`v36 release flow ${item.prefix} preserves current and historical scope`, async ({ page }) => {
    await page.goto(item.prefix, { waitUntil: 'domcontentloaded' });
    const link = page.locator('[data-home-priority-link][data-priority-id="latest"]');
    await expect(link).toContainText('FFA Rating');
    await expect(link).toContainText('Atlas');
    await expect(link).toContainText(latestOpenFrontRelease.displayVersion);
    await link.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(`${test.info().project.use.baseURL}${item.prefix}changelog/v36/`);
    const main = page.locator('main');
    await expect(page).toHaveTitle(/v36\.4/);
    await expect(main.locator('h1')).toContainText(latestOpenFrontRelease.displayVersion);
    await expect(main.locator('.prose p').first()).toContainText(latestOpenFrontRelease.displayVersion);
    await expect(main.locator('.prose p').first()).toContainText('500');
    await expect(main).toContainText(item.warning);
    await expect(main).toContainText(item.guest);
    await expect(main).toContainText(item.renewal);
    await expect(main).toContainText('Cycle Build Multiplier on Hotkey');
    await expect(main.locator('.prose a[href="' + item.prefix + 'shortcuts/"]').first()).toBeVisible();
    for (const text of ['Saved games', 'Continue', 'OFstats', 'World 4000', 'World 10000', '210', 'Plutonium', 'Activity', 'boat', 'ship']) {
      await expect(main).toContainText(text);
    }
    await expect(main.locator('[data-provenance-panel] a[href="' + latestOpenFrontRelease.releaseUrl + '"]')).toBeVisible();
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

    await page.goto(`${item.prefix}changelog/v35/`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toContainText('v35.10');
    await expect(page.locator('[data-provenance-panel] a[href="https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.10"]')).toBeVisible();

    await page.goto(`${item.prefix}guides/create-private-custom-game/`, { waitUntil: 'domcontentloaded' });
    const guide = page.locator('main .prose');
    await expect(guide.locator('p').first()).toContainText('500');
    await expect(guide.locator('p').first()).toContainText('210');
    await expect(guide.locator('a[href="https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.3"]')).toBeVisible();
    await expect(guide.locator('a[href="' + item.prefix + 'changelog/v36/"]')).toBeVisible();
    await expect(guide).toContainText('2026');
  });
}
