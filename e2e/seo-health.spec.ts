import { expect, test } from '@playwright/test';

const socialImage = 'https://openfront.fyi/openfront-intel-social.png';
const key = '4aa3a7277ff993208d51a9063b1af3f2';
const metadataCases = [
  { path: '/about/', titleLimit: 68 },
  { path: '/fr/guides/building-timing/', titleLimit: 68 },
  { path: '/nl/mechanics/economy/', titleLimit: 68 },
  { path: '/de/mechanics/modes/', titleLimit: 68 },
  { path: '/zh/guides/population-growth/', titleLimit: 40 },
];

for (const entry of metadataCases) {
  test(`${entry.path} exposes bounded metadata and a complete social card`, async ({ page }) => {
    await page.goto(entry.path, { waitUntil: 'domcontentloaded' });

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).not.toBeNull();
    expect([...(description ?? '')].length).toBeGreaterThanOrEqual(110);
    expect([...(description ?? '')].length).toBeLessThanOrEqual(160);

    const title = await page.title();
    expect([...title].length).toBeLessThanOrEqual(entry.titleLimit);
    expect(title).not.toContain('…');

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', socialImage);
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630');
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', socialImage);
  });
}

test('sitemap and HTML use the same zh-CN hreflang code', async ({ page, request }) => {
  await page.goto('/zh/guides/map-strategy/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('link[rel="alternate"]')).toHaveCount(6);
  await expect(page.locator('link[rel="alternate"][hreflang="zh-CN"]')).toHaveAttribute(
    'href',
    'https://openfront.fyi/zh/guides/map-strategy/',
  );

  const sitemap = await request.get('/sitemap-0.xml');
  expect(sitemap.ok()).toBeTruthy();
  const body = await sitemap.text();
  expect(body).toContain('hreflang="zh-CN"');
  expect(body).not.toContain('hreflang="zh"');
});

test('SEO assets are local, directly reachable, and decodable', async ({ page, request }) => {
  for (const path of [
    '/openfront-intel-social.png',
    '/images/maps/svalmel-v33.7.webp',
    '/images/maps/dyslexdria-v33.7.webp',
    `/${key}.txt`,
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(200);
  }

  const keyResponse = await request.get(`/${key}.txt`);
  expect((await keyResponse.text()).trim()).toBe(key);

  await page.goto('/guides/map-strategy/', { waitUntil: 'domcontentloaded' });
  for (const path of ['/images/maps/svalmel-v33.7.webp', '/images/maps/dyslexdria-v33.7.webp']) {
    const image = page.locator(`img[src="${path}"]`);
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  }
});
