import { test, expect } from '@playwright/test';

// Hotkeys 速查页改写后（v33 核验键位 + “重复建造/连发核弹”技巧）的回归测试。
// 旧页面把 Space=暂停、A=攻击、B=Build 菜单、T=运输 写错了，这里锁死正确内容，
// 防止后续 agent 再退回旧值。

const cases = [
  {
    lang: 'en',
    path: '/guides/hotkeys/',
    title: 'Hotkey Practice and Control Workflows',
    atom: 'Atom Bomb',
    hydrogen: 'Hydrogen Bomb',
    // 头部问答标题里的关键短语
    repeatHeading: /fire nukes so quickly/i,
    cityRow: /\bCity\b/,
    fixedBoundary: 'F, R, and Shift are defaults, not mandatory keys',
    intent: 'practice guide for battlefield workflows and input recovery, not the complete key table',
    referenceHrefEnd: '/shortcuts/',
  },
  {
    lang: 'zh',
    path: '/zh/guides/hotkeys/',
    title: '快捷键练习与实战控制流程',
    atom: '原子弹',
    hydrogen: '氢弹',
    repeatHeading: /为什么.*连发核弹/,
    cityRow: /城市/,
    fixedBoundary: 'F、R、Shift 是默认键，不是强制键位',
    intent: '练习战场流程和输入恢复的教程，不是完整键位表',
    referenceHrefEnd: '/zh/shortcuts/',
  },
  {
    lang: 'fr',
    path: '/fr/guides/hotkeys/',
    title: 'Entraînement aux raccourcis et séquences de contrôle',
    atom: 'bombe atomique',
    hydrogen: 'bombe à hydrogène',
    repeatHeading: /Comment les joueurs lancent-ils des nukes aussi vite/i,
    cityRow: /Ville/,
    fixedBoundary: 'pas des touches imposées',
    intent: 'séquences de combat et à la récupération après erreur',
    referenceHrefEnd: '/fr/shortcuts/',
  },
  {
    lang: 'de',
    path: '/de/guides/hotkeys/',
    title: 'Hotkey-Training und Steuerungsabläufe',
    atom: 'Atombombe',
    hydrogen: 'Wasserstoffbombe',
    repeatHeading: /Wie feuern Spieler Nukes so schnell/i,
    cityRow: /City/,
    fixedBoundary: 'keine vorgeschriebenen Tasten',
    intent: 'erklärt Übungen, Gefechtsabläufe und Eingabeerholung, nicht die vollständige Tastentabelle',
    referenceHrefEnd: '/de/shortcuts/',
  },
  {
    lang: 'nl',
    path: '/nl/guides/hotkeys/',
    title: 'Sneltoetsen oefenen en besturingsroutines',
    atom: 'Atoombom',
    hydrogen: 'Waterstofbom',
    repeatHeading: /Hoe vuren spelers zo snel nukes af/i,
    cityRow: /Stad/,
    fixedBoundary: 'geen verplichte toetsen',
    intent: 'gaat over oefeningen, gevechtsroutines en herstel na invoerfouten, niet over de volledige toetstabel',
    referenceHrefEnd: '/nl/shortcuts/',
  },
];

for (const c of cases) {
  test(`hotkeys[${c.lang}] 展示 v34 改键边界与连发核弹技巧`, async ({ page }) => {
    // 只等 DOM 就绪，不等 'load'：BaseLayout 内联了 googletagmanager 异步脚本，
    // 本机外网受限时它迟迟不返回，'load' 事件可能 30s 内不触发；而要断言的内容
    // 都是服务端渲染的静态 HTML，domcontentloaded 已足够。
    await page.goto(c.path, { waitUntil: 'domcontentloaded' });
    const main = page.locator('main');

    // CTRL-01：攻略只负责训练与故障恢复，完整键位清单留给 /shortcuts/。
    await expect(page.locator('h1')).toContainText(c.title);
    await expect(main.locator(`a[href$="${c.referenceHrefEnd}"]`).first()).toBeVisible();
    await expect(main.locator('table')).toHaveCount(1);

    // 1) 建造数字键：8 = 原子弹、9 = 氢弹（页面以表格列出）
    await expect(main).toContainText(c.atom);
    await expect(main).toContainText(c.hydrogen);

    // 2) “重复建造 / 连发核弹”这一核心问答必须存在
    await expect(main).toContainText(c.repeatHeading);

    // 3) City 数字键行存在（验证建造表渲染）
    await expect(main).toContainText(c.cityRow);

    // 4) 绝不能再出现旧的错误描述：Space 不是“暂停”，A 不是“攻击模式”
    await expect(main).not.toContainText('Attack mode (towards the cursor)');
    await expect(main).not.toContainText('攻击模式（朝鼠标方向）');
    await expect(main).not.toContainText('召出 Build 菜单');

    // The three named actions are configurable in stable v34; beta uses X/F/R.
    await expect(main).toContainText('v0.34.25');
    await expect(main).toContainText('v0.35.0-beta2');
    await expect(main).toContainText(c.fixedBoundary);
    await expect(main).toContainText(c.intent);
  });
}
