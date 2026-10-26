import { expect, test } from '@playwright/test';
import { latestOpenFrontRelease } from '../src/config/openfront-release';

for (const lang of ['en', 'zh', 'fr', 'de', 'nl']) {
  const prefix = lang === 'en' ? '' : `/${lang}`;

  test(`factory answer[${lang}] explains the route and opens the local decision guides`, async ({ page }) => {
    await page.goto(`${prefix}/database/units/`, { waitUntil: 'domcontentloaded' });
    const entry = page.locator('#u-Factory [data-factory-answer-link]');
    await expect(entry).toHaveAttribute('href', `${prefix}/guides/what-do-factories-do/`);
    await entry.click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/guides/what-do-factories-do/$`));
    const answer = page.locator('[data-factory-answer]');
    await expect(answer).toHaveCount(1);
    expect(await answer.evaluate(element => {
      const freshness = document.querySelector('[data-freshness-summary]');
      return freshness !== null && Boolean(element.compareDocumentPosition(freshness) & Node.DOCUMENT_POSITION_FOLLOWING);
    })).toBe(true);
    await expect(answer).toBeVisible();
    await expect(answer.locator('[data-factory-flow] li')).toHaveCount(3);
    for (const slug of ['how-many-factories', 'factory-upgrades', 'train-network', 'port-vs-factory']) {
      await expect(answer.locator(`a[href="${prefix}/guides/${slug}/"]`)).toBeVisible();
    }
    await answer.locator(`a[href="${prefix}/guides/how-many-factories/"]`).click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/guides/how-many-factories/$`));
    await expect(page.locator('article h1')).toBeVisible();
    await page.locator(`article .prose a[href="${prefix}/guides/what-do-factories-do/"]`).first().click();
    await expect(page.locator('[data-factory-answer]')).toBeVisible();
  });

  test(`strategy decisions[${lang}] provide four actions, stopping conditions and working links`, async ({ page }) => {
    await page.goto(`${prefix}/strategies/`, { waitUntil: 'domcontentloaded' });
    const decisions = page.locator('[data-strategy-decisions]');
    await expect(decisions).toBeVisible();
    await expect(decisions).toContainText(latestOpenFrontRelease.displayVersion);
    await expect(decisions.locator('[data-strategy-situation]')).toHaveCount(4);
    const slugs = ['first-match', 'frontload-port-factory-investment', 'ffa-runaway-leader', 'ffa-endgame-commit'];
    for (const [index, slug] of slugs.entries()) {
      if (index > 0) await page.goto(`${prefix}/strategies/`, { waitUntil: 'domcontentloaded' });
      const situation = page.locator(`[data-strategy-situation="${index}"]`);
      await expect(situation.locator('p')).toHaveCount(2);
      await expect(situation.locator('p strong')).toHaveCount(2);
      await situation.locator(`a[href="${prefix}/guides/${slug}/"]`).click();
      await expect(page).toHaveURL(new RegExp(`${prefix}/guides/${slug}/$`));
      await expect(page.locator('article h1')).toBeVisible();
    }
    await page.goto(`${prefix}/strategies/`, { waitUntil: 'domcontentloaded' });
    await page.locator(`[data-strategy-decisions] a[href="${prefix}/changelog/${latestOpenFrontRelease.series}/"]`).click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/changelog/${latestOpenFrontRelease.series}/$`));
  });

  test(`factory and strategy summaries[${lang}] remain readable on a narrow screen`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const [route, selector] of [
      ['guides/what-do-factories-do/', '[data-factory-answer]'],
      ['strategies/', '[data-strategy-decisions]'],
    ]) {
      await page.goto(`${prefix}/${route}`, { waitUntil: 'domcontentloaded' });
      const region = page.locator(selector);
      await expect(region).toBeVisible();
      const dimensions = await region.evaluate((element) => ({ width: element.clientWidth, content: element.scrollWidth }));
      expect(dimensions.content).toBeLessThanOrEqual(dimensions.width + 1);
      for (const link of await region.locator('a').all()) {
        const box = await link.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(391);
      }
    }
  });
}
