import { expect, test } from '@playwright/test';

const cases = [
  {
    lang: 'en',
    prefix: '',
    indexIntent: 'Looking for Water Nukes?',
    hotkeysIntent: 'Water Nukes is a lobby terrain rule, not a keyboard control.',
    directAnswer: 'Direct answer: what are Water Nukes in OpenFront?',
    updatedLabel: 'Updated',
  },
  {
    lang: 'zh',
    prefix: '/zh',
    indexIntent: '在找 Water Nukes（水核弹）？',
    hotkeysIntent: 'Water Nukes 是改变地形的房间规则，不是键盘操作。',
    directAnswer: '直接答案：水核到底做什么',
    updatedLabel: '更新于',
  },
  {
    lang: 'fr',
    prefix: '/fr',
    indexIntent: 'Vous cherchez Water Nukes ?',
    hotkeysIntent: 'Water Nukes est une règle de terrain du lobby, pas une commande clavier.',
    directAnswer: 'Réponse directe',
    updatedLabel: 'Mis à jour le',
  },
  {
    lang: 'de',
    prefix: '/de',
    indexIntent: 'Suchst du nach Water Nukes?',
    hotkeysIntent: 'Water Nukes ist eine Lobby-Geländeregel und keine Tastatursteuerung.',
    directAnswer: 'Direkte Antwort: Was Water Nukes bewirken',
    updatedLabel: 'Aktualisiert',
  },
  {
    lang: 'nl',
    prefix: '/nl',
    indexIntent: 'Zoek je Water Nukes?',
    hotkeysIntent: 'Water Nukes is een lobbyregel voor terrein, geen toetsenbordcommando.',
    directAnswer: 'Direct antwoord: wat Water Nukes doen',
    updatedLabel: 'Bijgewerkt',
  },
] as const;

for (const contentCase of cases) {
  test(`water-nukes discovery[${contentCase.lang}] routes wrong landings to the current answer`, async ({ page }) => {
    const targetPath = `${contentCase.prefix}/guides/water-nukes/`;

    await page.goto(`${contentCase.prefix}/guides/`, { waitUntil: 'domcontentloaded' });

    const intentRoute = page.locator('[data-water-nukes-route]');
    await expect(intentRoute).toContainText(contentCase.indexIntent);
    await expect(intentRoute.locator(`a[href="${targetPath}"]`)).toHaveCount(1);

    const guideCards = page.locator('main section.py-10 > ul > li > a');
    const firstTwoHrefs = await guideCards.evaluateAll((links) =>
      links.slice(0, 2).map((link) => link.getAttribute('href')),
    );
    expect(firstTwoHrefs).toContain(targetPath);

    const waterNukesCard = guideCards.filter({ has: page.locator(`h2`, { hasText: 'Water Nukes' }) });
    await expect(waterNukesCard).toHaveCount(1);
    await expect(waterNukesCard.locator('.font-mono')).toContainText(contentCase.updatedLabel);
    await expect(waterNukesCard.locator('.font-mono')).toContainText('2026');

    await page.goto(`${contentCase.prefix}/guides/hotkeys/`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('article .prose')).toContainText(contentCase.hotkeysIntent);
    await expect(page.locator(`article .prose a[href="${targetPath}"]`)).toHaveCount(1);

    await page.goto(targetPath, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 2, name: contentCase.directAnswer })).toBeVisible();
    await expect(page.locator('main')).toContainText('v33.4');
  });
}
