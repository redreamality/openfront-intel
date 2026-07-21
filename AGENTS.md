# AGENTS.md — openfront-intel

OpenFront.io 多语种(en/zh/fr/de/nl)情报与攻略站,Astro + Tailwind 静态站点。

## 项目约定

- node 包管理用 `pnpm`。
- 游戏数据(`src/data/*.json`)由 `pnpm extract`(= `scripts/extract-game-data.mjs`，prebuild 阶段自动跑)从本地 `OpenFrontIO` clone 抽取，**不要手改**。
- 仅在首次创建仓库时默认设为 private；向已有仓库 push 时不得改变其现有 visibility，除非用户明确要求。

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
- **PR 合并前 `git fetch origin` 若以 `Recv failure: Connection was reset` 失败，使用 GitHub API 核对基线**：通过 `gh api repos/<owner>/<repo>/branches/main --jq .commit.sha` 取得远端 main SHA，并与本地 `origin/main`/PR base SHA 比较；只有 SHA 一致或 GitHub 明确判定 PR 可合并时才继续。不要把一次 fetch 失败等同于远端没有更新。
- **`git push` 报 `Recv failure: Connection was reset` 后先核对远端 ref，再决定是否重试**：用 `gh api repos/<owner>/<repo>/git/ref/heads/<branch> --jq .object.sha` 与本地 `HEAD` 比较，避免服务端其实已接收时重复操作；远端仍是旧 SHA 才使用相同低速超时参数重试一次，连续失败则停止并报告网络阻塞。
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
- **不要为普通 push 改变已有 GitHub 仓库的 visibility**：Public→Private→Public 切换会删除 GitHub Pages 站点配置，表现为自定义域名返回 GitHub Pages 404、仓库 `has_pages=false`、`GET /repos/{owner}/{repo}/pages` 返回 404，且 `configure-pages` 报 “Get Pages site failed”。恢复步骤是用 Pages API 以 `build_type=workflow` 重建站点、重新绑定 `openfront.fyi`、触发部署；workflow 的 `actions/configure-pages` 保持 `enablement: true`，并保留 `public/CNAME` 防止域名配置再次漂移。
- **PowerShell 外层双引号中不要直接嵌入含 `|` 的复杂 `rg` 正则**：转义稍有偏差时，`|` 会被 PowerShell 当成管道并把后半段当命令执行。优先把正则放进单引号，或先赋给变量再作为参数传给 `rg`。
- **`pnpm <script> -- --flag` 可能把独立的 `--` 原样传给 Node 脚本**：自有 CLI 的参数解析应容忍独立 `--`；验证时也可用 `pnpm run <script> --flag`，不要假设分隔符一定会被 pnpm 吃掉。
- **Astro 内联脚本若渲染在目标 DOM 之前，不能立即 `querySelector` 后据此自删或绑定行为**：组件放在 `<main>`/`<article>` 前时，脚本会先执行并把“尚未解析”误判为“不存在”。统一在 `DOMContentLoaded` 后初始化，或把脚本移到目标 DOM 之后；对应 e2e 必须覆盖组件实际出现和交互绑定。
- **PowerShell 变量名不区分大小写，`$home` 会与只读自动变量 `$HOME` 冲突**：HTTP 首页响应等临时变量不要命名为 `home`；使用 `$homeResponse`、`$rootPage` 等明确名称，避免 `Cannot overwrite variable HOME`。
- **不要在 PowerShell 单引号命令字符串里再直接嵌入含单引号的复杂正则/源码**：内层引号会提前结束字符串并造成解析失败。优先把正则赋给双引号变量、使用 here-string，或拆成更简单的多步命令；跨工具传递时先验证最终参数文本。
- **多语 SEO title 的长度保护不能直接回退到原始 H1，或把点击利益点一起丢掉**：长标题先去掉破折号/冒号后的副标题，再重新套用对应栏目模板；e2e 同时断言本地化利益短语和最大长度，避免“长度合格但搜索意图退化”。
- **核验机制数据前先用 `rg --files src/data` 确认可用生成文件**：项目不存在 `src/data/mechanics.json`；机制数值分布在 `formulas.json`、`structures.json`、`units.json`，机制解释则位于对应页面与上游源码。不要根据文件名猜测路径。
- **MDX frontmatter 的纯文本值只要包含冒号加空格，就必须用引号包裹**：例如法语 `description: "... trains : ..."`；否则 YAML 会把冒号后的内容解析成嵌套映射，`astro check` 报 `bad indentation of a mapping entry`。
- **PowerShell 双引号插值中变量后紧跟冒号时必须用 `${name}:`**：写成 `$line:` 会被解析为作用域变量并报 `Variable reference is not valid`。日志位置、行号等字符串统一使用 `${line}:$value` 或格式化运算符 `-f`。
- **`rg` 使用 lookahead/lookbehind 等环视正则时必须显式加 `--pcre2`**：默认 Rust regex 引擎不支持 `(?=...)`、`(?!...)`、`(?<=...)`、`(?<!...)`，会报 regex parse error。简单搜索优先不用环视，需要时再切换 PCRE2。
- **法语机制正文是 Astro 页面，不在 `src/content/mechanics/fr/`**：检索术语前先用 `rg --files src | Select-String mechanics` 确认布局；当前路径是 `src/pages/fr/mechanics/`，不要把 content collection 与页面目录混淆。
- **本环境访问 `support.google.com` 可能在浏览器和 `curl.exe` 两条链路同时超时**：做 AdSense/Publisher 政策审计时先使用短超时探测；若重复超时，不要循环重试，明确记录无法在线刷新官方正文，并使用项目内最近一次注明日期的官方来源快照，提醒申请前在可访问网络中复核。
- **长时间 `exec_command` 返回 `session_id` 时，外层工具调用结束不代表命令完成**：必须用 `write_stdin` 持续轮询到返回 `exit_code`，再检查 `dist` 等产物；不要因为首个输出块只到 `astro build` 就误判失败，也不要在前一个构建未结束时重复启动构建。
- **临时 Node 调试代码不能用 `eval()` 执行静态 `import`**：`eval` 不支持模块级静态导入；改用 `await import()`，并从项目实际安装的 `@playwright/test` 导入浏览器能力，不要假设存在可直接导入的顶层 `playwright` 包。
- **Windows PowerShell 5 所用 .NET 可能没有 `[System.IO.Path]::GetRelativePath()`**：做 `dist` 审计时先解析根目录绝对路径，再对文件绝对路径安全调用 `Substring($root.Length)`；不要依赖较新 .NET API，否则循环会逐文件报 `MethodNotFound` 且仍可能以退出码 0 结束。
- **Playwright webServer 不要复用本机通用 `localhost:4321`**：IPv4 与 IPv6 可能各被不同项目监听，测试会在错误页面、正确页面和 `ERR_CONNECTION_REFUSED` 之间漂移。使用项目专用的 `127.0.0.1` 端口（默认 4327，可用 `PLAYWRIGHT_PORT` 覆盖），并令 `reuseExistingServer: false`，确保每次测试启动自己的生产预览。
- **重写核心文章标题后要同步检查既有内容 e2e 的精确文案**：旧测试可能仍锁定扩写前的问句，导致正文事实正确但回归失败。对必须存在的概念优先断言稳定的语义短语或本地化正则，并在五语改稿完成后统一运行全套 e2e。
- **`gsc-cli` 通过 Windows 用户代理访问 Google API 时，虚拟环境必须安装 `PySocks`**：`googleapiclient` 底层 `httplib2` 在缺少该包时会静默忽略代理并直连，最终报 `WinError 10060`。用 `uv pip install --python .venv/Scripts/python.exe PySocks` 安装；桥接脚本应从 `urllib.request.getproxies()` 读取系统代理并把 `localhost` 规范为 `127.0.0.1`。
- **GSC 经本地代理偶尔会报 `SSL: UNEXPECTED_EOF_WHILE_READING`**：把它视为瞬时代理断流，只重试一次，并验证命令退出码及输出确实以 JSON 数组开头；不要让 PowerShell 后续管道把 CLI 的错误文本掩盖成退出码 0。
- **不要把大型 `git diff` 直接管道到 `Select-Object -First`**：下游达到条数后会提前关闭管道，使仍在输出的 `git diff` 遇到 broken pipe 并返回退出码 1，即使已经显示了所需内容。先把 diff 捕获到变量或文件，再对捕获结果做 `Select-String`/截断，避免制造伪失败。
- **完整 Playwright 套件若只在 `browserContext.newPage` 建页阶段超时，且没有进入页面断言，先按资源争用处理**：用 `--workers=1 --grep <用例>` 单线程复跑失败用例；目标用例通过后再重跑完整套件。不要把 fixture 建页超时误判为对应页面内容回归，也不能仅凭定向通过就跳过最终全套回归。
- **Windows 下给 Playwright CLI 传测试文件过滤器时也使用正斜杠**：`e2e\\content-integrity.spec.ts` 会作为正则处理，反斜杠可能转义后续字符并导致 `No tests found`。统一传 `e2e/content-integrity.spec.ts`，即使当前 shell 是 PowerShell。
- **命令工具名称必须以当前会话实际暴露的能力为准**：部分运行时只有 `shell_command`，调用不存在的 `exec_command` 会在命令执行前报 `TypeError: tools.exec_command is not a function`。先检查工具声明，并在本会话统一使用已暴露的命令接口，不要沿用上一轮的工具名假设。
- **`gh` 同时登录多个账号时，读操作成功不代表当前账号有仓库写权限**：对另一个账号名下仓库调用 Git Data/Contents 写 API 可能返回伪装的 404。写入前先看 `gh auth status` 的 Active account；需要临时使用仓库所有者凭据时，在单条命令内用 `$env:GH_TOKEN = gh auth token --user <owner>`，不要输出 token，也不要无故永久切换全局 active account。
- **PowerShell 下不要把 `ConvertTo-Json` 的结果直接管道给 `gh api --input -`**：旧版 PowerShell 的原生命令管道编码可能让 GitHub 返回 `Problems parsing JSON`。优先用 `gh api -f/-F` 构造字段，文件内容用 `-F 'field=@path'` 交给 CLI 读取；确需输入文件时必须显式生成 UTF-8 无 BOM。
- **Git Data API 的 `tree` 数组不要用未经验证的 `gh api -f 'tree[0][…]'` 拼装**：当前 `gh` 版本会生成 GitHub 判定为 `Invalid tree info` 的请求。需要创建 tree/commit 时，用 Node `spawnSync` 向 `gh api --input -` 传 UTF-8 `JSON.stringify` 结果，并校验返回 tree/commit SHA 后再更新 ref。
