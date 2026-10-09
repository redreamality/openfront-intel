import { expect, test } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';

const homepageCases = [
  { lang: 'en', path: '/', prefix: '/' },
  { lang: 'zh', path: '/zh/', prefix: '/zh/' },
  { lang: 'fr', path: '/fr/', prefix: '/fr/' },
  { lang: 'de', path: '/de/', prefix: '/de/' },
  { lang: 'nl', path: '/nl/', prefix: '/nl/' },
] as const;

function latestGuideSlugs(lang: string) {
  const directory = new URL(`../src/content/guides/${lang}/`, import.meta.url);
  return readdirSync(directory).filter((name) => name.endsWith('.mdx')).map((name) => {
    const source = readFileSync(new URL(name, directory), 'utf8');
    const metadata = source.split(/^---\s*$/m)[1] ?? '';
    const date = metadata.match(/^updatedDate:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1]
      ?? metadata.match(/^pubDate:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
    return { slug: name.slice(0, -4), date: date ?? '', draft: /^draft:\s*true\s*$/m.test(metadata) };
  }).filter((entry) => !entry.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
    .slice(0, 5).map((entry) => entry.slug);
}

for (const homepageCase of homepageCases) {
  test(`homepage[${homepageCase.lang}] features the five newest guides`, async ({ page }) => {
    await page.goto(homepageCase.path, { waitUntil: 'domcontentloaded' });

    const section = page.locator('[data-home-latest-guides]');
    await expect(section).toBeVisible();

    const links = section.locator('[data-home-latest-guide]');
    const expectedSlugs = latestGuideSlugs(homepageCase.lang);
    await expect(links).toHaveCount(expectedSlugs.length);
    await expect(section.locator(`a[href="${homepageCase.prefix}guides/"]`)).toHaveCount(1);

    for (const [index, slug] of expectedSlugs.entries()) {
      const link = links.nth(index);
      await expect(link).toHaveAttribute('data-guide-slug', slug);
      await expect(link).toHaveAttribute('href', `${homepageCase.prefix}guides/${slug}/`);
    }
  });
}
