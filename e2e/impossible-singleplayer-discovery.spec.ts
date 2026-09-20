import { expect, test } from '@playwright/test';

const cases = [
  { lang: 'en', prefix: '', answer: 'Direct answer: protect the run, then plan the finish', value: '31,250' },
  { lang: 'zh', prefix: '/zh', answer: '直接答案：先保留资格，再安排终局', value: '31,250' },
  { lang: 'fr', prefix: '/fr', answer: 'Réponse directe : protéger la partie, puis préparer la victoire', value: '31 250' },
  { lang: 'de', prefix: '/de', answer: 'Direkte Antwort: Berechtigung sichern und den Sieg vorbereiten', value: '31.250' },
  { lang: 'nl', prefix: '/nl', answer: 'Direct antwoord: bescherm de poging en plan de finish', value: '31.250' },
] as const;

for (const contentCase of cases) {
  test(`Impossible singleplayer discovery[${contentCase.lang}] links the campaign and Nation border answers`, async ({ page }) => {
    const target = `${contentCase.prefix}/guides/impossible-singleplayer/`;
    const neighbor = `${contentCase.prefix}/guides/nations-pressure/`;

    await page.goto(`${contentCase.prefix}/guides/`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator(`li[data-guide-card][data-guide-group="combat"] a[href="${target}"]`)).toHaveCount(1);

    await page.goto(neighbor, { waitUntil: 'domcontentloaded' });
    await expect(page.locator(`main .prose a[href="${target}"]`)).toHaveCount(1);

    await page.goto(target, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 2, name: contentCase.answer })).toBeVisible();
    await expect(page.locator('main')).toContainText(contentCase.value);
    await expect(page.locator(`main .prose a[href="${neighbor}"]`).first()).toBeVisible();
  });
}
