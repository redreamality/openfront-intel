import { expect, test } from '@playwright/test';

const cases = [
  { lang: 'en', prefix: '', defaultRule: 'Every ordinary public FFA', team: 'base threshold is 80%', share: '39.8%' },
  { lang: 'zh', prefix: '/zh', defaultRule: '普通公开 FFA 默认启用', team: '基础胜利门槛为 80%', share: '39.8%' },
  { lang: 'fr', prefix: '/fr', defaultRule: 'Chaque partie FFA publique ordinaire', team: 'seuil de base est de 80 %', share: '39,8 %' },
  { lang: 'de', prefix: '/de', defaultRule: 'Jede normale öffentliche FFA-Partie', team: 'Basisgrenze beträgt 80 %', share: '39,8 %' },
  { lang: 'nl', prefix: '/nl', defaultRule: 'Elke gewone openbare FFA-partij', team: 'basisdrempel is 80%', share: '39,8%' },
] as const;

for (const item of cases) {
  test(`overtime[${item.lang}] opens the maintained answer from home via catalog`, async ({ page }) => {
    const answer = `${item.prefix}/guides/winning-overtime/`;
    await page.goto(`${item.prefix}/`, { waitUntil: 'domcontentloaded' });
    const homeLink = page.locator('[data-home-latest-guides]')
      .locator(`a[href="${item.prefix}/guides/"]`);
    await expect(homeLink).toHaveCount(1);
    await homeLink.click();
    await expect(page).toHaveURL(new RegExp(`${item.prefix}/guides/$`));

    const catalogLink = page.locator('[data-guide-card-list]')
      .locator(`a[href="${answer}"]`);
    await expect(catalogLink).toHaveCount(1);
    await catalogLink.click();
    await expect(page).toHaveURL(new RegExp(`${answer}$`));
    await expect(page.locator('article > header h1')).toContainText('Overtime');

    const body = page.locator('article .prose');
    await expect(body).toContainText(item.defaultRule);
    await expect(body).toContainText(item.team);
    await expect(body).toContainText(item.share);
    await expect(body).not.toContainText(/59[.,]8\s*%|95\s*%/);
    await expect(page.locator('[data-freshness-summary]')).toContainText('v0.34.25');
    await expect(page.locator('[data-freshness-summary] time'))
      .toHaveAttribute('datetime', '2026-10-14');
    await expect(body.locator('a[href="https://github.com/openfrontio/OpenFrontIO/blob/v0.34.25/src/server/MapPlaylist.ts"]'))
      .toHaveCount(1);
  });
}
