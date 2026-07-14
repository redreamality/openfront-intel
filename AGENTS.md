# AGENTS.md — openfront-intel

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
- **e2e 里 `page.goto` 必须用 `{ waitUntil: 'domcontentloaded' }`，不要等默认的 `'load'`**：`BaseLayout.astro` 内联了 `googletagmanager.com/gtag/js` 异步分析脚本；本机外网受限时它迟迟不返回，`'load'` 事件可能 30s 内不触发，导致**每个** `page.goto` 都超时（连无关的 footer 测试一起挂）。要断言的内容都是服务端渲染的静态 HTML，`domcontentloaded` 已足够。
- **多语种页面的断言文案要按语种参数化**：zh 页用「原子弹/氢弹」而非 "Atom Bomb/Hydrogen Bomb"，把 atom/hydrogen 等术语放进每个 case 对象里，别对所有语种硬编码英文。
- **数据驱动页常有多个同类元素，`expect(locator).toContainText()` 会触发 Playwright strict-mode 报错**（如一页有多张 `<table>` 分组，`page.locator('table')` 命中 6 个）。要么 `.first()`/`.nth()` 收窄到具体那张表，要么先 `.filter({ hasText })`。断言「整页是否含某文案」时尤其要先收窄。
- **响应式主导航只保留一份 `<nav>` DOM，用 CSS 在桌面/移动端切换布局**：不要分别渲染桌面和移动端两份同 `aria-label` 的导航；即使其中一份 CSS 隐藏，DOM 计数断言和部分辅助技术仍会看到重复链接。折叠状态用外层 `data-open` 控制即可。
- **静态 Astro 页的语言切换若要保留 query/hash，必须在客户端点击时从 `window.location` 补回**：构建阶段的 `Astro.url.search` 不包含用户运行时查询串；只在模板里拼接会丢失 query。相关 e2e 用 `toHaveURL()` 断言 URL，再等待 `domcontentloaded`，避免受第三方脚本阻塞。
- playwright 产物已 gitignore：`test-results/`、`playwright-report/`、`.playwright/`。

## 数据更新 / 离线 extract（避坑规则）

- 本环境到 github.com:443 的 **git 传输不稳定**：`git fetch/pull` 常报 `Connection was reset` 或 `Failed to connect ... port 443`（有时挂起），但 `gh` API 与有时的 `git push` 仍可用。需要看上游 diff 时优先走 `gh api repos/openfrontio/OpenFrontIO/compare/<base>...main`，不要依赖 `git pull`。git 命令一律加 `-c http.lowSpeedLimit=1000 -c http.lowSpeedTime=25` 快速失败，避免无限挂起。
- **`pnpm extract` 的地图来自目录名，不是目录内容**：`readMapDirs()` 只对 `OpenFrontIO/resources/maps/` 做 `readdirSync` + `isDirectory()` 过滤，地图的名称/分类全部来自本脚本的 `MAP_I18N`/`MAP_CATEGORIES`。因此当 `git pull` 不通、又要把新地图录进 `maps.json` 时，可在 clone 里 `mkdir` 对应的**空目录**作为占位 —— 产出的 `maps.json` 与真实 pull **逐字节相同**，且 git 恢复后 pull 会用真实内容覆盖（可逆）。
- 光在 `MAP_CATEGORIES` 里加 id **不够**：clone 目录里若没有该地图目录，`readMapDirs()` 不会列出它（除非 `!HAS_SOURCE` 走 fallback）。必须保证目录存在（真实或空占位）。
- 用 bash 写临时文件给 node 读时，**不要用 `/tmp`**：MSYS 的 `/tmp` 与 node 的 `C:\tmp` 不是同一路径，会 ENOENT。改用一条 node 管道（`... | node -e`）或写到项目内相对路径。
- 校验 maps.json 条目时注意结构是 `i18n.{lang}.name`（不是 `x.zh.name`）。

## 路径与验证（避坑规则）

- i18n 工具函数位于 `src/i18n/index.ts`，项目中没有 `src/i18n/utils.ts`。读取不熟悉的模块前先用 `rg --files src/i18n` 确认真实路径，避免 PowerShell `Get-Content` 因猜错路径失败。
- 若 `pnpm exec astro check` 报 `src/components/FormulaBlock.astro` 中 `ItemInput` 不能赋给 `{ name: string; expr: string }`，这是当前全局基线类型错误；不要误判为无关页面改动引入。仍应确认本次文件没有新增诊断，并可用 `pnpm exec astro build` 验证静态路由是否能完整生成，同时将该基线错误另行修复。
- **PowerShell 下不要把含多层引号或动态 `import()` 的复杂源码直接传给 `node -e`**：PowerShell/原生参数序列化可能剥掉内部双引号，使合法源码变成语法错误。优先使用项目内临时脚本；若任务只读不能写文件，则先把源码编码为 UTF-8 Base64，再用结构简单的 bootstrap 解码执行。
- **PowerShell 读取含 `[` / `]` 的动态路由文件必须使用 `Get-Content -LiteralPath`**：例如 `src/pages/guides/[...slug].astro` 会被普通 `-Path` 当成通配表达式，导致“对象不存在”错误。
- **Windows 下不要把 `src/pages/*/about.astro`、`src/data/legal.*.ts` 等通配符直接作为 `rg` 的路径参数**：Windows 会把它视为非法文件名并报 `os error 123`。应从真实目录根搜索，例如 `rg PATTERN src/pages --glob 'about.astro'`。
- **沙箱用户运行 Git 若报 `detected dubious ownership`，不要改全局配置**：为单次命令添加 `git -c safe.directory='C:/absolute/workspace/path' ...`；若同时看到用户级 ignore 权限警告，可再按命令覆盖不可读的全局/排除配置。
- **无 TTY 环境中 pnpm 若报 `ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY`，说明它想清理由另一用户创建的 `node_modules`**：优先设置 `CI=true` 后显式安装，或在依赖已完整时直接调用 `node_modules/.bin/*.cmd`，不要反复执行会触发隐式安装的 `pnpm exec`。
- **受限用户直接运行 Astro 若因创建 `%APPDATA%/astro/Config` 报 `EPERM`，先设置 `ASTRO_TELEMETRY_DISABLED=1`**，再调用 `node_modules/.bin/astro.cmd`；否则检查尚未进入项目类型分析阶段。
- **PowerShell 下不要把包含多层字符串比较或正则的复杂表达式直接交给 `gh api --jq`**：引号可能在原生参数传递时被剥离，出现 `function not defined: v24/0` 等 jq 误解析。优先让 `gh api` 输出原始 JSON，再用 `ConvertFrom-Json` + `Where-Object` 过滤。
- **PowerShell 不要在带空格的括号表达式后直接调用 `.Substring()` 等方法**：`(...) .Substring(...)` 会报 `Unexpected token '.Substring'`。先把表达式结果赋给中间变量，再调用实例方法。
- **`apply_patch` 前先读取目标文件的精确片段，尤其是配置文件**：不要根据早先印象构造大段上下文；例如 sitemap 的 `lastmod` 位于 integration 顶层而非 `serialize` 返回值时，上下文不匹配会导致补丁整体失败。
- **静态链接审计要把 Astro 的顶层 404 当作特殊产物**：即使 `trailingSlash: 'always'`，`/404/` 仍可能生成 `dist/404.html` 而不是 `dist/404/index.html`。解析尾斜杠路由时应同时接受两种候选文件。
- **OpenFront changelog 的站内简写 `vXX` 不是 GitHub Release tag**：官方正式 Release URL 使用 `v0.XX.0`（如 `v24` → `v0.24.0`）。构造来源链接时必须规范化，并通过 `gh api repos/openfrontio/OpenFrontIO/releases/tags/<tag>` 验证正文不是 TEST 占位。
- **`rg` 在“零匹配”时会返回退出码 1，即使零匹配正是审计目标**：检查旧路径为 0 等场景不要把裸 `rg` 当成必须成功的命令；用 PowerShell 条件捕获退出码，或让脚本显式把 0/1 都解释为有效审计结果，避免把“未找到”误报成命令故障。
- **Cookie 设置从“允许统计”改回“仅必要功能”时必须立即停止当前页 Analytics**：不能只改 `localStorage` 等待下次导航。应设置 `ga-disable-<MEASUREMENT_ID>`、发送 denied consent update、移除动态 Google tag，并用 e2e 覆盖 allow → essential 的撤回路径。
- **`astro check` 会一起检查 `e2e/*.ts` 的 TypeScript**：Playwright 的 `page.evaluate` 即使运行正常，直接访问 `window['自定义属性']` 仍会触发 `ts(7015)`。对 `ga-disable-*` 等自定义全局属性使用局部交叉类型声明后再读取，不要依赖运行时宽松行为。
- **来源面板必须区分“提取 checkout”与“编辑验证范围”**：`_meta.upstreamCommit` 记录本次 extract 使用的源码 checkout，`_meta.upstreamVersion` 仍表示编辑验证范围/内置 fallback 版本；不得暗示该 commit 就是 vXX 对应 tag。源码链接可以指向 checkout，但文案必须明确两者含义。
- **补攻略视觉内容时不得伪造游戏截图**：优先用真实可核验截图；没有真实素材时，可基于现有数据和编辑规则制作 HTML/CSS 代码原生解释图，并为五语页面增加内容完整性 e2e。
- **最终回归的 prebuild 会反复刷新 `_meta.json.generatedAt`**：若数据、`upstreamVersion`、`upstreamCommit` 与配置值都没变化，最终 amend 前应移除仅时间戳变化的噪声；不要手改生成 JSON，使用针对该文件的已知基线恢复，并确认首次有效 extract 的 commit/版本元数据仍保留。
