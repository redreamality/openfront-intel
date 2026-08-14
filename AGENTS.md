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
- **PowerShell 下把含 `^{commit}`、`^{tree}` 等花括号的 Git revision 传给原生命令时必须整体加引号**：未加引号的 `71a3bdf^{commit}` 会被 PowerShell 当成 ScriptBlock，报 `ScriptBlock should only be specified as a value of the Command parameter`；应写成 `'71a3bdf^{commit}'`。
- **调用仓库级 `gh api` / `gh run` 前先从 `git remote get-url origin` 解析真实 owner/repo，不要凭账号或目录名猜测**：猜错仓库会得到误导性的 404；同时 `gh repo view --json` 字段受当前 CLI 版本限制，Pages 状态优先用真实仓库名调用 `/repos/{owner}/{repo}/pages`，不要假设字段一定存在。
- **PowerShell 的 `foreach (...) { ... }` 结果不要在同一语句末尾直接接管道**：` } | Format-Table` 会报 `An empty pipe element is not allowed`，本项目审计中已多次复现；一律先赋给 `$results = foreach (...) { ... }`，再单独执行 `$results | Format-Table`。
- **临时 Node 调试脚本不要假设项目根目录存在可直接导入的 `node_modules/playwright` 或 `node_modules/playwright-core`**：pnpm 可能只在 `node_modules/.pnpm/` 中保存真实包目录；优先从项目已安装的 `@playwright/test` 导入浏览器能力，或先用 `pnpm why playwright` / `require.resolve()` 确认解析路径。
- **用 `shell_command` 跑完整 `pnpm build` 等长任务时不要设置秒级 `timeout_ms`**：该接口会在超时后终止进程，而不是保证返回可继续轮询的会话；生产构建至少预留 120 秒，并以最终退出码和 `dist` 产物为准。
- **`git push` 使用低速保护时也可能报 `Operation too slow. Less than 1000 bytes/sec transferred`**：这与连接重置同属 GitHub HTTPS 瞬时链路问题；失败后先用 GitHub API 核对目标 ref，确认远端仍为旧 SHA 才以相同低速参数重试一次，避免服务端已接收却重复推送。
- **完整 Playwright 并行套件若阅读进度用例只表现为 `data-progress` 始终为 `0`，先排查首批 worker 的资源竞争/滚动帧调度**：`ReadingProgress` 用 `requestAnimationFrame` 合并滚动更新，并发长页面可能被 headless Chromium 后台节流。先用正斜杠路径执行 `pnpm test:e2e e2e/article-engagement.spec.ts --workers=1`；若单线程全过，不要改业务组件，应把这组依赖帧调度的断言放进 `test.describe.configure({ mode: 'serial' })`，再跑完整套件。
- **PowerShell 审计可选产物目录时不要把存在与不存在的多个路径一次性交给 `Get-ChildItem`**：即使使用 `-ErrorAction SilentlyContinue`，缺失的 `playwright-report/` 等路径仍可能让命令以退出码 1 结束。先对每个候选路径执行 `Test-Path`，只对存在的目录调用 `Get-ChildItem`。
- **脏工作树中不要用 `git update-index --refresh -- <单文件>` 试图消除单文件的假修改状态**：该命令仍会检查并报告其他所有已修改跟踪文件，以 `needs update` 和退出码 1 结束。生成文件若只有时间戳/换行噪声，应先用普通 diff 与适当的 `core.autocrlf` 审计确认无语义差异，再按已知基线精确恢复目标文件。
- **gopass 的 `cloudflare` 条目当前是 Bearer API Token，不是 Global API Key**：使用 `/user/tokens/verify` 可能返回 401，改成 `X-Auth-Email` / `X-Auth-Key` 会返回 400；不要据此反复切换认证格式。对实际目标端点直接使用 `Authorization: Bearer <token>` 做最小权限探测。
- **Cloudflare Token 能读取 Workers 与 DNS 不代表具备 Hyperdrive/R2 权限**：当前 token 访问 Hyperdrive 和 R2 API 会返回 `code 10000 Authentication error`。部署前分别探测 `/accounts/{id}/hyperdrive/configs` 与 `/accounts/{id}/r2/buckets`；缺权限时应先扩展 token 权限，不能把认证失败误判为资源尚未开通。
- **并行执行多个只读探测时不要让 `Promise.all` 直接承接可能以 1 表示“零匹配”的 `rg`**：任一零匹配会让整个编排被判失败，其他结果也无法回传。先在每条 PowerShell 命令里把 `rg` 的退出码 1 显式转换为正常审计结果，或使用能保留各子任务结果的 settled 模式。
- **`apply_patch` 的上下文即使只差一个空格也会导致整份多文件补丁回滚**：复制长行作为锚点后要逐字核对；新文件和既有文件修改应拆成小补丁，避免附带更新的上下文错误阻止主要产物写入。
- **Neon CLI 的浏览器授权不要依赖默认 60 秒命令超时**：交互登录应在用户可见的 PowerShell 中运行并预留足够时间完成浏览器确认；超时退出不等同于账号或授权本身失败。
- **Neon CLI 调用项目命令时显式传 `--org-id`**：省略组织会打开交互式组织选择，自动化环境中可能未创建任何资源却仍以退出码 0 结束；必须再用项目列表或 API 核对结果。
- **需要解析 Neon CLI JSON 时要隔离交互提示和日志**：先固定组织与非交互参数，再校验输出确实是 JSON；不要让组织选择、认证提示或状态日志污染后直接交给 JSON 解析器。
- **Neon CLI 帮助中列出的区域不代表当前组织实际可用**：创建项目前以 API 返回的 `available_regions` 为准；例如 CLI 展示 Azure 区域，但组织仅开放 AWS 时，创建仍会被服务端拒绝。
- **当前会话没有暴露某项 skill 时，不要沿用旧会话的缓存路径强行读取**：以本轮 `Available skills` 为准；缺失的 browser 等 skill 应改用当前可用工具或明确说明能力缺口。
- **Feedlog v0.4.0 在 pnpm 严格依赖布局下缺少直接的 `@nuxt/kit` 声明**：其 `nuxt.config.ts` 顶层 `import { createResolver } from '@nuxt/kit'` 会让 `pnpm install` 的 `nuxt prepare` 报 `Cannot find module '@nuxt/kit'`。部署该版本时先添加与 Nuxt 匹配的精确 `@nuxt/kit` devDependency，再更新锁文件和构建。
- **`neonctl connection-string --output json` 仍可能返回裸 `postgresql://...` 文本**：不要无条件交给 `ConvertFrom-Json`；先检查输出是否以 `postgres` 开头，只有确实是 JSON 时才解析对象或字符串格式，否则会报 `Invalid JSON primitive: postgresql`。
- **从非交互 shell 用 `Start-Process powershell.exe -Wait` 启动 gopass 解锁窗口不保证用户能看到或操作**：子进程可能一直等待 pinentry/`Read-Host` 直到外层超时。连续解密失败时让用户在自己的可见 PowerShell 中执行输出重定向到 `$null` 的 `gopass show -o` 来预热 gpg-agent，再继续自动化。
- **不要假设 Wrangler 会继承之前通过环境变量使用的 Cloudflare Token**：`CLOUDFLARE_API_TOKEN` 是进程级变量，后续新命令执行 `wrangler whoami` 仍会报 `Not logged in`。每次 Cloudflare 操作都要在同一 PowerShell 调用内从 gopass 注入 Token，或先完成持久化 OAuth 登录。
- **PowerShell `Invoke-RestMethod` 调 Cloudflare API 偶尔会报 `The underlying connection was closed`**：将其视为瞬时 TLS/网络故障，改用 Wrangler 或 `curl.exe` 重试一次；重试创建资源前先重新列出远端状态，防止第一次请求其实已成功。
- **Windows PowerShell 把原生命令 stderr 合并进变量时，`$ErrorActionPreference='Stop'` 可能把 pnpm 进度行升级成 `NativeCommandError`**：外层脚本会提前终止，但子命令可能已经完成外部写入。运行 `pnpm dlx`/Wrangler 时用 `Continue` 并检查 `$LASTEXITCODE`；遇异常后先查询远端资源再重试。
- **Windows `curl.exe` 若报 `CRYPT_E_REVOCATION_OFFLINE`，是 Schannel 无法联网检查证书吊销状态**：对已知 HTTPS 服务的诊断请求加 `--ssl-no-revoke` 再试；批量网络探测使用 settled 模式保留其他地址的结果，不要让一个 TLS 失败丢掉全部输出。
- **用 `functions.exec` 并行编排多个 `shell_command` 时，单个命令的 `timeout_ms` 不会自动延长外层默认执行窗口**：只要其中有网络请求或多文件读取，就应在脚本首行设置足够的 `// @exec: {"yield_time_ms": ...}`，或拆成较小调用；否则外层可能先在 10 秒超时，造成所有子检查看似一起失败。
- **审计 `.cache` 时不要无边界 `Get-ChildItem -Recurse`**：缓存目录可能包含完整项目、构建产物和 `node_modules`，递归枚举会产生巨量输出并超时。优先 `Test-Path` 后只读取明确目标（如 `.cache/gsc`），确需递归时显式排除依赖与构建目录。
- **GitHub Release 的 `codeload.github.com` 压缩包下载若 TLS handshake timeout，不要循环重试整包**：改用 `gh api` 查询目标 tag 的递归 tree，再只读取任务需要的 content/blob；既减少传输量，也能保留来源 commit 与文件路径证据。
- **PowerShell 一段脚本里调用 `gh`、`git`、`pnpm` 等原生命令后，应立即保存并检查 `$LASTEXITCODE`**：后续成功命令会覆盖退出码，导致前面的网络或 CLI 失败最终显示为 exit 0；需要继续收集其他结果时，把各命令退出码分别存入任务专用变量并在结尾统一判定。
- **`git push` 若报 `OpenSSL SSL_connect: SSL_ERROR_SYSCALL`，按 GitHub HTTPS 瞬时断流处理**：先用 `gh api repos/<owner>/<repo>/git/ref/heads/<branch>` 核对远端 ref；远端 SHA 已更新则视为成功，分支不存在或仍为旧 SHA 时才使用相同低速保护参数重试一次，连续失败则停止。
- **2026-08-01 复发：Windows `rg` 的路径参数绝不含 `*`，即使通配目标看似简单**：`src/pages/*/mechanics`、`src/content/guides/*/first-match.mdx` 都会触发 `os error 123`；固定从 `src/pages`、`src/content/guides` 等真实目录根搜索，并把筛选写进 `--glob`。
- **2026-08-01 复发：并行审计中的每一条 `rg` 都要单独归一化退出码 1**：不要只包装部分子命令；任何遗漏的零匹配都会让 `Promise.all` 整体失败并吞掉其他结果。每条命令都应保存 `$LASTEXITCODE`，把 1 转成明确的 `NO_MATCH` 成功输出。
- **2026-08-01 复发：PowerShell 中所有含 `^{tree}` / `^{commit}` 的 Git revision 都必须从一开始整体单引号包裹**：包括 `HEAD^{tree}` 和 `origin/main^{tree}`；不要等报错后再补引号，否则 PowerShell 可能插入 `-encodedCommand` 并产生误导性的 Git revision 错误。
- **2026-08-01 复发：`git push` 命中 `Operation too slow` 后不要立即重复**：先用真实 owner/repo 的 Git ref API 查询完整分支路径；本轮确认远端分支不存在后才允许按相同低速参数重试一次。核对脚本本身应以 0 正常返回状态文本，不要用人为非零退出码表达“需要重试”。
- **2026-08-01 复发：`git fetch` 低速超时且两次 `git push` 均无法连接 `github.com:443` 后，不要继续循环 Git HTTPS**：先用 GitHub API 确认远端 `main`、目标 ref 和本地 merge-base；基线一致且远端 ref 不存在时，可用 Git Data API 按本地提交顺序上传 blob/tree/commit 并创建 ref，创建后再逐一核对提交 SHA，避免网络故障阻塞 PR 交付。
- **Windows PowerShell 的 `[pscustomobject]@{ key = ... }` 属性值里不要直接写 `(if (...) { ... })`**：Windows PowerShell 5 会把 `if` 当作命令并报 `The term 'if' is not recognized`。先把条件结果赋给中间变量，或使用 `$()` 子表达式，再写入对象属性。
- **多语内容完整性审计不要给中文与拉丁语种套同一个字符长度门槛**：中文信息密度更高，统一阈值会制造假失败。按语种设置最小值，并继续单独校验版本号、必备事实和非空摘要。
- **跨 Git worktree 修改同名文件时，不能复用另一工作树的 `apply_patch` 尾部上下文**：不同分支的 `AGENTS.md` 等文件可能已分叉。分别读取各目标文件的精确尾部并拆成独立补丁，避免一个 worktree 的上下文不匹配导致整份多文件补丁回滚。
- **2026-08-02 复发：PowerShell 的 `foreach (...) { ... }` 输出绝不能在同一语句后直接接管道**：` } | ConvertTo-Json` 与 ` } | Format-Table` 都会报 `An empty pipe element is not allowed`。先写 `$results = foreach (...) { ... }`，下一条语句再处理 `$results`。
- **Git Data API 创建 commit 时不要要求远端 commit SHA 必须等于本地 SHA**：GitHub 可能规范化提交元数据，即使 tree 与父节点完全一致也会产生不同 SHA。应严格核对远端 commit 的 `tree.sha` 与本地 tree、首个 parent 与已确认基线一致，再使用 API 返回的 commit SHA 创建 ref，并在创建后复核远端 ref；不要因 SHA 不同在 ref 写入前中止。
- **`gh api` 若报 `read tcp ... wsarecv: An established connection was aborted`，按瞬时 GitHub API 断流处理**：并行探测中可能只有部分端点失败、另一些已经成功；必须保留每个端点的独立退出码，只对失败端点重试一次，不重复成功查询，也不能把连接中断解释为 PR、Release 或 Issue 状态变化。
- **e2e 已限定到某个 section 后，后代 `h2` 仍可能命中嵌套组件标题**：例如数值参考区内还包含来源面板，`[data-home-reference] h2` 会触发 strict-mode。断言区块自身标题时使用 `getByRole('heading', { level: 2, name, exact: true })` 或 `:scope > h2`，不要假设 section 内只有一个同级标题。
- **完整 Playwright 的 `browserContext.newPage` 资源争用在 `--workers=2` 下也可能换一批用例复发**：失败仍发生在 fixture 建页、且单线程定向用例通过时，不要继续试不同的中间并发；直接用 `pnpm test:e2e --workers=1` 做最终全套，避免反复生成随机三项超时。
- **2026-08-04 复发：PowerShell 的 `foreach (...) { ... }` 结果不能在同一语句末尾直接接管道**：即使只是汇总只读 JSON，`} | ConvertTo-Json` 也会在命令执行前报 `An empty pipe element is not allowed`。始终先赋给任务专用变量，再在下一条语句处理。
- **并行 `gh api` 探测遇到 TLS 超时时要保留每个端点的独立结果**：不要让一个失败请求中止整批并继续解析空对象；使用 settled 模式、逐项检查退出码，只对失败端点重试一次。
- **`git pull` 的外层超时不等于远端更新没有落地**：超时或终止后先核验仓库 `HEAD`、`origin/main` 与工作树状态；本轮 pull 已实际快进到新提交，若按旧 HEAD 继续会把有效 extract checkout 写错。
- **拉取上游后不要假设正式 Release tag 已同时取得**：先用 `git tag -l '<tag>'` 确认本地存在，再运行带 `^{commit}` 的 `rev-parse`；tag 缺失时使用 Release API 与当前 checkout 分别记录来源，不要把 checkout 冒充 tag 提交。
- **GitHub Discussions 未启用时，GraphQL / REST 查询会返回 410，不代表网络或权限异常**：先检查仓库是否启用 Discussions；未启用就记录“无此信号源”，不要反复重试或把 410 误报为内容阻塞。
- **PowerShell 做路径规范化时不要使用未正确转义的 `-replace '\'`**：反斜杠在正则中是转义符，表达式会报 `Invalid pattern`；优先调用字符串 `.Replace('\', '/')`，或使用正确转义的正则 `'\\'`。
- **Doomsday 配置不在假定的 `GameConfig.ts`**：模式 schema 位于上游 `src/core/Schemas.ts`，警告与损耗默认值位于 `src/core/configuration/Config.ts`；核验前先用 `rg --files` 和源码搜索确认真实路径，不要按旧文件名猜测。
- **2026-08-04 再次复发：Windows 下不要把 `src/content/guides/*/doomsday-clock.mdx` 这类通配路径直接传给 `rg`**：PowerShell 不会按预期展开，`rg` 会收到非法文件名并报 `os error 123`；固定从真实目录根搜索，并用 `--glob 'doomsday-clock.mdx'` 限定文件。
- **研究 Markdown 不要用行尾两个空格制造硬换行**：`git diff --check` 会把它视为 trailing whitespace 并失败；使用空行、列表内完整句子或显式结构分隔，并确保文件只保留一个结尾换行、不多出空白 EOF 行。
- **生成 JSON 只有换行或 stat 漂移时，完整执行 `git update-index --refresh` 也可能逐个报 `needs update` 并退出 1**：先用 `git diff --quiet -- <精确文件列表>` 确认无语义差异，再对这些精确文件执行 `git add -- ...` 刷新索引状态，并确认没有产生 staged diff；不要把 refresh 失败误判成数据变化。
- **扩写五语文章时不要假设各语种段落锚点逐字对应**：同一事实的译文句式可能不同，跨语种复用 `apply_patch` 上下文会失败；每个语种插入前分别读取目标标题附近的精确文本，再用短锚点分开补丁。
- **2026-08-05 复发：PowerShell 路径规范化不要写 `-replace '\'`**：`-replace` 的第一个参数是正则，单个反斜杠会触发 `InvalidRegularExpression`；不需要正则时统一用 `$path.Replace('\', '/')`，需要正则时写 `-replace '\\', '/'`。
- **同一轮里 `gh pr view` 成功不代表后续 GitHub API 调用不会瞬断**：本环境可能先出现 `gh api ... TLS handshake timeout`，随后 GraphQL `EOF`，而 `git fetch origin` 仍可成功。远端核验优先保留每一步独立结果；API/GraphQL 瞬断只重试一次，必要时改用 REST `gh api repos/<owner>/<repo>/pulls/<number>` 或已成功的 `git fetch` + 远端 ref 交叉确认，不要把单个端点失败误判为 PR 未合并或 main 未更新。
- **在 linked worktree 中运行 `gh pr merge --delete-branch` 可能已完成远端合并，却因本地 `main` 被另一个 worktree 占用而以退出码 1 结束**：看到 `fatal: 'main' is already used by worktree` 时先用 REST 核对 PR 的 `merged`、`merge_commit_sha` 与远端 main；确认已合并后不要重跑 merge，只通过 GitHub ref API 删除已核准的远端主题分支，本地 worktree/分支另行清理。该规则仅用于仍存在的手动/历史 linked worktree；`openfront` 定时任务不再创建或使用 worktree。
- **`openfront` 定时任务只在项目目录的本地分支中执行**：启动时使用 `git status --porcelain --untracked-files=all`；只允许未跟踪的 `.cache/**` 本地缓存存在，并且绝不能 stage、commit、删除或顺带改写与本轮无关的缓存。出现任何已修改/暂存文件，或 `.cache/**` 以外的未跟踪文件时停止并报告，禁止自动 stash/reset/clean；门禁通过后切到并 fast-forward-only 同步 `main`，再从 main 创建 `codex/daily-content-YYYY-MM-DD-<topic>`。PR 经 REST squash 合入并核对远端后，必须在同一目录切回并同步 `main`；未回到最新干净 main 前不得开始下一个任务。
- **2026-08-06 再次复发：Windows 下不要把 `src/data/legal.*.ts` 等通配符作为 `rg` 的路径参数**：这会被当成非法文件名并以退出码 2 失败；应从真实目录根（如 `src`）搜索，并用 `--glob 'legal.*.ts'` 限定文件，零匹配时只把退出码 1 解释为正常审计结果。
- **临时 worktree 安装依赖后，`git worktree remove --force` 可能已注销 worktree、却因忽略的 `node_modules` 等残留目录非空而返回失败**：先用 `git worktree list` 确认已注销，再校验残留路径确实位于 `%TEMP%` 且名称匹配；若命令安全策略仍阻止 `Remove-Item -Recurse -Force`，不要改用其他 shell 绕过或扩大删除范围，保留精确路径并报告人工清理。
- **`gh pr checks` 在 PR 没有配置任何检查时会输出 `no checks reported` 并返回退出码 1**：先用 `gh pr view --json mergeable,mergeStateStatus,statusCheckRollup` 区分“无检查”与“检查失败”；`statusCheckRollup` 为空且 PR 为 `CLEAN / MERGEABLE` 时，不要把退出码 1 误判为 CI 阻塞。
- **Astro 内容集合配置位于 `src/content/config.ts`，不是 `src/content.config.ts`**：读取 schema 前先用 `rg --files | Select-String 'content.*config'` 确认真正路径，不要沿用其他 Astro 项目的目录布局假设。
- **PowerShell 中使用 `stash@{0}`、`stash@{1}` 等 Git stash 引用时必须整体加引号**：未加引号的 `git stash pop stash@{0}` 会被 PowerShell 拆解并让 Git 报 `unknown switch`；统一写成 `git stash pop 'stash@{0}'`。
- **自动化环境中 `$CODEX_HOME` 可能未设置**：读取自动化记忆前先检测变量；缺失时使用当前用户已知的 `.codex` 目录（本机为 `C:\\Users\\Remy\\.codex`），不要把空变量直接拼进路径。
- **PowerShell 下不要把 `git diff` 的原生输出直接管道给 `git apply`**：原生命令管道的编码和换行可能破坏补丁。优先使用 `apply_patch`；确需传递补丁时先写成 UTF-8 无 BOM 文件并检查内容，再执行 `git apply <path>`。
- **Windows 下消费 `rg --files` 输出时先把反斜杠规范化为正斜杠**：后续若按 POSIX 路径比较、构造 URL 或作为正则过滤器，直接使用 `\\` 会导致漏匹配或意外转义。
- **调用 GitHub Contents API 时不要预先把路径中的 `/` 编码为 `%2F`**：API 路由需要保留目录分隔符；只对各路径段中的特殊字符编码，否则会得到误导性的 404。
- **Windows PowerShell 5 的 `Get-Date` 不支持 `-AsUTC`**：统一使用 `(Get-Date).ToUniversalTime()`，再按需要调用 `ToString(...)`，避免参数不存在导致脚本中断。
- **`pnpm check:links` 只审计已有的 `dist/`，不会自动构建**：新工作树或清理产物后必须先运行 `pnpm build`，否则会以 `dist/ does not exist` 退出；不要把它误判为链接内容失败。
- **独立 Git worktree 不会自动共享主工作树的 `node_modules`**：若 `pnpm build` 报 `'astro' is not recognized` 且提示本地 `node_modules` 缺失，先在该 worktree 设置 `CI=true` 并执行 `pnpm install --frozen-lockfile`，再运行构建与 Playwright。
- **多语 e2e 核验严格数值边界时要允许该语种的明确同义比较词**：例如德语 `< 50` 可写 `weniger als 50` 或 `unter 50`；用本地化正则枚举等价表达，同时保留数字和“小于”语义，不要为满足单一字面断言改坏自然正文。
- **独立 Git worktree 不会带入原工作树未跟踪的 `.cache` 文件**：需要读取 GSC 或研究报告时先确认它实际位于哪个工作树；不要根据前一步相对路径假设缓存已复制。
- **审计 MIRV/SAM 旧错误时必须区分“载体免疫”与“弹头免疫”**：载体免疫是正确规则；负向搜索应锁定 `warhead/弹头/ogive/Sprengkopf/kernkop` 与免疫或不可拦截的组合，不能用会跨字段吞到 `carrier immune` 的宽泛正则。
- **`pnpm content:audit -- --strict` 的 240 字符限制按空行分隔的 Markdown 段落块计算**：仅插入软换行不会缩短审计段落；新增五语核心内容后若 `>240` 失败，应在自然句界处加入真正的空行拆段，并保留完整事实与断言。
- **PowerShell 不要在类型转换或布尔表达式的括号里混入原生命令和分号**：例如 `[bool](git cat-file ...; $LASTEXITCODE -eq 0)` 会在解析阶段报 `Missing closing ')'`。先单独执行原生命令并保存 `$LASTEXITCODE`，再在下一条语句计算布尔值。
- **受限沙箱里 `gh` 可能先因无法读取 `%APPDATA%\GitHub CLI\config.yml` 报 Access denied**：需要 GitHub 查询时按工具要求申请提升后重试；若提升后对 `api.github.com` 连续两次 `TLS handshake timeout`，立即停止，不把网络失败解释为“没有 Release / Issue / PR”，改为记录未确认状态并等待下一轮刷新。
- **读取同级目录的上游 Git clone 时，每个 `git -C` 子命令都要显式带单次 `-c safe.directory='C:/absolute/path'`**：沙箱用户会触发 `detected dubious ownership`；不要修改全局 safe.directory，也不要只给脚本中的第一条 Git 命令加覆盖。
- **主工作树落后远端且存在独立最新 worktree 时，不要默认新合并文件在当前目录可读**：先用 `git status --branch`、`git worktree list` 和 `git ls-tree origin/main` 确认文件属于哪个基线，再从对应 worktree 读取；否则会把“当前 main 尚未包含”误报成路径不存在。
- **纯 Node 审计脚本不要在无 TTY 环境里盲目经 `pnpm <script>` 启动**：Codex 的 pnpm 运行时可能先触发隐式安装/清理并报 `ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY`。确认脚本不依赖 pnpm 注入后，直接运行 `node scripts/<audit>.mjs --strict`，避免触碰现有 `node_modules`。
- **受限沙箱中普通 `git diff --check` 偶尔会把现有工作区误报为 `Not a git repository`**：先用 `git -c safe.directory='C:/absolute/workspace/path' diff --check` 单次复跑；成功后按所有权/沙箱识别问题处理，不要修改全局 Git 配置。
- **向长 Markdown 账本同时补章节和表格行时不要把整条历史表格行塞进同一份多位置补丁**：表格措辞只差一个词就会使 `apply_patch` 整体回滚。本轮把“回到 main”误作实际的“切回并同步 main”而匹配失败；应先读取精确尾行，再把日期、章节、清单和表格拆成独立短补丁。
- **`git push` 若连续报 `Failed to connect to github.com port 443 ... Couldn't connect to server`，不得把已创建 PR 的旧远端 head 当作最新交付**：首次失败后用 GitHub ref API 对比远端与本地 SHA；远端仍旧时只重试一次，第二次仍失败就保留 PR 和本地 ahead 提交、记录 head 不一致并停止自动合并，不再第三次重试。
- **MDX 渲染会把部分直撇号转换成弯引号**：Playwright 对法语 `d'abord` 等带撇号整句做 `toContainText` 精确字符串断言时，源码 ASCII 撇号可能渲染为 `d’abord` 而失败。优先断言不跨撇号的稳定语义片段，仍保留关键事实保护。
- **重分配相邻页面职责时同步更新既有内容完整性断言**：若完整按键表从攻略迁到速查页，旧测试可能仍锁定原表格中的斜杠、大小写或精确文案。应把断言迁到新的事实承载位置并补“表格数量/互链”合同，不能删除有效事实断言或为旧测试保留重复内容。
- **自动化包装运行 `pnpm gsc:queries -- --days ...` 若长时间无日志且目标文件未刷新，不能视为成功**：约 30 秒后先核对输出文件的 `generatedAt`；仍未变化时停止该进程，并在同一环境直接运行 `node scripts/fetch-search-console.mjs --days <n> --output <path>`，检查退出码与 JSON 数组后再继续。代理/SSL 失败仍只重试一次。
- **PowerShell 统计 `gh ... --json` 空数组时先过滤 `$null`**：`ConvertFrom-Json` 的空结果在某些包装中会形成一个 `$null`，直接 `@($value).Count` 会把 0 错报为 1。统一用 `@($value | Where-Object { $_ }).Count`，并保留原始 `[]` 作为核验依据。
- **自动化沙箱若无法在 `.git` 创建 `index.lock`，不要继续同步或内容生产**：即使当前分支已是 `main`，`git switch main` 也可能因 `.git` 仅可读而报 `Permission denied`。这不是 GitHub 瞬断，禁止网络重试或绕到 worktree/副本；应停止本轮，并让自动化配置授予项目 `.git` 写权限后再运行。
- **自动化不得被自己追加的避坑规则永久阻塞**：阻塞运行若按会话要求修改了 `AGENTS.md`，必须在 automation memory 记录完整来源和精确差异，并在权限恢复后优先通过独立治理分支收口。下轮门禁仅当“唯一 tracked 改动是 `AGENTS.md`、无 staged/非缓存未跟踪项、且最新 memory 能逐字证明该差异由紧邻上轮自动化写入”时进入恢复专用流程；该流程只能提交这一个文件，禁止顺带生产内容。任一条件不符仍立即停止，绝不猜测或覆盖用户改动。
- **运行内容审计前先用 `rg --files scripts` 核对真实脚本名**：本项目的实现是 `scripts/audit-core-content.mjs`，不存在 `scripts/content-audit.mjs`。不要根据 npm script 名 `content:audit` 猜文件路径；优先运行 `pnpm content:audit -- --strict`，或在需要绕开 pnpm 时直接运行已确认的真实 Node 脚本。
- **Windows 下经 pnpm 脚本向 Playwright 传 `--grep` 时不要使用含 `|` 的正则**：即使 PowerShell 外层写了单引号，pnpm 的 `.cmd` 转发仍可能让 `cmd.exe` 把 `|` 当管道，并报后半段“不是内部或外部命令”。改为直接传目标 spec，或分别用不含管道的单个 `--grep=<词>` 运行。
- **给 `rg` 传多个搜索根前先确认每个目录真实存在**：把猜测的 `src/lib` 与有效目录一起传入会让 `rg` 即使找到匹配仍以路径错误退出 2。先用 `rg --files src` 或逐个 `Test-Path` 枚举真实根，再组合搜索；不要把部分输出误当成整条审计成功。
- **Astro content collection schema 位于 `src/content/config.ts`，不是 `src/content.config.ts`**：审计 schema 或 SEO 字段前先用 `rg --files src/content` 确认真实路径；不要把猜错的旧式路径与有效搜索根一起交给 `rg`，否则会以路径错误退出 2。
- **核心内容严格审计会把超过 240 字符的单个段落记为失败**：新增法语、德语、荷兰语等长句时，把规则边界、导流和页面职责拆成自然的多个短段；不要为了通过审计删除事实或缩成含义不完整的一句。
- **Playwright 若在测试启动前报 `Timed out waiting 180000ms from config.webServer`，先查项目端口与 Node 命令行**：端口有本项目遗留 preview 时只结束精确核验的遗留进程；端口无监听但另一个仓库正在高负载 lint/build 时，不得终止无关进程，可用新的 `PLAYWRIGHT_PORT` 单次重跑并继续核对最终退出码。
- **PowerShell 下调用 `gh api graphql` 时不要在查询正文里内嵌仓库名等双引号字符串**：原生命令参数序列化可能剥掉引号，把 `openfront-intel` 解析成减法并报 `Expected type 'number'`。查询统一声明 `$owner`、`$name`、`$number` 变量，再用 `-F owner=... -F name=... -F number=...` 传值。
- **REST merge 成功后只读 `gh api` 若瞬时返回 EOF，不得重放 merge**：先用 merge 响应的 `merged=true` 与 PR `state=MERGED` 确认写入结果，再只重试失败的 ref GET 一次；远端 main SHA 符合 merge commit 后才删除精确主题分支。
- **`gh pr view --json` 走 GraphQL，可能在相邻 API 成功时单独 TLS handshake timeout**：只重试一次；仍失败时改用 REST 的 pull、head ref、check-runs/status 与 GraphQL 变量化 reviewThreads 分项完成门禁，不得把一次读取超时写成 PR 冲突或 checks 失败。
- **GitHub REST 的 commit check-runs/status 门禁使用完整 40 位 SHA**：不要把日志里的 7–8 位短 SHA直接拼进 `/commits/{ref}/check-runs` 或 `/commits/{ref}/status`；当前 API 可能分别返回 422 `No commit found` 与 404 `Ref not found`。先从远端 head ref 读取完整 SHA，再查询并核对 `total_count`。
- **完整 Git SHA 也不得从日志手工转录到后续 API 命令**：单字符抄错仍会让 check-runs 返回 422，且肉眼不易发现。应在同一 PowerShell 调用内把远端 ref 结果保存到任务专用变量，检查上一条命令退出码后直接插值给 checks/status URL。
- **远端 ref DELETE 成功后，matching-refs 复核若 TLS handshake timeout，不要重复删除**：保留已成功 DELETE 的证据，只重试只读 matching-refs 一次；返回空数组即可确认收口，连续失败则报告“删除已受理、复核受阻”，不得把读超时写成分支仍存在。
- **核心页更新 `freshnessSummary` 后必须同步内容 e2e 的摘要事实映射**：正文仍保留旧事实不代表顶部摘要还应断言旧关键词；`e2e/content-integrity.spec.ts` 应锁定当前版本最重要变化，并另用正文级断言保护未改变的历史事实，避免把正确的新鲜度更新误报成回归。
- **正式版本响应必须全局审计 `e2e/` 中旧正式版本的精确字面值**：不能只更新版本总览或 `content-integrity.spec.ts`；入口、发现性和专题 spec 也可能仍断言上一版（如 Water Nukes discovery 的 `v33.2`），导致页面已正确刷新但完整回归失败。提交前从 `e2e` 真实目录检索旧版本并逐条判断是否应保留历史语境。
- **新建 Markdown 文件结尾只保留一个终止换行**：正文后再留空白行会让 `git diff --cached --check` 报 `new blank line at EOF` 并返回 1；暂存后仍要跑该检查，发现时删除额外空行再提交。
- **不要从 automation memory 直接沿用上轮的进程级 Git 代理地址**：`127.0.0.1:15236` 等本地代理端口可能只在上轮临时监听；fetch 前先探测该端口，未监听就直接使用带低速保护的直连，避免把 `Failed to connect to 127.0.0.1` 误判为 GitHub 断流并浪费唯一重试。
- **读取 Codex automation 配置前不要假设 `$env:CODEX_HOME` 一定存在**：先检查环境变量；未注入时使用已确认的用户配置目录（通常为 `$env:USERPROFILE/.codex`），或直接通过 automation API 查看配置，避免 `Join-Path` 因空路径失败。
- **已逐文件证明为 stat-only 的 `M` 仍会让 `git rebase` 以 `You have unstaged changes` 拒绝执行**：fetch 后若 `origin/main` 未变化，并且 `git merge-base --is-ancestor origin/main HEAD` 与 `git rev-parse HEAD^` 均证明当前唯一提交直接基于最新 main，则不要为形式上的 rebase 改写这些文件或索引；记录拓扑证明后继续。若 main 已变化，则停止并等待工作树可安全恢复，不能绕过 rebase 门禁。
- **PowerShell 双引号插值中变量后紧跟 `?` 时也要用 `${name}` 明确边界**：例如 GitHub Contents API 应写 `"repos/.../contents/${path}?ref=v0.33.4"`；`"$path?ref=..."` 会把 `?ref` 吞进变量名并请求错误路径，表现为一组误导性的 HTTP 404。
- **PowerShell 的 `foreach` 语法中关键字与变量之间必须保留空格**：统一写成 `foreach ($file in $files) { ... }`；`foreach($file in$files)` 会把 `in$files` 解析失败并在执行前报 `Missing 'in' after variable in foreach loop`。
- **带显式 refspec 的 `git fetch origin main <topic> --prune` 不会保证清除其他已删除分支的 remote-tracking ref**：GitHub ref 删除并复核为 0 后，若还要断言本地 `origin/<topic>` 不存在，应运行不限定 refspec 的 `git fetch --prune origin` 或 `git remote prune origin`，再做本地引用检查；不要把陈旧 remote-tracking ref 误报为远端分支仍存在。
- **Windows PowerShell 5 不支持 `Get-Date -AsUTC`**：该参数会报 `ParameterNotFound`；需要 UTC ISO 时间时使用 `(Get-Date).ToUniversalTime().ToString('o')`，不要沿用 PowerShell 7 的参数写法。
- **`Select-String` 可能返回多个 MatchInfo，不能直接把 `.LineNumber` 当标量做算术**：先用 `$matches = @(...)` 收集，再以 `[int]$matches[0].LineNumber` 选择目标；否则 `$matches.LineNumber - 2` 会因 `Object[]` 没有 `op_Subtraction` 而失败。
- **多语浏览器断言要以渲染后的排版字符为准**：Astro 的 Markdown 排版可能把法语源码中的直撇号 `'` 转成 `’`；Playwright 的 `toContainText()` 读取的是渲染文本，新增精确断言前先核对浏览器输出，避免把正确内容误报为回归。
- **PowerShell 经 pnpm 传递 Playwright `--grep` 时不要用反斜杠转义标题里的方括号**：`Water Nukes\\[fr\\]` 可能以双反斜杠到达 Playwright 并导致 `No tests found`；改用不含方括号的稳定标题子串，或用 `Water Nukes.*fr.*` 这类无需反斜杠的正则。
- **PowerShell 调原生命令时，含查询串 `&` 的 URL 必须整体单引号包裹**：例如 `gh api 'repos/owner/repo/issues?state=open&per_page=100'`；未引用的 `&` 会被 PowerShell 当运算符，在命令执行前直接解析失败。
- **命令工具超时终止外层 `pnpm` 不保证回收 Node/Python 子进程**：GSC 等长请求超时后先用 `Get-CimInstance Win32_Process` 核对命令行和父子链，只终止本轮精确 PID，再确认残留为 0 后重试；不要让旧请求与唯一重试同时写同一缓存。
- **按 CommandLine 清理进程时必须排除当前 PowerShell，且进程退出存在竞态**：宽泛匹配会把清理命令自身纳入并自终止；应先只读记录精确 PID，再逐个 `Stop-Process`，并把“检查后已自然退出”的 `ProcessCommandException` 视为 `ALREADY_EXITED` 后复核残留，而不是让清理脚本失败。
