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
    economyHrefEnd: '/mechanics/economy/',
    nukesHrefEnd: '/mechanics/nukes/',
    rightClick: 'Cancel an active Warship',
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
    economyHrefEnd: '/zh/mechanics/economy/',
    nukesHrefEnd: '/zh/mechanics/nukes/',
    rightClick: '取消当前战舰',
    bcAria: '面包屑导航',
    home: '首页',
  },
  {
    lang: 'fr',
    path: '/fr/shortcuts/',
    title: 'Raccourcis OpenFront',
    buildTerm: 'Ville',
    navAria: 'Navigation principale',
    navLabel: 'Raccourcis',
    linkHrefEnd: '/fr/shortcuts/',
    guideHrefEnd: '/fr/guides/hotkeys/',
    economyHrefEnd: '/fr/mechanics/economy/',
    nukesHrefEnd: '/fr/mechanics/nukes/',
    rightClick: 'annuler une sélection active',
    bcAria: 'Fil d’Ariane',
    home: 'Accueil',
  },
  {
    lang: 'de',
    path: '/de/shortcuts/',
    title: 'OpenFront Tastenkürzel',
    buildTerm: 'City',
    navAria: 'Hauptnavigation',
    navLabel: 'Tastenkürzel',
    linkHrefEnd: '/de/shortcuts/',
    guideHrefEnd: '/de/guides/hotkeys/',
    economyHrefEnd: '/de/mechanics/economy/',
    nukesHrefEnd: '/de/mechanics/nukes/',
    rightClick: 'aktive Warship',
    bcAria: 'Brotkrümelnavigation',
    home: 'Startseite',
  },
  {
    lang: 'nl',
    path: '/nl/shortcuts/',
    title: 'OpenFront sneltoetsen',
    buildTerm: 'Stad',
    navAria: 'Hoofdnavigatie',
    navLabel: 'Sneltoetsen',
    linkHrefEnd: '/nl/shortcuts/',
    guideHrefEnd: '/nl/guides/hotkeys/',
    economyHrefEnd: '/nl/mechanics/economy/',
    nukesHrefEnd: '/nl/mechanics/nukes/',
    rightClick: 'actieve oorlogsschip',
    bcAria: 'Kruimelpad',
    home: 'Home',
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
    await expect(page.locator(`a[href$="${c.economyHrefEnd}"]`).first()).toBeVisible();
    await expect(page.locator(`a[href$="${c.nukesHrefEnd}"]`).first()).toBeVisible();

    // CTRL-01：本页是完整查键页；攻略页不复制这 6 组默认键位表。
    await expect(page.locator('main table')).toHaveCount(6);
    await expect(page.locator('main')).toContainText('v33.1');
    await expect(page.locator('main')).toContainText(c.rightClick);
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
