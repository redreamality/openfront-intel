import { test, expect } from '@playwright/test';

test('analytics stays disabled until the visitor opts in', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const banner = page.getByTestId('consent-banner');
  await expect(banner).toBeVisible();
  await expect(page.locator('script[data-openfront-analytics]')).toHaveCount(0);

  await banner.getByRole('button', { name: 'Essential only' }).click();
  await expect(banner).toBeHidden();
  await expect(page.locator('script[data-openfront-analytics]')).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('openfront-intel-consent-v1'))).toBe('essential');

  await page.getByTestId('manage-consent').click();
  await expect(banner).toBeVisible();

  await banner.getByRole('button', { name: 'Allow analytics' }).click();
  await expect(banner).toBeHidden();
  await expect(page.locator('script[data-openfront-analytics]')).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('openfront-intel-consent-v1'))).toBe('analytics');

  await page.getByTestId('manage-consent').click();
  await expect(banner).toBeVisible();
  await banner.getByRole('button', { name: 'Essential only' }).click();
  await expect(banner).toBeHidden();
  await expect(page.locator('script[data-openfront-analytics]')).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('openfront-intel-consent-v1'))).toBe('essential');
  await expect(page.evaluate(() => (
    window as typeof window & { 'ga-disable-G-7R6FVF17YG'?: boolean }
  )['ga-disable-G-7R6FVF17YG'])).resolves.toBe(true);
});

test('stored privacy choice persists and localized policy link is correct', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('openfront-intel-consent-v1', 'essential');
  });

  await page.goto('/zh/', { waitUntil: 'domcontentloaded' });

  const banner = page.getByTestId('consent-banner');
  await expect(banner).toBeHidden();
  await page.getByTestId('manage-consent').click();
  await expect(banner).toBeVisible();
  await expect(banner.getByRole('link', { name: '查看隐私政策' })).toHaveAttribute('href', '/zh/privacy/');
});
