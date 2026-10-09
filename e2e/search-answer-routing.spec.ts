import { expect, test } from '@playwright/test';

const cases = [
  { lang: 'en', prefix: '', beginner: /How to Play.*Beginner Tutorial/, cost: /MIRV Cost.*Rising Prices/, maps: /Largest.*Maps.*Compact/, alternatives: /Alternatives.*Other Android Games/, community: /Reddit.*Discord.*Help/ },
  { lang: 'fr', prefix: '/fr', beginner: /Comment jouer.*tuto débutant/, cost: /MIRV.*coût.*prix progressif/, maps: /Plus grandes cartes.*Compact/, alternatives: /Alternatives.*autres jeux Android/, community: /Reddit.*Discord.*aide mobile/ },
  { lang: 'de', prefix: '/de', beginner: /spielen lernen.*Anfänger-Tutorial/, cost: /MIRV-Kosten.*steigende Preise/, maps: /Größte.*Karten.*Compact/, alternatives: /Alternativen.*andere Android-Spiele/, community: /Reddit.*Discord.*mobile Hilfe/ },
  { lang: 'nl', prefix: '/nl', beginner: /leren spelen.*beginnerstutorial/, cost: /MIRV-kosten.*stijgende prijzen/, maps: /Grootste.*kaarten.*Compact/, alternatives: /alternatieven.*andere Android-games/, community: /Reddit.*Discord.*mobiele hulp/ },
  { lang: 'zh', prefix: '/zh', beginner: /怎么玩.*新手教程/, cost: /MIRV 成本.*涨价规则/, maps: /最大地图.*Compact/, alternatives: /替代游戏.*其他 Android 游戏/, community: /Reddit.*Discord.*求助/ },
] as const;

for (const item of cases) {
  test(`search paths[${item.lang}] take a beginner and mobile player directly to the answer`, async ({ page }) => {
    await page.goto(`${item.prefix}/guides/`, { waitUntil: 'domcontentloaded' });
    const paths = page.locator('[data-search-answer-paths="guide"]');
    await expect(paths).toBeVisible();
    const firstMatch = paths.locator(`a[href="${item.prefix}/guides/first-match/"]`);
    await expect(firstMatch).toHaveCount(1);
    await firstMatch.click();
    await expect(page).toHaveURL(new RegExp(`${item.prefix}/guides/first-match/$`));
    await expect(page).toHaveTitle(item.beginner);
    await expect(page.locator('article .prose a[href="https://openfront.io/"]').first()).toBeVisible();

    await page.goto(`${item.prefix}/guides/`, { waitUntil: 'domcontentloaded' });
    await page.locator('[data-search-answer-paths="guide"]')
      .locator(`a[href="${item.prefix}/guides/mobile-app-download/"]`).click();
    await expect(page).toHaveURL(new RegExp(`${item.prefix}/guides/mobile-app-download/$`));
    await expect(page.locator('article .prose a[href="https://openfront.io/"]').first()).toBeVisible();
  });

  test(`search paths[${item.lang}] preserve cost, map and mobile intent in rendered titles`, async ({ page }) => {
    for (const [slug, title] of [
      ['mirv', item.cost], ['map-size-compact-mode', item.maps],
      ['mobile-alternatives', item.alternatives], ['mobile-reddit-community', item.community],
    ] as const) {
      await page.goto(`${item.prefix}/guides/${slug}/`, { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveTitle(title);
      expect([...(await page.title())].length).toBeLessThanOrEqual(item.lang === 'zh' ? 40 : 68);
      if (slug.startsWith('mobile-')) {
        const route = page.locator('[data-article-answer-route="mobile"]');
        await expect(route).toBeVisible();
        await route.locator(`a[href="${item.prefix}/guides/mobile-app-download/"]`).click();
        await expect(page).toHaveURL(new RegExp(`${item.prefix}/guides/mobile-app-download/$`));
      }
    }
  });

  test(`search paths[${item.lang}] connect map comparison and MIRV pricing from the databases`, async ({ page }) => {
    await page.goto(`${item.prefix}/database/maps/`, { waitUntil: 'domcontentloaded' });
    const maps = page.locator('[data-search-answer-paths="maps"]');
    await expect(maps).toBeVisible();
    await expect(maps.locator('a')).toHaveCount(2);
    await maps.locator('a').first().click();
    await expect(page).toHaveURL(new RegExp(`${item.prefix}/guides/map-size-compact-mode/$`));
    await expect(page).toHaveTitle(item.maps);

    await page.goto(`${item.prefix}/database/units/`, { waitUntil: 'domcontentloaded' });
    const price = page.locator('#u-MIRV [data-mirv-cost-answer]');
    await expect(price).toBeVisible();
    await price.click();
    await expect(page).toHaveURL(new RegExp(`${item.prefix}/guides/mirv-price-ladder/$`));
    const firstPrice = { en: '25M', zh: '2500 万', fr: '25 millions', de: '25 Millionen', nl: '25 miljoen' };
    await expect(page.locator('article .prose')).toContainText(firstPrice[item.lang]);
  });

  test(`search paths[${item.lang}] offer strategy actions and contextual deeper reading`, async ({ page }) => {
    await page.goto(`${item.prefix}/strategies/`, { waitUntil: 'domcontentloaded' });
    const paths = page.locator('[data-search-answer-paths="strategy"]');
    await expect(paths.locator('a')).toHaveCount(4);
    for (const path of ['strategies/ffa-opening/', 'strategies/economy-fundamentals/', 'guides/land-combat/', 'guides/winning-overtime/']) {
      await expect(paths.locator(`a[href="${item.prefix}/${path}"]`)).toBeVisible();
    }
    for (const [source, target, topic] of [
      ['guides/first-match/', 'guides/threat-assessment/', 'threat'],
      ['strategies/economy-fundamentals/', 'guides/tall-vs-wide/', 'wide'],
      ['guides/land-combat/', 'guides/annexation-enclosure/', 'enclosure'],
      ['strategies/team-roles/', 'guides/four-islands-team-coordination/', 'islands'],
      ['strategies/team-naval-control/', 'guides/island-defense/', 'coast'],
    ] as const) {
      await page.goto(`${item.prefix}/${source}`, { waitUntil: 'domcontentloaded' });
      const link = page.locator(`[data-article-answer-route="${topic}"] a`);
      await expect(link).toHaveAttribute('href', `${item.prefix}/${target}`);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`${item.prefix}/${target}$`));
      await expect(page.locator('article h1')).toBeVisible();
    }
  });
}
