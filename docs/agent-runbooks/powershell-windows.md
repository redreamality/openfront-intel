# PowerShell 与 Windows runbook

仅在任务涉及本主题时读取。规则从 2026-08-20 的项目级 `AGENTS.md` 逐条迁移；原始快照见 [归档](../archive/AGENTS-through-2026-08-20.md)。

来源范围：`路径与验证` 原章节。

## 规则

- i18n 工具函数位于 `src/i18n/index.ts`，项目中没有 `src/i18n/utils.ts`。读取不熟悉的模块前先用 `rg --files src/i18n` 确认真实路径，避免 PowerShell `Get-Content` 因猜错路径失败。
- **PowerShell 下不要把含多层引号或动态 `import()` 的复杂源码直接传给 `node -e`**：PowerShell/原生参数序列化可能剥掉内部双引号，使合法源码变成语法错误。优先使用项目内临时脚本；若任务只读不能写文件，则先把源码编码为 UTF-8 Base64，再用结构简单的 bootstrap 解码执行。
- **无 TTY 环境中 pnpm 若报 `ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY`，说明它想清理由另一用户创建的 `node_modules`**：优先设置 `CI=true` 后显式安装，或在依赖已完整时直接调用 `node_modules/.bin/*.cmd`，不要反复执行会触发隐式安装的 `pnpm exec`。
- **受限用户直接运行 Astro 若因创建 `%APPDATA%/astro/Config` 报 `EPERM`，先设置 `ASTRO_TELEMETRY_DISABLED=1`**，再调用 `node_modules/.bin/astro.cmd`；否则检查尚未进入项目类型分析阶段。
- **PowerShell 不要在带空格的括号表达式后直接调用 `.Substring()` 等方法**：`(...) .Substring(...)` 会报 `Unexpected token '.Substring'`。先把表达式结果赋给中间变量，再调用实例方法。
- **`rg` 在“零匹配”时会返回退出码 1，即使零匹配正是审计目标**：检查旧路径为 0 等场景不要把裸 `rg` 当成必须成功的命令；用 PowerShell 条件捕获退出码，或让脚本显式把 0/1 都解释为有效审计结果，避免把“未找到”误报成命令故障。
- **2026-08-25 复发：PowerShell 外层双引号中不要直接嵌入含 `|`、内层引号、反引号或复杂字符类的 `rg` 正则**：转义稍有偏差时，原生命令序列化会剥掉内层引号，`|` 可能被当成管道，最终形成 `unclosed group` 等残缺正则。优先使用 `-F` 固定字符串、把模式放进单引号、拆成多个 `-e` 简单模式，或先赋给变量再传给 `rg`。
- **PowerShell 变量名不区分大小写，`$home` 会与只读自动变量 `$HOME` 冲突**：HTTP 首页响应等临时变量不要命名为 `home`；使用 `$homeResponse`、`$rootPage` 等明确名称，避免 `Cannot overwrite variable HOME`。
- **不要在 PowerShell 单引号命令字符串里再直接嵌入含单引号的复杂正则/源码**：内层引号会提前结束字符串并造成解析失败。优先把正则赋给双引号变量、使用 here-string，或拆成更简单的多步命令；跨工具传递时先验证最终参数文本。
- **PowerShell 双引号插值中变量后紧跟冒号时必须用 `${name}:`**：写成 `$line:` 会被解析为作用域变量并报 `Variable reference is not valid`。日志位置、行号等字符串统一使用 `${line}:$value` 或格式化运算符 `-f`。
- **长时间 `exec_command` 返回 `session_id` 时，外层工具调用结束不代表命令完成**：必须让 `functions.exec` 转发嵌套结果中的 `session_id`，再用 `write_stdin` 持续轮询到返回 `exit_code` 后检查 `dist` 等产物；只转发首个空 `output` 会丢失后续结果，也不要在前一个命令未结束时重复启动。
- **Windows PowerShell 5 所用 .NET 可能没有 `[System.IO.Path]::GetRelativePath()`**：做 `dist` 审计时先解析根目录绝对路径，再对文件绝对路径安全调用 `Substring($root.Length)`；不要依赖较新 .NET API，否则循环会逐文件报 `MethodNotFound` 且仍可能以退出码 0 结束。
- **`gsc-cli` 通过 Windows 用户代理访问 Google API 时，虚拟环境必须安装 `PySocks`**：`googleapiclient` 底层 `httplib2` 在缺少该包时会静默忽略代理并直连，最终报 `WinError 10060`。用 `uv pip install --python .venv/Scripts/python.exe PySocks` 安装；桥接脚本应从 `urllib.request.getproxies()` 读取系统代理并把 `localhost` 规范为 `127.0.0.1`。
- **GSC 经本地代理偶尔会报 `SSL: UNEXPECTED_EOF_WHILE_READING`**：把它视为瞬时代理断流，只重试一次，并验证命令退出码及输出确实以 JSON 数组开头；不要让 PowerShell 后续管道把 CLI 的错误文本掩盖成退出码 0。
- **Windows 下给 Playwright CLI 传测试文件过滤器时也使用正斜杠**：`e2e\\content-integrity.spec.ts` 会作为正则处理，反斜杠可能转义后续字符并导致 `No tests found`。统一传 `e2e/content-integrity.spec.ts`，即使当前 shell 是 PowerShell。
- **命令工具名称必须以当前会话实际暴露的能力为准**：部分运行时只有 `shell_command`，调用不存在的 `exec_command` 会在命令执行前报 `TypeError: tools.exec_command is not a function`。先检查工具声明，并在本会话统一使用已暴露的命令接口，不要沿用上一轮的工具名假设。
- **PowerShell 的 `foreach (...) { ... }` 结果不要在同一语句末尾直接接管道**：` } | Format-Table` 会报 `An empty pipe element is not allowed`，本项目审计中已多次复现；一律先赋给 `$results = foreach (...) { ... }`，再单独执行 `$results | Format-Table`。
- **用 `shell_command` 跑完整 `pnpm build` 等长任务时不要设置秒级 `timeout_ms`**：该接口会在超时后终止进程，而不是保证返回可继续轮询的会话；生产构建至少预留 120 秒，并以最终退出码和 `dist` 产物为准。
- **PowerShell 审计可选路径或进程时不要把存在与不存在的目标混在一次查询里**：即使使用 `-ErrorAction SilentlyContinue`，`Get-ChildItem` 遇缺失的 `playwright-report/`，或 `Get-Process -Name rg,pwsh` 中任一进程名不存在，都可能在输出有效结果后仍以退出码 1 结束。先用 `Test-Path` 筛选路径；进程查询则读取实际进程列表后再按名称过滤，并显式区分“部分目标不存在”与真正查询失败。
- **并行执行多个只读探测时不要让 `Promise.all` 直接承接可能以 1 表示“零匹配”的 `rg`**：任一零匹配会让整个编排被判失败，其他结果也无法回传。先在每条 PowerShell 命令里把 `rg` 的退出码 1 显式转换为正常审计结果，或使用能保留各子任务结果的 settled 模式。
- **Neon CLI 的浏览器授权不要依赖默认 60 秒命令超时**：交互登录应在用户可见的 PowerShell 中运行并预留足够时间完成浏览器确认；超时退出不等同于账号或授权本身失败。
- **从非交互 shell 用 `Start-Process powershell.exe -Wait` 启动 gopass 解锁窗口不保证用户能看到或操作**：子进程可能一直等待 pinentry/`Read-Host` 直到外层超时。连续解密失败时让用户在自己的可见 PowerShell 中执行输出重定向到 `$null` 的 `gopass show -o` 来预热 gpg-agent，再继续自动化。
- **不要假设 Wrangler 会继承之前通过环境变量使用的 Cloudflare Token**：`CLOUDFLARE_API_TOKEN` 是进程级变量，后续新命令执行 `wrangler whoami` 仍会报 `Not logged in`。每次 Cloudflare 操作都要在同一 PowerShell 调用内从 gopass 注入 Token，或先完成持久化 OAuth 登录。
- **Windows `curl.exe` 若报 `CRYPT_E_REVOCATION_OFFLINE`，是 Schannel 无法联网检查证书吊销状态**：对已知 HTTPS 服务的诊断请求加 `--ssl-no-revoke` 再试；批量网络探测使用 settled 模式保留其他地址的结果，不要让一个 TLS 失败丢掉全部输出。
- **用 `functions.exec` 并行编排多个 `shell_command` 时，单个命令的 `timeout_ms` 不会自动延长外层默认执行窗口**：只要其中有网络请求或多文件读取，就应在脚本首行设置足够的 `// @exec: {"yield_time_ms": ...}`，或拆成较小调用；否则外层可能先在 10 秒超时，造成所有子检查看似一起失败。
- **审计 `.cache` 时不要无边界 `Get-ChildItem -Recurse`**：缓存目录可能包含完整项目、构建产物和 `node_modules`，递归枚举会产生巨量输出并超时。优先 `Test-Path` 后只读取明确目标（如 `.cache/gsc`），确需递归时显式排除依赖与构建目录。
- **2026-08-01 复发：并行审计中的每一条 `rg` 都要单独归一化退出码 1**：不要只包装部分子命令；任何遗漏的零匹配都会让 `Promise.all` 整体失败并吞掉其他结果。每条命令都应保存 `$LASTEXITCODE`，把 1 转成明确的 `NO_MATCH` 成功输出。
- **Windows PowerShell 的 `[pscustomobject]@{ key = ... }` 属性值里不要直接写 `(if (...) { ... })`**：Windows PowerShell 5 会把 `if` 当作命令并报 `The term 'if' is not recognized`。先把条件结果赋给中间变量，或使用 `$()` 子表达式，再写入对象属性。
- **2026-08-02 复发：PowerShell 的 `foreach (...) { ... }` 输出绝不能在同一语句后直接接管道**：` } | ConvertTo-Json` 与 ` } | Format-Table` 都会报 `An empty pipe element is not allowed`。先写 `$results = foreach (...) { ... }`，下一条语句再处理 `$results`。
- **2026-08-04 复发：PowerShell 的 `foreach (...) { ... }` 结果不能在同一语句末尾直接接管道**：即使只是汇总只读 JSON，`} | ConvertTo-Json` 也会在命令执行前报 `An empty pipe element is not allowed`。始终先赋给任务专用变量，再在下一条语句处理。
- **PowerShell 做路径规范化时不要使用未正确转义的 `-replace '\'`**：反斜杠在正则中是转义符，表达式会报 `Invalid pattern`；优先调用字符串 `.Replace('\', '/')`，或使用正确转义的正则 `'\\'`。
- **2026-08-04 再次复发：Windows 下不要把 `src/content/guides/*/doomsday-clock.mdx` 这类通配路径直接传给 `rg`**：PowerShell 不会按预期展开，`rg` 会收到非法文件名并报 `os error 123`；固定从真实目录根搜索，并用 `--glob 'doomsday-clock.mdx'` 限定文件。
- **2026-08-05 复发：PowerShell 路径规范化不要写 `-replace '\'`**：`-replace` 的第一个参数是正则，单个反斜杠会触发 `InvalidRegularExpression`；不需要正则时统一用 `$path.Replace('\', '/')`，需要正则时写 `-replace '\\', '/'`。
- **2026-08-06 再次复发：Windows 下不要把 `src/data/legal.*.ts` 等通配符作为 `rg` 的路径参数**：这会被当成非法文件名并以退出码 2 失败；应从真实目录根（如 `src`）搜索，并用 `--glob 'legal.*.ts'` 限定文件，零匹配时只把退出码 1 解释为正常审计结果。
- **Astro 内容集合配置位于 `src/content/config.ts`，不是 `src/content.config.ts`**：读取 schema 前先用 `rg --files | Select-String 'content.*config'` 确认真正路径，不要沿用其他 Astro 项目的目录布局假设。
- **Windows 下消费 `rg --files` 输出时先把反斜杠规范化为正斜杠**：后续若按 POSIX 路径比较、构造 URL 或作为正则过滤器，直接使用 `\\` 会导致漏匹配或意外转义。
- **Windows PowerShell 5 的 `Get-Date` 不支持 `-AsUTC`**：统一使用 `(Get-Date).ToUniversalTime()`，再按需要调用 `ToString(...)`，避免参数不存在导致脚本中断。
- **纯 Node 审计脚本不要在无 TTY 环境里盲目经 `pnpm <script>` 启动**：Codex 的 pnpm 运行时可能先触发隐式安装/清理并报 `ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY`。确认脚本不依赖 pnpm 注入后，直接运行 `node scripts/<audit>.mjs --strict`，避免触碰现有 `node_modules`。
- **Windows 下经 pnpm 脚本向 Playwright 传 `--grep` 时不要使用含 `|` 的正则**：即使 PowerShell 外层写了单引号，pnpm 的 `.cmd` 转发仍可能让 `cmd.exe` 把 `|` 当管道，并报后半段“不是内部或外部命令”。改为直接传目标 spec，或分别用不含管道的单个 `--grep=<词>` 运行。
- **读取 Codex automation 配置前不要假设 `$env:CODEX_HOME` 一定存在**：先检查环境变量；未注入时使用已确认的用户配置目录（通常为 `$env:USERPROFILE/.codex`），或直接通过 automation API 查看配置，避免 `Join-Path` 因空路径失败。
- **PowerShell 的 `foreach` 语法中关键字与变量之间必须保留空格**：统一写成 `foreach ($file in $files) { ... }`；`foreach($file in$files)` 会把 `in$files` 解析失败并在执行前报 `Missing 'in' after variable in foreach loop`。
- **Windows PowerShell 5 不支持 `Get-Date -AsUTC`**：该参数会报 `ParameterNotFound`；需要 UTC ISO 时间时使用 `(Get-Date).ToUniversalTime().ToString('o')`，不要沿用 PowerShell 7 的参数写法。
- **`Select-String` 可能返回多个 MatchInfo，不能直接把 `.LineNumber` 当标量做算术**：先用 `$matches = @(...)` 收集，再以 `[int]$matches[0].LineNumber` 选择目标；否则 `$matches.LineNumber - 2` 会因 `Object[]` 没有 `op_Subtraction` 而失败。
- **PowerShell 经 pnpm 传递 Playwright `--grep` 时不要用反斜杠转义标题里的方括号**：`Water Nukes\\[fr\\]` 可能以双反斜杠到达 Playwright 并导致 `No tests found`；改用不含方括号的稳定标题子串，或用 `Water Nukes.*fr.*` 这类无需反斜杠的正则。
- **命令工具超时终止外层 `pnpm` 不保证回收 Node/Python 子进程**：GSC 等长请求超时后先用 `Get-CimInstance Win32_Process` 核对命令行和父子链，只终止本轮精确 PID，再确认残留为 0 后重试；不要让旧请求与唯一重试同时写同一缓存。
- **按 CommandLine 清理进程时必须排除当前 PowerShell，且进程退出存在竞态**：宽泛匹配会把清理命令自身纳入并自终止；应先只读记录精确 PID，再逐个 `Stop-Process`，并把“检查后已自然退出”的 `ProcessCommandException` 视为 `ALREADY_EXITED` 后复核残留，而不是让清理脚本失败。
- **2026-08-23 再次复发：PowerShell 的 `foreach (...) { ... }` 结果不能在同一语句末尾直接接管道**：路由和五语事实审计也必须先赋给 `$results = foreach (...) { ... }`，再单独执行 `$results | Format-Table`；否则解析器会报 `An empty pipe element is not allowed`。
- **PowerShell 用 `Select-String` 检查字符串数组时，应通过管道逐行传入**：`Select-String -InputObject $lines` 可能把整个数组作为单个输入对象，导致存在的行首模式仍返回空；使用 `$lines | Select-String -Pattern ...`，再把结果收集为数组并显式选择目标匹配。
- **2026-08-20 再次复发：Windows 下即使只读 `docs/archive/*.md` 也不能把 `*` 放进 `rg` 路径参数**：从真实目录 `docs/archive` 搜索，并用 `--glob '*.md'` 过滤；否则 `rg` 会报 `os error 123`。
- **2026-08-23 再次复发：Windows 下不要把 `src/pages/*/mechanics/modes.astro`、`src/content/strategies/en/*.mdx`、`e2e/*guide*`、`.env*` 等通配表达式作为 `rg` 路径参数**：应传真实目录，再用 `--glob 'modes.astro'`、`--glob '*.mdx'`、`--glob '*guide*'` 或 `--glob '.env*'` 限定文件；否则会报 `os error 123`。
- **核验新 Release 时不要假设相邻的上游 clone 已抓取最新 tag**：先用 `git tag --list <tag>` 或 `git rev-parse --verify <tag>` 确认；本地缺失时改读 GitHub 官方 Release、tag ref 与 raw content API，不为只读核验擅自 fetch。PowerShell 中需要 annotated-tag peel 时把 `<tag>^{}` 整体加引号，否则 `{}` 可能被解析为脚本块。
- **PowerShell 下 `gh ... --json` 的逗号字段列表必须整体引用**：例如写成 `gh pr list --json 'number,title,headRefName'`；未引用的逗号会被 PowerShell 当成参数数组分隔，导致 `gh` 收到错误字段或额外参数。
