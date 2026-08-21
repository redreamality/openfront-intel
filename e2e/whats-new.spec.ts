import { expect, test } from '@playwright/test';

const cases = [
  { path: '/whats-new/', nav: "What's New", title: "What's New", live: 'Released articles', upcoming: 'Coming in a future release', read: 'Read the version article' },
  { path: '/fr/whats-new/', nav: 'Nouveautés', title: 'Nouveautés', live: 'Versions publiées', upcoming: 'À venir dans une prochaine release', read: "Lire l'article de version" },
  { path: '/nl/whats-new/', nav: 'Wat is er nieuw', title: 'Wat is er nieuw', live: 'Uitgebrachte artikelen', upcoming: 'Komt in een volgende release', read: 'Lees het versieartikel' },
  { path: '/de/whats-new/', nav: 'Neuigkeiten', title: 'Neuigkeiten', live: 'Veröffentlichte Artikel', upcoming: 'Kommt mit einer künftigen Release', read: 'Versionsartikel lesen' },
  { path: '/zh/whats-new/', nav: '最新动态', title: '最新动态', live: '已发布文章', upcoming: '即将发布', read: '阅读版本文章' },
];

for (const item of cases) {
  test(`${item.path} exposes version articles without internal sources`, async ({ page }) => {
    await page.goto(item.path, { waitUntil: 'domcontentloaded' });

    await expect(page.locator('[data-whats-new-page]')).toBeVisible();
    await expect(page).toHaveTitle(new RegExp(item.title));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('[data-whats-new-group="released"] h2')).toHaveText(item.live);
    await expect(page.locator('[data-whats-new-group="not-released"] h2')).toHaveText(item.upcoming);
    await expect(page.locator('[data-whats-new-status="not-released"]')).toHaveCount(1);
    await expect(page.locator('[data-whats-new-status="released"]').first()).toBeVisible();
    await expect(page.locator('a[href*="/issues/"], a[href*="/pull/"]')).toHaveCount(0);

    const v34 = page.locator('[data-whats-new-article="v34"]');
    await expect(v34).toBeVisible();
    await expect(v34.getByRole('link', { name: item.read })).toHaveAttribute('href', /changelog\/v34\/$/);

    const nav = page.locator('header nav[aria-label]');
    await expect(nav).toHaveCount(1);
    await expect(nav.getByRole('link', { name: item.nav, exact: true })).toHaveAttribute('href', /whats-new\/$/);
    await expect(page.getByRole('link', { name: /Full version history|Historique complet|Volledige versiegeschiedenis|Vollständige Versionshistorie|完整版本历史/ })).toHaveAttribute('href', /changelog\/$/);
  });
}

test("v34 keeps its article URL and marks the preview as not released", async ({ page }) => {
  await page.goto('/zh/changelog/v34/', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/\/zh\/changelog\/v34\/$/);
  await expect(page.getByText('尚未发布', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('v34');
  await expect(page.locator('a[href*="/issues/"], a[href*="/pull/"]')).toHaveCount(0);
});

test("homepage promotes the upcoming v34 article without treating it as a live release", async ({ page }) => {
  await page.goto('/zh/', { waitUntil: 'domcontentloaded' });
  const strip = page.locator('[data-home-whats-new]');
  await expect(strip).toBeVisible();
  await expect(strip.locator('li')).toHaveCount(3);
  await expect(strip.getByRole('link', { name: '查看全部最新动态' })).toHaveAttribute('href', '/zh/whats-new/');
  await expect(strip.getByRole('link', { name: /v34/ })).toHaveAttribute('href', /\/zh\/changelog\/v34\/$/);
});

test.describe("mobile What's New navigation", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test('remains a single collapsible nav', async ({ page }) => {
    await page.goto('/whats-new/', { waitUntil: 'domcontentloaded' });

    const toggle = page.locator('[data-mobile-navigation-toggle]');
    const menu = page.locator('#mobile-navigation');
    await expect(toggle).toBeVisible();
    await toggle.tap();
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link', { name: "What's New", exact: true })).toHaveAttribute('aria-current', 'page');
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
  });
});
