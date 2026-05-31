import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';

// 直接读 _meta.json（避免 ESM 的 JSON import attribute 限制）。
// 页脚版本号必须取自 upstreamVersion（随 `pnpm extract` 自动更新，禁止写死），
// 且页脚不得再出现 "made with Astro" 字样。
const meta = JSON.parse(
  readFileSync(new URL('../src/data/_meta.json', import.meta.url), 'utf8'),
) as { upstreamVersion: string };

const cases = [
  { lang: 'en', path: '/', label: `Data from OpenFrontIO ${meta.upstreamVersion}` },
  { lang: 'zh', path: '/zh/', label: `数据采集自 OpenFrontIO ${meta.upstreamVersion}` },
];

for (const c of cases) {
  test(`footer[${c.lang}] 显示实时上游版本且无 Astro 署名`, async ({ page }) => {
    await page.goto(c.path);
    const footer = page.locator('footer');
    await expect(footer).toContainText(c.label);
    await expect(footer).toContainText(`© ${new Date().getFullYear()}`);
    await expect(footer).not.toContainText('made with Astro');
  });
}
