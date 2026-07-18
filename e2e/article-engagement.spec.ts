import { expect, test } from '@playwright/test';

for (const path of ['/guides/first-match/', '/mechanics/basics/', '/database/units/']) {
  test(`${path} exposes reading progress`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    const progress = page.locator('[data-reading-progress]');
    await expect(progress).toHaveCount(1);

    await page.evaluate(() => window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'instant',
    }));
    await expect.poll(async () => Number(await progress.getAttribute('data-progress'))).toBeGreaterThanOrEqual(95);
  });
}

test('collection hubs do not show article progress', async ({ page }) => {
  await page.goto('/guides/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('[data-reading-progress]')).toHaveCount(0);
});

test('mobile article table of contents opens, links, and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/guides/first-match/', { waitUntil: 'domcontentloaded' });

  const toc = page.locator('[data-article-toc]');
  const toggle = toc.locator('[data-toc-toggle]');
  const nav = toc.locator('[data-toc-nav]');
  await expect(toc).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(nav).toBeHidden();

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(nav).toBeVisible();
  await expect(toc.locator('[data-toc-link]').first()).toHaveAttribute('aria-current', 'location');

  await toggle.click();
  await toggle.click();
  await page.keyboard.press('Escape');
  await expect(nav).toBeHidden();
  await expect(toggle).toBeFocused();

  await toggle.click();
  const firstLink = toc.locator('[data-toc-link]').first();
  const hash = await firstLink.getAttribute('href');
  await firstLink.click();
  await expect(page).toHaveURL(new RegExp(`${hash?.replace('#', '#')}$`));
  await expect(nav).toBeHidden();
});

test('desktop article table of contents remains available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  await page.goto('/guides/first-match/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('[data-toc-nav]')).toBeVisible();
  await expect(page.locator('[data-toc-link]').first()).toBeVisible();
  await context.close();
});

test('article table of contents honors a direct heading link', async ({ page }) => {
  await page.goto('/guides/first-match/', { waitUntil: 'domcontentloaded' });
  const target = page.locator('[data-toc-link]').nth(5);
  const hash = await target.getAttribute('href');
  expect(hash).toMatch(/^#/);

  await page.goto(`/guides/first-match/${hash}`, { waitUntil: 'domcontentloaded' });
  await expect(page.locator(`[data-toc-link][href="${hash}"]`)).toHaveAttribute('aria-current', 'location');
});

test('articles provide one prominent continue-reading path', async ({ page }) => {
  await page.goto('/zh/strategies/ffa-opening/', { waitUntil: 'domcontentloaded' });
  const next = page.locator('[data-continue-reading]');
  await expect(next).toHaveCount(1);
  await expect(next).toContainText('继续阅读');
  await expect(next).toHaveAttribute('href', /\/zh\/strategies\/.+\/$/);
});
