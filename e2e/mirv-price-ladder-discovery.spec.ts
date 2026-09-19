import { expect, test } from '@playwright/test';

const cases = [
  {
    lang: 'en',
    prefix: '',
    groupTitle: 'Nukes & endgame',
    cardTitle: 'OpenFront MIRV Price Ladder: When to Commit to the Late-Game Strike',
    updatedLabel: 'Updated',
    directAnswer: 'Direct answer: when do you commit to the late-game strike?',
    priceText: '25,000,000',
  },
  {
    lang: 'zh',
    prefix: '/zh',
    groupTitle: '核武与残局',
    cardTitle: 'OpenFront MIRV 价格阶梯：何时承诺终局打击',
    updatedLabel: '更新于',
    directAnswer: '直接答案：何时承诺终局打击？',
    priceText: '2500 万',
  },
  {
    lang: 'fr',
    prefix: '/fr',
    groupTitle: 'Nucléaire et fin de partie',
    cardTitle: "La grille de prix des MIRV dans OpenFront : quand engager l'attaque finale",
    updatedLabel: 'Mis à jour le',
    directAnswer: 'Réponse directe : quand engager la frappe finale ?',
    priceText: '25 million',
  },
  {
    lang: 'de',
    prefix: '/de',
    groupTitle: 'Atomwaffen und Endspiel',
    cardTitle: 'OpenFront MIRV-Preisleiter: Wann auf den Endgame-Angriff setzen',
    updatedLabel: 'Aktualisiert',
    directAnswer: 'Direkte Antwort: Wann den Endgame-Angriff setzen?',
    priceText: '25 Millionen',
  },
  {
    lang: 'nl',
    prefix: '/nl',
    groupTitle: 'Kernwapens en eindspel',
    cardTitle: 'De MIRV-prijssladder in OpenFront: wanneer je inzet op de late-game slag',
    updatedLabel: 'Bijgewerkt',
    directAnswer: 'Direct antwoord: wanneer zet je de late-game slag?',
    priceText: '25 miljoen',
  },
] as const;

for (const contentCase of cases) {
  test(`mirv-price-ladder discovery[${contentCase.lang}] surfaces the endgame price-ladder guide`, async ({ page }) => {
    const targetPath = `${contentCase.prefix}/guides/mirv-price-ladder/`;

    await page.goto(`${contentCase.prefix}/guides/`, { waitUntil: 'domcontentloaded' });

    const group = page.locator('li[data-guide-group="endgame"] h3');
    await expect(group).toHaveCount(1);
    await expect(group).toContainText(contentCase.groupTitle);

    const card = page.locator('li[data-guide-card][data-guide-group="endgame"]').filter({ has: page.locator('h2', { hasText: contentCase.cardTitle }) });
    await expect(card).toHaveCount(1);
    await expect(card.locator('.font-mono')).toContainText(contentCase.updatedLabel);
    await expect(card.locator('.font-mono')).toContainText('2026');

    await page.goto(targetPath, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 2, name: contentCase.directAnswer })).toBeVisible();
    await expect(page.locator('main')).toContainText(contentCase.priceText);
  });
}
