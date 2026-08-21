import { expect, test } from '@playwright/test';
import { latestOpenFrontRelease } from '../src/config/openfront-release';

const homepageCases = [
  {
    lang: 'en',
    path: '/',
    prefix: '/',
    latestSignal: 'Versioned replay shells',
  },
  {
    lang: 'zh',
    path: '/zh/',
    prefix: '/zh/',
    latestSignal: '版本化 replay shell',
  },
  {
    lang: 'fr',
    path: '/fr/',
    prefix: '/fr/',
    latestSignal: 'shells de replay versionnés',
  },
  {
    lang: 'de',
    path: '/de/',
    prefix: '/de/',
    latestSignal: 'Versions-Replay-Shells',
  },
  {
    lang: 'nl',
    path: '/nl/',
    prefix: '/nl/',
    latestSignal: 'Versie-replay-shells',
  },
] as const;

for (const homepageCase of homepageCases) {
  test(`homepage[${homepageCase.lang}] prioritizes current player decisions before raw numbers`, async ({ page }) => {
    await page.goto(homepageCase.path, { waitUntil: 'domcontentloaded' });

    const main = page.locator('main');
    await expect(main.getByRole('heading', { level: 1 })).toBeVisible();

    const hero = main.locator(':scope > section').first();
    const latestHref = `${homepageCase.prefix}changelog/${latestOpenFrontRelease.series}/`;
    const firstMatchHref = `${homepageCase.prefix}guides/first-match/`;
    const heroLatestLink = hero.locator(`a[href="${latestHref}"]`);
    await expect(heroLatestLink).toHaveCount(1);
    await expect(heroLatestLink).toContainText(latestOpenFrontRelease.series);
    await expect(hero.locator(`a[href="${firstMatchHref}"]`)).toHaveCount(1);

    const priority = main.locator('[data-home-priority]');
    await expect(priority).toBeVisible();
    await expect(priority.getByRole('heading', { level: 2 })).toBeVisible();

    const links = priority.locator('[data-home-priority-link]');
    await expect(links).toHaveCount(4);
    expect(await links.evaluateAll((elements) => elements.map((element) => element.getAttribute('data-priority-id')))).toEqual([
      'latest',
      'first-match',
      'shortcuts',
      'economy',
    ]);

    const expectedHrefs = [
      `${homepageCase.prefix}changelog/${latestOpenFrontRelease.series}/`,
      `${homepageCase.prefix}guides/first-match/`,
      `${homepageCase.prefix}shortcuts/`,
      `${homepageCase.prefix}mechanics/economy/`,
    ];
    for (let index = 0; index < expectedHrefs.length; index += 1) {
      await expect(links.nth(index)).toHaveAttribute('href', expectedHrefs[index]);
    }
    await expect(links.first()).toContainText(latestOpenFrontRelease.displayVersion);
    await expect(links.first()).toContainText(homepageCase.latestSignal);

    const contentOrder = await main.evaluate((element) =>
      [...element.querySelectorAll('[data-home-priority], [data-home-browse], [data-home-reference]')].map((section) => {
        if (section.hasAttribute('data-home-priority')) return 'priority';
        if (section.hasAttribute('data-home-browse')) return 'browse';
        return 'reference';
      }),
    );
    expect(contentOrder).toEqual(['priority', 'browse', 'reference']);
    await expect(main.locator('[data-home-reference]')).toBeVisible();

    await links.first().click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(new RegExp(`${homepageCase.prefix}changelog/${latestOpenFrontRelease.series}/$`));
  });
}
