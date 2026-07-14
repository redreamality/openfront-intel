import { test, expect } from '@playwright/test';

test.describe('mobile header navigation', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test('menu button supports touch, Escape and outside-click dismissal', async ({ page }) => {
    await page.goto('/mechanics/basics/', { waitUntil: 'domcontentloaded' });

    const toggle = page.locator('[data-mobile-navigation-toggle]');
    const menu = page.locator('#mobile-navigation');

    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-label', 'Open navigation');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeHidden();

    await toggle.tap();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveAttribute('aria-label', 'Close navigation');
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Mechanics' })).toHaveAttribute('aria-current', 'page');

    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(menu).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(menu.getByRole('link').first()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();

    await toggle.tap();
    await expect(menu).toBeVisible();
    await page.touchscreen.tap(10, 700);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeHidden();
  });

  test('language menu is keyboard-operable and preserves the current path', async ({ page }) => {
    await page.goto('/mechanics/basics/?mode=reference#formula', { waitUntil: 'domcontentloaded' });

    const toggle = page.getByRole('button', { name: 'Choose language' });
    const menu = page.locator('#language-menu');

    await toggle.focus();
    await page.keyboard.press('ArrowDown');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link').first()).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();

    await toggle.tap();
    await menu.getByRole('link', { name: '中文' }).tap();
    await expect(page).toHaveURL(/\/zh\/mechanics\/basics\/\?mode=reference#formula$/);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('button', { name: '选择语言' })).toHaveAttribute('aria-expanded', 'false');
  });
});

test('desktop navigation remains visible and complete', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/mechanics/basics/', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('[data-mobile-navigation-toggle]')).toBeHidden();

  const nav = page.locator('[data-desktop-navigation]');
  await expect(nav).toBeVisible();
  await expect(nav.getByRole('link')).toHaveCount(7);
  await expect(nav.getByRole('link', { name: 'Mechanics' })).toHaveAttribute('aria-current', 'page');
  await expect(nav.getByRole('link', { name: 'Database' })).toHaveAttribute('href', '/database/');
});
