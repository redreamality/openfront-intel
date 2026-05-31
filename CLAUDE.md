# CLAUDE.md — openfront-intel

OpenFront.io 多语种(en/zh/fr/de/nl)情报与攻略站,Astro + Tailwind 静态站点。

## 项目约定

- node 包管理用 `pnpm`。
- 游戏数据(`src/data/*.json`)由 `pnpm extract`(= `scripts/extract-game-data.mjs`，prebuild 阶段自动跑)从本地 `OpenFrontIO` clone 抽取，**不要手改**。
- 推送默认私有仓库。

## Footer 版本号必须随时更新（禁止写死）

- 页脚 “Data from OpenFrontIO vXX” 的版本号取自 `src/data/_meta.json` 的 `upstreamVersion`，在 `src/components/Footer.astro` 里用 `t('footer.copyright').replace('{version}', meta.upstreamVersion)` 注入。
- `src/i18n/ui.ts` 的 5 条 `footer.copyright` 一律用占位符 `{version}`，**任何语种都不要把版本号写死**。
- 上游出新版本后，刷新版本号的正确做法：`git -C ../OpenFrontIO pull` → `pnpm extract`（重写 `_meta.json`）→ `pnpm build`。页脚会自动显示新版本。
- 页脚不再保留 “made with Astro” 署名。

## changelog（游戏版本笔记）

- `src/content/changelog/{lang}/vXX.mdx` 是 **OpenFront 游戏版本** 的 release notes，不是站点自身更新日志。
- 权威来源是 GitHub Release 正文（`openfrontio/OpenFrontIO`）。**只有 release 正文有真实内容时才写**；测试版(test-release)的正文常是 “TEST” 占位，不要据此编造补丁说明。
- 新增条目沿用现有 frontmatter：`version: vXX`、`category: Release Notes`(zh 为 `版本笔记`)、`tags: [changelog, balance, features]`。

## e2e 测试（避坑规则，务必遵守）

- 改了页脚/导航等 UI 交互细节后，必须加/更新 `e2e/*.spec.ts` 并 `pnpm test:e2e` 跑通。
- **不要用 `astro dev` 起 webServer 做 e2e**：本机 `astro dev` 会命中 Vite 的 `Cannot split a chunk that has already been edited ("import.meta")` 报错，dev server 起不来导致超时。`playwright.config.ts` 已改为 `pnpm build && pnpm preview`，对生产 dist 跑测试，可稳定绕开。
- **测试里读 JSON 不要用 `import x from '*.json'`**：Playwright 的 Node ESM loader 会报 `needs an import attribute of "type: json"`。改用 `JSON.parse(readFileSync(new URL('../src/data/_meta.json', import.meta.url),'utf8'))`。
- **`@playwright/test` 版本要锁死匹配本机缓存浏览器**：本机 `%LOCALAPPDATA%\ms-playwright` 缓存最高到 `chromium(_headless_shell)-1208`（= Playwright **1.57**）。用 `^1.57.0` 会被解析成 1.60，要更高版本的浏览器(1223)从而报 “Executable doesn't exist / run playwright install”。devDependency 固定为精确 `1.57.0`，避免触发浏览器下载。
- playwright 产物已 gitignore：`test-results/`、`playwright-report/`、`.playwright/`。
