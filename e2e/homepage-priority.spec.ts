import { expect, test } from '@playwright/test';

const homepageCases = [
  {
    lang: 'en',
    path: '/',
    prefix: '/',
    hero: 'Current-Version Answers',
    latestCta: 'See v33 Changes',
    firstMatchCta: 'Play Your First Match',
    priorityTitle: 'What do you need this match?',
    cardTexts: ['Latest version', 'First match', 'Controls', 'Economy growth'],
    referenceTitle: 'Reference Numbers',
  },
  {
    lang: 'zh',
    path: '/zh/',
    prefix: '/zh/',
    hero: '当前版本实战答案',
    latestCta: '查看 v33 变化',
    firstMatchCta: '打好第一局',
    priorityTitle: '你现在最需要解决什么？',
    cardTexts: ['最新版本', '第一局', '操作', '经济增长'],
    referenceTitle: '数值参考',
  },
  {
    lang: 'fr',
    path: '/fr/',
    prefix: '/fr/',
    hero: 'Réponses pour la version actuelle',
    latestCta: 'Voir les changements v33',
    firstMatchCta: 'Réussir sa première partie',
    priorityTitle: 'De quoi avez-vous besoin pour cette partie ?',
    cardTexts: ['Dernière version', 'Première partie', 'Commandes', 'Croissance économique'],
    referenceTitle: 'Chiffres de référence',
  },
  {
    lang: 'de',
    path: '/de/',
    prefix: '/de/',
    hero: 'Antworten für die aktuelle Version',
    latestCta: 'v33-Änderungen ansehen',
    firstMatchCta: 'Erstes Match spielen',
    priorityTitle: 'Was brauchst du in diesem Match?',
    cardTexts: ['Neueste Version', 'Erstes Match', 'Steuerung', 'Wirtschaftswachstum'],
    referenceTitle: 'Referenzwerte',
  },
  {
    lang: 'nl',
    path: '/nl/',
    prefix: '/nl/',
    hero: 'Antwoorden voor de huidige versie',
    latestCta: 'Bekijk de v33-wijzigingen',
    firstMatchCta: 'Speel je eerste partij',
    priorityTitle: 'Wat heb je in deze partij nodig?',
    cardTexts: ['Nieuwste versie', 'Eerste partij', 'Besturing', 'Economische groei'],
    referenceTitle: 'Referentiewaarden',
  },
] as const;

for (const homepageCase of homepageCases) {
  test(`homepage[${homepageCase.lang}] prioritizes current player decisions before raw numbers`, async ({ page }) => {
    await page.goto(homepageCase.path, { waitUntil: 'domcontentloaded' });

    const main = page.locator('main');
    await expect(main.getByRole('heading', { level: 1 })).toContainText(homepageCase.hero);

    const hero = main.locator(':scope > section').first();
    await expect(hero.getByRole('link', { name: homepageCase.latestCta })).toHaveAttribute(
      'href',
      `${homepageCase.prefix}changelog/v33/`,
    );
    await expect(hero.getByRole('link', { name: homepageCase.firstMatchCta })).toHaveAttribute(
      'href',
      `${homepageCase.prefix}guides/first-match/`,
    );

    const priority = main.locator('[data-home-priority]');
    await expect(priority).toBeVisible();
    await expect(priority.getByRole('heading', { level: 2 })).toHaveText(homepageCase.priorityTitle);

    const links = priority.locator('[data-home-priority-link]');
    await expect(links).toHaveCount(4);
    expect(await links.evaluateAll((elements) => elements.map((element) => element.getAttribute('data-priority-id')))).toEqual([
      'latest',
      'first-match',
      'shortcuts',
      'economy',
    ]);

    const expectedHrefs = [
      `${homepageCase.prefix}changelog/v33/`,
      `${homepageCase.prefix}guides/first-match/`,
      `${homepageCase.prefix}shortcuts/`,
      `${homepageCase.prefix}mechanics/economy/`,
    ];
    for (let index = 0; index < expectedHrefs.length; index += 1) {
      await expect(links.nth(index)).toHaveAttribute('href', expectedHrefs[index]);
      await expect(links.nth(index)).toContainText(homepageCase.cardTexts[index]);
    }

    const contentOrder = await main.evaluate((element) =>
      [...element.querySelectorAll('[data-home-priority], [data-home-browse], [data-home-reference]')].map((section) => {
        if (section.hasAttribute('data-home-priority')) return 'priority';
        if (section.hasAttribute('data-home-browse')) return 'browse';
        return 'reference';
      }),
    );
    expect(contentOrder).toEqual(['priority', 'browse', 'reference']);
    await expect(
      main.locator('[data-home-reference]').getByRole('heading', { level: 2, name: homepageCase.referenceTitle, exact: true }),
    ).toBeVisible();

    await links.first().click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(new RegExp(`${homepageCase.prefix}changelog/v33/$`));
  });
}
