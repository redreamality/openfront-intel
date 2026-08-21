# E2E 与交互 runbook

仅在任务涉及本主题时读取。规则从 2026-08-20 的项目级 `AGENTS.md` 逐条迁移；原始快照见 [归档](../archive/AGENTS-through-2026-08-20.md)。

来源范围：`e2e 测试` 原章节。

## 规则

- 改了页脚/导航等 UI 交互细节后，必须加/更新 `e2e/*.spec.ts` 并 `pnpm test:e2e` 跑通。
- **不要用 `astro dev` 起 webServer 做 e2e**：本机 `astro dev` 会命中 Vite 的 `Cannot split a chunk that has already been edited ("import.meta")` 报错，dev server 起不来导致超时。`playwright.config.ts` 已改为 `pnpm build && pnpm preview`，对生产 dist 跑测试，可稳定绕开。
- **测试里读 JSON 不要用 `import x from '*.json'`**：Playwright 的 Node ESM loader 会报 `needs an import attribute of "type: json"`。改用 `JSON.parse(readFileSync(new URL('../src/data/_meta.json', import.meta.url),'utf8'))`。
- **`@playwright/test` 版本要锁死匹配本机缓存浏览器**：本机 `%LOCALAPPDATA%\ms-playwright` 缓存最高到 `chromium(_headless_shell)-1208`（= Playwright **1.57**）。用 `^1.57.0` 会被解析成 1.60，要更高版本的浏览器(1223)从而报 “Executable doesn't exist / run playwright install”。devDependency 固定为精确 `1.57.0`，避免触发浏览器下载。
- **e2e 里 `page.goto` 必须用 `{ waitUntil: 'domcontentloaded' }`，不要等默认的 `'load'`**：`BaseLayout.astro` 内联了 `googletagmanager.com/gtag/js` 异步分析脚本；本机外网受限时它迟迟不返回，`'load'` 事件可能 30s 内不触发，导致**每个** `page.goto` 都超时（连无关的 footer 测试一起挂）。要断言的内容都是服务端渲染的静态 HTML，`domcontentloaded` 已足够。
- **多语种页面的断言文案要按语种参数化**：zh 页用「原子弹/氢弹」而非 "Atom Bomb/Hydrogen Bomb"，把 atom/hydrogen 等术语放进每个 case 对象里，别对所有语种硬编码英文。
- **数据驱动页常有多个同类元素，`expect(locator).toContainText()` 会触发 Playwright strict-mode 报错**（如一页有多张 `<table>` 分组，`page.locator('table')` 命中 6 个）。要么 `.first()`/`.nth()` 收窄到具体那张表，要么先 `.filter({ hasText })`。断言「整页是否含某文案」时尤其要先收窄。
- **响应式主导航只保留一份 `<nav>` DOM，用 CSS 在桌面/移动端切换布局**：不要分别渲染桌面和移动端两份同 `aria-label` 的导航；即使其中一份 CSS 隐藏，DOM 计数断言和部分辅助技术仍会看到重复链接。折叠状态用外层 `data-open` 控制即可。
- **静态 Astro 页的语言切换若要保留 query/hash，必须在客户端点击时从 `window.location` 补回**：构建阶段的 `Astro.url.search` 不包含用户运行时查询串；只在模板里拼接会丢失 query。相关 e2e 用 `toHaveURL()` 断言 URL，再等待 `domcontentloaded`，避免受第三方脚本阻塞。
- playwright 产物已 gitignore：`test-results/`、`playwright-report/`、`.playwright/`。
- **首页 Hero 的链接数量不是固定契约**：除主要两个 CTA 外还可能有其他入口；e2e 应按目标 `href` 定位并断言唯一，不要用总链接数或固定索引表达业务目标。
