import { test, expect } from '@playwright/test';

const languages = [
  { code: 'en', prefix: '/', title: 'Your first five actions', mouse: 'Mouse', touch: 'Phone or tablet' },
  { code: 'zh', prefix: '/zh/', title: '第一局先做这五步', mouse: '鼠标操作', touch: '手机或平板' },
  { code: 'fr', prefix: '/fr/', title: 'Vos cinq premières actions', mouse: 'À la souris', touch: 'Téléphone ou tablette' },
  { code: 'de', prefix: '/de/', title: 'Deine ersten fünf Aktionen', mouse: 'Mit der Maus', touch: 'Handy oder Tablet' },
  { code: 'nl', prefix: '/nl/', title: 'Je eerste vijf handelingen', mouse: 'Met de muis', touch: 'Telefoon of tablet' },
];

for (const item of languages) {
  for (const width of [1280, 390]) {
    test(`first-match recovery ${item.code} at ${width}px follows the practice path`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${item.prefix}guides/`, { waitUntil: 'domcontentloaded' });
      const entry = page.locator('[data-first-match-primary]');
      await expect(entry).toBeVisible();
      await expect(entry).toHaveAttribute('href', `${item.prefix}guides/first-match/#first-actions`);
      await entry.click();
      await expect(page).toHaveURL(new RegExp(`${item.prefix}guides/first-match/#first-actions$`));
      const quickStart = page.locator('[data-first-match-quick-start]');
      await expect(quickStart).toHaveCount(1);
      expect(await quickStart.evaluate(element => {
        const freshness = document.querySelector('[data-freshness-summary]');
        return freshness !== null && Boolean(element.compareDocumentPosition(freshness) & Node.DOCUMENT_POSITION_FOLLOWING);
      })).toBe(true);
      await expect(quickStart).toContainText(item.title);
      await expect(quickStart.locator('[data-first-actions] > li')).toHaveCount(5);
      await expect(quickStart.locator('[data-practice-launch]')).toHaveAttribute('href', 'https://openfront.io/');
      await expect(quickStart.locator('[data-first-desktop]')).toContainText(item.mouse);
      await expect(quickStart.locator('[data-first-touch]')).toContainText(item.touch);
      await expect(quickStart.locator('[data-first-loop]')).toHaveCount(1);
      await expect(quickStart).toContainText(/20\s?%/);
      await expect(quickStart).toContainText('Overtime');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const touchLink = quickStart.locator('[data-first-touch] a');
      await expect(touchLink).toHaveAttribute('href', `${item.prefix}guides/mobile-controls/`);
      await touchLink.click();
      await expect(page).toHaveURL(new RegExp(`${item.prefix}guides/mobile-controls/$`));
      await expect(page.locator('article > header h1')).toBeVisible();
    });
  }
}

test('first-match keeps existing deep links after grouping short steps', async ({ page }) => {
  await page.goto('/guides/first-match/#step-3-tune-the-attack-ratio', { waitUntil: 'domcontentloaded' });
  const target = page.locator('#step-3-tune-the-attack-ratio');
  await expect(target).toHaveCount(1);
  await expect(target).toContainText('Tune the Attack Ratio');
  await expect(page.locator('main .prose h2')).toHaveCount(15);
});
