import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { ADSENSE_PUBLISHER_ID, getGoogleCmpScriptUrl } from '../src/config/adsense';

const adsTxt = readFileSync(new URL('../public/ads.txt', import.meta.url), 'utf8');

test('analytics stays disabled until the visitor opts in', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const banner = page.getByTestId('consent-banner');
  await expect(banner).toBeVisible();
  await expect(page.locator('script[data-openfront-analytics]')).toHaveCount(0);

  await banner.getByRole('button', { name: 'Essential only' }).click();
  await expect(banner).toBeHidden();
  await expect(page.locator('script[data-openfront-analytics]')).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('openfront-intel-consent-v1'))).toBe('essential');

  await page.getByTestId('manage-consent').click();
  await expect(banner).toBeVisible();

  await banner.getByRole('button', { name: 'Allow analytics' }).click();
  await expect(banner).toBeHidden();
  await expect(page.locator('script[data-openfront-analytics]')).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('openfront-intel-consent-v1'))).toBe('analytics');

  await page.getByTestId('manage-consent').click();
  await expect(banner).toBeVisible();
  await banner.getByRole('button', { name: 'Essential only' }).click();
  await expect(banner).toBeHidden();
  await expect(page.locator('script[data-openfront-analytics]')).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('openfront-intel-consent-v1'))).toBe('essential');
  await expect(page.evaluate(() => (
    window as typeof window & { 'ga-disable-G-7R6FVF17YG'?: boolean }
  )['ga-disable-G-7R6FVF17YG'])).resolves.toBe(true);
});

test('stored privacy choice persists and localized policy link is correct', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('openfront-intel-consent-v1', 'essential');
  });

  await page.goto('/zh/', { waitUntil: 'domcontentloaded' });

  const banner = page.getByTestId('consent-banner');
  await expect(banner).toBeHidden();
  await page.getByTestId('manage-consent').click();
  await expect(banner).toBeVisible();
  await expect(banner.getByRole('link', { name: '查看隐私政策' })).toHaveAttribute('href', '/zh/privacy/');
});

test('Google CMP loader uses the ads.txt publisher id when explicitly enabled', async ({ page }) => {
  expect(adsTxt).toContain(`google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT`);

  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const cmpScript = page.locator('script[data-google-cmp]');
  await expect(cmpScript).toHaveCount(1);
  await expect(cmpScript).toHaveAttribute('data-publisher-id', ADSENSE_PUBLISHER_ID);
  await expect(cmpScript).toHaveAttribute('data-official-src', getGoogleCmpScriptUrl());
  await expect(page.locator('iframe[name="googlefcPresent"][data-google-cmp-marker="true"]')).toHaveCount(1);
  await expect(page.evaluate(() => (
    window as typeof window & { __openfrontGoogleCmpStubLoaded?: boolean }
  ).__openfrontGoogleCmpStubLoaded)).resolves.toBe(true);
});

const adDisclosureCases = [
  {
    path: '/privacy/',
    phrases: ['place or read cookies', 'web beacons', 'Google-certified consent management platform'],
  },
  {
    path: '/fr/privacy/',
    phrases: ['déposer ou lire des cookies', 'balises web', 'plateforme de gestion du consentement certifiée par Google'],
  },
  {
    path: '/nl/privacy/',
    phrases: ['cookies plaatsen of lezen', 'webbakens', 'door Google gecertificeerd toestemmingsbeheerplatform'],
  },
  {
    path: '/de/privacy/',
    phrases: ['Cookies setzen oder lesen', 'Web-Beacons', 'von Google zertifizierte Consent-Management-Plattform'],
  },
  {
    path: '/zh/privacy/',
    phrases: ['放置或读取 Cookie', '网络信标', 'Google 认证的同意管理平台'],
  },
];

for (const disclosureCase of adDisclosureCases) {
  test(`${disclosureCase.path} discloses third-party advertising data use`, async ({ page }) => {
    await page.goto(disclosureCase.path, { waitUntil: 'domcontentloaded' });
    const main = page.locator('main');
    for (const phrase of disclosureCase.phrases) {
      await expect(main).toContainText(phrase);
    }
  });
}
