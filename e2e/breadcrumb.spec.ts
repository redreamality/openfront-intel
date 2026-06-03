import { test, expect } from '@playwright/test';

// 面包屑（方案A：BaseLayout 集中、从 URL 自动推导 + JSON-LD BreadcrumbList）回归测试。
// 注意：只等 domcontentloaded，不等 'load'——BaseLayout 内联了 googletagmanager 异步脚本，
// 本机外网受限时 'load' 可能 30s 不触发；面包屑是服务端渲染的静态 HTML，domcontentloaded 已足够。
// 文案按语种参数化：zh 断言「首页/机制」而非英文。

const cases = [
  {
    lang: 'en',
    path: '/mechanics/basics/',
    aria: 'Breadcrumb',
    home: 'Home',
    section: 'Mechanics',
    sectionHref: '/mechanics/',
  },
  {
    lang: 'zh',
    path: '/zh/mechanics/basics/',
    aria: '面包屑导航',
    home: '首页',
    section: '机制',
    sectionHref: '/zh/mechanics/',
  },
];

for (const c of cases) {
  test(`breadcrumb[${c.lang}] 展示 首页/板块/当前页 层级与链接`, async ({ page }) => {
    await page.goto(c.path, { waitUntil: 'domcontentloaded' });

    const crumb = page.locator(`nav[aria-label="${c.aria}"]`);
    await expect(crumb).toBeVisible();

    // 1) 首页 + 板块两段文案存在
    await expect(crumb).toContainText(c.home);
    await expect(crumb).toContainText(c.section);

    // 2) 板块段是可点链接，指向板块首页（语言前缀正确）
    await expect(crumb.locator(`a[href$="${c.sectionHref}"]`)).toHaveCount(1);

    // 3) 末段是当前页：不带链接、aria-current=page
    await expect(crumb.locator('[aria-current="page"]')).toHaveCount(1);
    await expect(crumb.locator('[aria-current="page"] a')).toHaveCount(0);

    // 4) 同时输出 schema.org BreadcrumbList 结构化数据
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.join('\n')).toContain('"BreadcrumbList"');
  });
}

// 首页（无层级）不应出现面包屑。
for (const home of [{ lang: 'en', path: '/', aria: 'Breadcrumb' }, { lang: 'zh', path: '/zh/', aria: '面包屑导航' }]) {
  test(`breadcrumb[${home.lang}] 首页不渲染面包屑`, async ({ page }) => {
    await page.goto(home.path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator(`nav[aria-label="${home.aria}"]`)).toHaveCount(0);
  });
}
