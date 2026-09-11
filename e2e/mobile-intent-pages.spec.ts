import { expect, test } from '@playwright/test';
import { latestOpenFrontRelease } from '../src/config/openfront-release';

const localeCases = [
  { lang: 'en', prefix: '', seoTitle: 'OpenFront Mobile App, Download & APK: Official Browser Guide' },
  { lang: 'fr', prefix: '/fr', seoTitle: 'OpenFront mobile : application, téléchargement et APK' },
  { lang: 'de', prefix: '/de', seoTitle: 'OpenFront Mobile-App, Download & APK: offizielles Browserspiel' },
  { lang: 'nl', prefix: '/nl', seoTitle: 'OpenFront mobiele app, download en APK: officiële browsergame' },
  { lang: 'zh', prefix: '/zh', seoTitle: 'OpenFront 手机版 App、下载与 APK：官方浏览器入口' },
] as const;

const mobileSlugs = [
  'mobile-app-download',
  'mobile-controls',
  'mobile-alternatives',
  'mobile-reddit-community',
] as const;

for (const localeCase of localeCases) {
  test(`mobile answers[${localeCase.lang}] have one routed entry per intent`, async ({ page }) => {
    const guidesPath = `${localeCase.prefix}/guides/`;
    await page.goto(guidesPath, { waitUntil: 'domcontentloaded' });

    const route = page.locator('[data-mobile-controls-route]');
    const links = route.locator('[data-mobile-answer-link]');
    await expect(route).toBeVisible();
    await expect(links).toHaveCount(mobileSlugs.length);

    for (const [index, slug] of mobileSlugs.entries()) {
      await expect(links.nth(index)).toHaveAttribute(
        'href',
        `${localeCase.prefix}/guides/${slug}/`,
      );
    }

    await links.first().click();
    expect(new URL(page.url()).pathname).toBe(
      `${localeCase.prefix}/guides/mobile-app-download/`,
    );
    await expect(page).toHaveTitle(localeCase.seoTitle);
    const appMain = page.locator('main');
    await expect(appMain).toContainText(latestOpenFrontRelease.tag);
    await expect(appMain).toContainText('APK');
    await expect(appMain.locator('a[href="https://openfront.io/"]')).toHaveCount(2);
    await expect(
      appMain.locator(`a[href="${latestOpenFrontRelease.releaseUrl}"]`),
    ).toHaveCount(2);

    await page.goto(`${localeCase.prefix}/guides/mobile-alternatives/`, {
      waitUntil: 'domcontentloaded',
    });
    const alternativesMain = page.locator('main');
    await expect(alternativesMain).toContainText('Territorial.io');
    await expect(alternativesMain).toContainText('War.app');
    await expect(
      alternativesMain.locator('a[href="https://play.google.com/store/apps/details?id=territorial.io"]'),
    ).toHaveCount(2);
    await expect(
      alternativesMain.locator('a[href="https://play.google.com/store/apps/details?id=com.warlight"]'),
    ).toHaveCount(2);

    await page.goto(`${localeCase.prefix}/guides/mobile-reddit-community/`, {
      waitUntil: 'domcontentloaded',
    });
    const communityMain = page.locator('main');
    await expect(communityMain).toContainText('r/OpenFront');
    await expect(communityMain).toContainText('discord.gg/openfront');
    await expect(
      communityMain.locator('a[href="https://www.reddit.com/r/OpenFront/"]'),
    ).toHaveCount(2);
    await expect(
      communityMain.locator('a[href="https://discord.gg/openfront"]'),
    ).toHaveCount(2);
  });
}
