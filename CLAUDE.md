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

## 数据更新 / 离线 extract（避坑规则）

- 本环境到 github.com:443 的 **git 传输不稳定**：`git fetch/pull` 常报 `Connection was reset` 或 `Failed to connect ... port 443`（有时挂起），但 `gh` API 与有时的 `git push` 仍可用。需要看上游 diff 时优先走 `gh api repos/openfrontio/OpenFrontIO/compare/<base>...main`，不要依赖 `git pull`。git 命令一律加 `-c http.lowSpeedLimit=1000 -c http.lowSpeedTime=25` 快速失败，避免无限挂起。
- **`pnpm extract` 的地图来自目录名，不是目录内容**：`readMapDirs()` 只对 `OpenFrontIO/resources/maps/` 做 `readdirSync` + `isDirectory()` 过滤，地图的名称/分类全部来自本脚本的 `MAP_I18N`/`MAP_CATEGORIES`。因此当 `git pull` 不通、又要把新地图录进 `maps.json` 时，可在 clone 里 `mkdir` 对应的**空目录**作为占位 —— 产出的 `maps.json` 与真实 pull **逐字节相同**，且 git 恢复后 pull 会用真实内容覆盖（可逆）。
- 光在 `MAP_CATEGORIES` 里加 id **不够**：clone 目录里若没有该地图目录，`readMapDirs()` 不会列出它（除非 `!HAS_SOURCE` 走 fallback）。必须保证目录存在（真实或空占位）。
- 用 bash 写临时文件给 node 读时，**不要用 `/tmp`**：MSYS 的 `/tmp` 与 node 的 `C:\tmp` 不是同一路径，会 ENOENT。改用一条 node 管道（`... | node -e`）或写到项目内相对路径。
- 校验 maps.json 条目时注意结构是 `i18n.{lang}.name`（不是 `x.zh.name`）。
