import { expect, test } from '@playwright/test';

const languages = ['en', 'fr', 'de', 'nl', 'zh'] as const;
const topics = [
  { section: 'guides', slug: 'first-match', latinMin: 8_000, hanMin: 10_000 },
  { section: 'guides', slug: 'hotkeys', latinMin: 1_500, hanMin: 2_500 },
  { section: 'guides', slug: 'water-nukes', latinMin: 1_500, hanMin: 2_500 },
  { section: 'guides', slug: 'mirv', latinMin: 1_500, hanMin: 2_000 },
  { section: 'guides', slug: 'nuke-calculator', latinMin: 1_500, hanMin: 2_000 },
  { section: 'guides', slug: 'population-growth', latinMin: 1_500, hanMin: 2_000 },
  { section: 'guides', slug: 'port-vs-factory', latinMin: 1_500, hanMin: 2_000 },
  { section: 'guides', slug: 'map-size-compact-mode', latinMin: 1_200, hanMin: 2_000 },
  { section: 'guides', slug: 'map-strategy', latinMin: 1_200, hanMin: 2_000 },
  { section: 'maps', slug: 'svalmel', latinMin: 1_200, hanMin: 2_000 },
  { section: 'maps', slug: 'dyslexdria', latinMin: 1_200, hanMin: 2_000 },
  { section: 'strategies', slug: 'economy-fundamentals', latinMin: 1_500, hanMin: 2_500 },
  { section: 'strategies', slug: 'ffa-opening', latinMin: 1_500, hanMin: 2_500 },
  { section: 'strategies', slug: 'nuclear-deterrence', latinMin: 1_500, hanMin: 2_500 },
  { section: 'strategies', slug: 'team-naval-control', latinMin: 1_500, hanMin: 2_500 },
  { section: 'strategies', slug: 'recovery-playbook', latinMin: 1_500, hanMin: 2_500 },
  { section: 'strategies', slug: 'team-roles', latinMin: 1_500, hanMin: 2_500 },
  { section: 'strategies', slug: 'diplomacy-betrayal', latinMin: 1_500, hanMin: 2_500 },
] as const;

function countLatinWords(text: string) {
  return text.match(/[\p{L}\p{N}]+(?:['’‑-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

function countHanCharacters(text: string) {
  return text.match(/\p{Script=Han}/gu)?.length ?? 0;
}

for (const topic of topics) {
  for (const lang of languages) {
    const prefix = lang === 'en' ? '' : `${lang}/`;
    const path = `/${prefix}${topic.section}/${topic.slug}/`;

    test(`${path} renders the complete localized core article`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const article = page.locator('article .prose');
      await expect(article).toBeVisible();

      const text = await article.innerText();
      const count = lang === 'zh' ? countHanCharacters(text) : countLatinWords(text);
      expect(count).toBeGreaterThanOrEqual(lang === 'zh' ? topic.hanMin : topic.latinMin);
      expect(await article.locator('h2, h3, h4').count()).toBeGreaterThanOrEqual(8);
      expect(await article.locator('a[href^="/"]').count()).toBeGreaterThanOrEqual(3);
    });
  }
}

const gscIntentCases = [
  { path: '/guides/first-match/', phrase: 'How do you play OpenFront for the first time?' },
  { path: '/fr/guides/first-match/', phrase: 'Ce tuto OpenFront' },
  { path: '/guides/water-nukes/', phrase: 'what are Water Nukes in OpenFront?' },
  { path: '/strategies/nuclear-deterrence/', phrase: 'How much does a MIRV cost in OpenFront?' },
] as const;

for (const intentCase of gscIntentCases) {
  test(`${intentCase.path} answers its Search Console long-tail intent`, async ({ page }) => {
    await page.goto(intentCase.path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toContainText(intentCase.phrase);
  });
}
