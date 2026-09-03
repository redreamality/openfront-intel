import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';

// 直接读 _meta.json（避免 ESM 的 JSON import attribute 限制）。
// 页脚版本号必须取自 upstreamVersion（随 `pnpm extract` 自动更新，禁止写死），
// 且页脚不得再出现 "made with Astro" 字样。
const meta = JSON.parse(
  readFileSync(new URL('../src/data/_meta.json', import.meta.url), 'utf8'),
) as { upstreamVersion: string };

const cases = [
  { lang: 'en', path: '/', label: `OpenFrontIO data snapshot ${meta.upstreamVersion}` },
  { lang: 'zh', path: '/zh/', label: `OpenFrontIO 数据快照 ${meta.upstreamVersion}` },
];

const footerCommunityLinks = [
  'https://github.com/decuirgradley614-debug',
  'https://cal.com/gradley-decuir-9og5sl',
  'https://www.reddit.com/user/openfrontintel/',
  'https://youtube.com/@openfrontintel?si=m7nESdTxZzfRhrwX',
];

const contactCommunityLinks = [
  'https://www.behance.net/gradleydecuir',
  'https://www.linkedin.com/in/%E5%BE%B7%E5%88%A9-%E6%A0%BC%E6%8B%89-04931442b/',
  'https://medium.com/@openfrontintel/about',
  'https://x.com/openfrontintel',
  'https://www.tumblr.com/openfrontintel',
  'https://linktr.ee/openfrontintel',
  'https://www.twitch.tv/openfrontintel/about',
];

for (const c of cases) {
  test(`footer[${c.lang}] 显示实时上游版本且无 Astro 署名`, async ({ page }) => {
    await page.goto(c.path, { waitUntil: 'domcontentloaded' });
    const footer = page.locator('footer');
    await expect(footer).toContainText(c.label);
    await expect(footer).toContainText(`© ${new Date().getFullYear()}`);
    await expect(footer).not.toContainText('made with Astro');
    await expect(footer.getByRole('link', { name: c.lang === 'zh' ? '隐私政策' : 'Privacy' })).toBeVisible();
    await expect(footer.getByRole('link', { name: c.lang === 'zh' ? '本站源码' : 'Site source' })).toHaveAttribute(
      'href',
      'https://github.com/redreamality/openfront-intel',
    );
    await expect(footer.getByRole('link', { name: c.lang === 'zh' ? '意见反馈' : 'Feedback board' })).toHaveAttribute(
      'href',
      'https://feedback.example.test/openfront/',
    );
    for (const href of footerCommunityLinks) {
      await expect(footer.locator(`a[href="${href}"]`)).toHaveCount(1);
    }
  });
}

for (const c of cases) {
  test(`contact[${c.lang}] 提供补充社区渠道`, async ({ page }) => {
    await page.goto(c.lang === 'zh' ? '/zh/contact/' : '/contact/', { waitUntil: 'domcontentloaded' });
    const main = page.locator('main');
    for (const href of contactCommunityLinks) {
      await expect(main.locator(`a[href="${href}"]`)).toHaveCount(1);
    }
  });
}
