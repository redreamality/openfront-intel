import { test, expect } from '@playwright/test';

// /shortcuts 独立着陆页（流量词 "openfront shortcuts"）回归测试。
// 约定同 breadcrumb.spec.ts：只等 domcontentloaded（BaseLayout 内联 gtag 异步脚本，'load' 本机可能 30s 不触发）。
// 文案按语种参数化：zh 断言「快捷键 / 城市」而非英文。

const cases = [
  {
    lang: 'en',
    path: '/shortcuts/',
    title: 'OpenFront Shortcuts',
    buildTerm: 'City',
    navAria: 'Main navigation',
    navLabel: 'Shortcuts',
    linkHrefEnd: '/shortcuts/',
    guideHrefEnd: '/guides/hotkeys/',
    bcAria: 'Breadcrumb',
    home: 'Home',
  },
  {
    lang: 'zh',
    path: '/zh/shortcuts/',
    title: 'OpenFront 快捷键',
    buildTerm: '城市',
    navAria: '主导航',
    navLabel: '快捷键',
    linkHrefEnd: '/zh/shortcuts/',
    guideHrefEnd: '/zh/guides/hotkeys/',
    bcAria: '面包屑导航',
    home: '首页',
  },
];

for (const c of cases) {
  test(`shortcuts[${c.lang}] 页面渲染标题/按键表/交叉链接`, async ({ page }) => {
    await page.goto(c.path, { waitUntil: 'domcontentloaded' });

    // 1) H1 标题（含目标关键词）
    await expect(page.locator('h1')).toContainText(c.title);

    // 2) 建造数字键区块：至少有一个 kbd，且含本语种建筑术语
    await expect(page.locator('kbd').first()).toBeVisible();
    // 第一个表格是建造数字键组，含本语种建筑术语
    await expect(page.locator('table').first()).toContainText(c.buildTerm);
    // 数字键 8（原子弹）在表格里出现
    await expect(page.locator('table kbd', { hasText: '8' }).first()).toBeVisible();

    // 3) 交叉链接：指向深入的 hotkeys 教程
    await expect(page.locator(`a[href$="${c.guideHrefEnd}"]`).first()).toBeVisible();
  });

  test(`shortcuts[${c.lang}] 主导航含快捷键入口`, async ({ page }) => {
    await page.goto(c.path, { waitUntil: 'domcontentloaded' });
    const nav = page.locator(`nav[aria-label="${c.navAria}"]`);
    await expect(nav.locator(`a[href$="${c.linkHrefEnd}"]`)).toHaveCount(1);
    await expect(nav).toContainText(c.navLabel);
  });

  test(`shortcuts[${c.lang}] 面包屑 首页/当前页 + BreadcrumbList`, async ({ page }) => {
    await page.goto(c.path, { waitUntil: 'domcontentloaded' });
    const crumb = page.locator(`nav[aria-label="${c.bcAria}"]`);
    await expect(crumb).toBeVisible();
    await expect(crumb).toContainText(c.home);
    // 末段是当前页：不带链接、aria-current=page
    await expect(crumb.locator('[aria-current="page"]')).toHaveCount(1);
    await expect(crumb.locator('[aria-current="page"] a')).toHaveCount(0);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.join('\n')).toContain('"BreadcrumbList"');
  });
}
