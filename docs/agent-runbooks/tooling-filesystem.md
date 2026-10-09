# 工具、路径与文件系统 runbook

- **2026-09-08 本轮路径探测记录**：初始读取曾猜测不存在的 `src/pages/en` 与 sitemap `options.d.ts`，并把通配表达式作为 `rg` 路径；这些分别属于目录约定错误和 Windows 路径解析错误。后续先用 `rg --files`/实际包树定位，再从真实目录配合 `--glob` 搜索，未影响页面产物。
- **2026-09-17 复发**：检索自动化历史 session 时，把 `rollout-*.jsonl` 作为 Windows 上 `rg` 的路径参数，得到 `os error 123`；改用 `rg --files <真实目录> -g '<文件名模式>'` 取得精确路径后恢复。此为既有通配路径规则的再次触发，没有影响自动化配置或项目内容。
- **2026-09-20 复发**：事实复核中把 `src/content/guides/*/impossible-singleplayer.mdx` 传给 Windows `rg`，再次得到 `os error 123`；改从真实目录配 `-g` 后恢复。另把上游 clone 误作仓库内 `OpenFrontIO`、沿用已不存在的 `cache/scripts/wc_zh.js`；真实 clone 在 `../OpenFrontIO`，中文词数改用当前文件和 `Intl.Segmenter` 复算。跨轮路径一律先定位，不沿用旧临时脚本位置。
- **2026-09-21、2026-09-29、2026-10-02、2026-10-03 复发**：`apply_patch` 使用未经重读的长行上下文会失败；目标含 Unicode 标点、真实文件已变化或只拿段落内句子当整行锚点时，验证器会原子回滚。2026-10-03 再次把长 Markdown 段落的首句误作完整物理行；恢复方式仍是重读实际行并改用短标题锚点或完整物理行。补丁锚点必须来自当前完整文件，不能从截断输出推断。
- **2026-09-27 再次复发**：把目录、英文正文和十个五语互链合进同一个 12 文件补丁时，中文贸易页的一处旧句锚点不匹配，导致整份补丁回滚且没有部分写入。恢复方式是按文件组读取当前片段并拆成目录/角色页/贸易页三个小补丁；跨语言长段落不能成为大批次补丁的共同成败点。

仅在任务涉及本主题时读取。规则从 2026-08-20 的项目级 `AGENTS.md` 逐条迁移；原始快照见 [归档](../archive/AGENTS-through-2026-08-20.md)。

来源范围：`路径与验证` 原章节。

## 规则

- **`apply_patch` 前先读取目标文件的精确片段，尤其是配置文件**：不要根据早先印象构造大段上下文；例如 sitemap 的 `lastmod` 位于 integration 顶层而非 `serialize` 返回值时，上下文不匹配会导致补丁整体失败。
- **`rg` 使用 lookahead/lookbehind 等环视正则时必须显式加 `--pcre2`**：默认 Rust regex 引擎不支持 `(?=...)`、`(?!...)`、`(?<=...)`、`(?<!...)`，会报 regex parse error。简单搜索优先不用环视，需要时再切换 PCRE2。
- **`apply_patch` 的上下文即使只差一个空格也会导致整份多文件补丁回滚**：复制长行作为锚点后要逐字核对；新文件和既有文件修改应拆成小补丁，避免附带更新的上下文错误阻止主要产物写入。
- **`functions.exec` 中用 JavaScript 反引号模板包装 `apply_patch` 时，补丁正文的 Markdown 反引号会提前终止外层字符串**：新建含代码围栏或行内代码的文件时改用普通引号转义，或在生成脚本中用 `String.fromCharCode(96)` 构造反引号；看到 `SyntaxError: Invalid or unexpected token` 先修包装字符串，不要归因于补丁内容。
- **当前会话没有暴露某项 skill 或某项浏览器选项时，不要沿用旧会话的调用形状**：以本轮 `Available skills` 和工具 schema 为准；2026-10-02 子代理新建可见 IAB 标签页时 `visible` 选项不受支持，改用已有标签页完成实际访问。缺失能力应切换到当前可用入口或明确说明，不能重复提交同一无效参数。
- **Doomsday 配置不在假定的 `GameConfig.ts`**：模式 schema 位于上游 `src/core/Schemas.ts`，警告与损耗默认值位于 `src/core/configuration/Config.ts`；核验前先用 `rg --files` 和源码搜索确认真实路径，不要按旧文件名猜测。
- **扩写五语文章时不要假设各语种段落锚点逐字对应**：同一事实的译文句式可能不同，跨语种复用 `apply_patch` 上下文会失败；每个语种插入前分别读取目标标题附近的精确文本，再用短锚点分开补丁。
- **自动化环境中 `$CODEX_HOME` 可能未设置**：读取自动化记忆前先检测变量；缺失时使用当前用户已知的 `.codex` 目录（本机为 `C:\\Users\\Remy\\.codex`），不要把空变量直接拼进路径。
- **审计 MIRV/SAM 旧错误时必须区分“载体免疫”与“弹头免疫”**：载体免疫是正确规则；负向搜索应锁定 `warhead/弹头/ogive/Sprengkopf/kernkop` 与免疫或不可拦截的组合，不能用会跨字段吞到 `carrier immune` 的宽泛正则。
- **向长 Markdown 账本同时补章节和表格行时不要把整条历史表格行塞进同一份多位置补丁**：表格措辞只差一个词就会使 `apply_patch` 整体回滚。本轮把“回到 main”误作实际的“切回并同步 main”而匹配失败；应先读取精确尾行，再把日期、章节、清单和表格拆成独立短补丁。
- **2026-08-22 再次复发：给 `rg` 传多个搜索根前先确认每个目录真实存在**：把猜测的 `src/lib` 与有效目录一起传入会让 `rg` 即使找到匹配仍以路径错误退出 2。先用 `rg --files src` 或逐个 `Test-Path` 枚举真实根，再组合搜索；不要把部分输出误当成整条审计成功。
- **Node 20/23 不能直接动态导入项目 `.ts` 配置**：纯 Node 审计若要复用 TypeScript 单一来源，应通过项目内 `typescript.transpileModule` 转为 ESM 后加载，或使用项目已有的 TypeScript loader；不要直接 `import('./src/config/*.ts')`。
- **项目不存在 `src/layouts/GuideLayout.astro`**：当前布局只有 `BaseLayout.astro` 与 `DocLayout.astro`；追踪攻略渲染前先用 `rg --files src/layouts src/pages` 枚举真实入口，不要按组件职责猜文件名。
- **读取 Markdown 直接链接的来源包时必须相对当前文档目录解析路径**：例如 `docs/whats-new-content-plan.md` 中的 `research/...` 实际位于 `docs/research/...`，不是仓库根 `research/...`。先用 `rg --files docs` 核对真实文件，再读取，避免把正确的相对链接误判为缺失。
- **一次 `apply_patch` 不能同时对同一路径执行 `Delete File` 和 `Add File`**：验证器会以 `multiple operations target` 拒绝整份补丁，且不会写入任何内容。整文件替换应优先使用单个 `Update File`；确需删除重建时拆成两次调用，并在两步之间立即恢复目标文件。
- **2026-08-23 复发：Astro 内容集合配置位于 `src/content/config.ts`，不是仓库级 `src/content.config.ts`**：检查 schema 或 collection 前先用 `rg --files src | rg 'content.*config|config.*content'` 定位，避免把其他 Astro 版本的约定路径套到本项目。
- **Codex `automation_update` 不支持 `mode=run`，也不要用 `FREQ=MINUTELY` 模拟单次试跑**：分钟 recurrence 可能在恢复原频率前排入多个独立任务，导致它们竞争同一项目目录。单次试跑应使用应用提供的正式运行入口；触发后立即核对只出现一个新任务，再开始跟踪。
- **2026-09-07、2026-09-08、2026-09-25、2026-09-27、2026-09-29、2026-10-02 再次复发：读取源码、内容页、配置或审计器前不得猜路径或文件名**：核验官方 tag 曾猜错 `TransformHandler` / `UserSettings`，又猜测不存在的本地 `src/content/mechanics`；2026-09-29 把 playlist 实现猜成 `src/core/game/MapPlaylist.ts`，枚举 tag tree 后定位到真实 `src/server/MapPlaylist.ts`；2026-10-02 核武核验先猜成 `Unit.ts`，随后从源码树定位到 `UnitImpl.ts`。先从最近的真实目录运行 `rg --files`，远端 tag 先读取官方 tree，再把返回路径传给 `Get-Content`、`rg` 或 blob API；不要把猜测路径与有效路径放在同一命令中。若搜索表达式以 `-` 开头，在选项后加 `--` 终止参数解析。
- **2026-09-29 长篇新文件写入后必须立即核对 frontmatter、标题数、长度和尾部**：本轮一次荷兰语 `Add File` 返回成功，但磁盘内容变成另一份完整草稿，包含额外 frontmatter、错误时间数字与多节不足 401；因 Gate 时文件不存在，可确认是本轮生成物。继续前先重读全文件并运行逐节计数，只在确认完整且与预期一致后开始后续语言或互链修改。
- **Windows PowerShell 的 `System.Drawing.Image.FromFile()` 不能可靠解码 WebP**：出现 `invalid input` 或疑似内存错误时不能据此判定图片损坏；使用浏览器 `naturalWidth`、项目现有图像工具或支持 WebP 的解码器验证实际文件。
- **2026-08-24、2026-10-03 再次复发：长命令返回 `exec_command` session ID 后必须保留该 ID 并用 `write_stdin` 轮询**：经 `functions.exec` 包装时也要显式输出嵌套结果的 `session_id`，不能只转发 `output`；`wait` 只接受 yielded exec cell ID。本轮误把构建的 session ID 传给 `wait` 后得到 `exec cell not found`，改用 `write_stdin` 恢复。先辨认返回字段，再选择对应接口，避免丢失最终输出、把空 `dist` 当成最终产物或重复启动构建。
- **2026-09-14 复发：本地保留的研究报告可能只存在于未合入的分支/提交**：若当前工作树按报告路径读取失败，先用 `git log --all -- <path>` 和 `git show <commit>:<path>` 核对本地对象；确认报告内容后继续执行任务，不要创建同名副本或误判为报告丢失。本轮报告位于保留提交 `edf8cd22f3d80bca5bcafb01ae01ed921ff11ebc`。
- **2026-09-15 复发：审计脚本名必须从 `package.json` 或 `rg --files scripts` 获取**：最新 Release 审计实际是 `scripts/audit-latest-release.mjs`，不是猜测的 `audit-release-content.mjs`；读取不存在路径会让同批只读探测退出，但不代表审计能力缺失。
- **2026-09-15、2026-09-25 复发：官方源码树与长研究包写入**：检索 tag 源码前先从 tree 确认 `tests/` 等真实目录，不能猜成 `test/`；本轮再次探测上游 `test/` 后才枚举到真实目录。创建数百行来源包时先用相对路径写入标题与门禁摘要，再分段追加来源和分析，避免一次超长绝对路径补丁未创建目标。
- **2026-09-15 复发：`apply_patch` 只能按整行匹配上下文，不能用长段落末尾的一句话当作独立锚点**：若 Markdown 一个自然段存储在同一物理行，先读取完整尾行，写入短 ASCII marker，再分批替换 marker；不要重复提交只含句子片段或无上下文行号的补丁。

## 2026-10-01 失败与恢复记录

- 首次只读探测的 PowerShell 包装多了一个右括号，命令在业务逻辑执行前失败；拆成语法可见的短命令后恢复。复杂包装先做最小语法检查，不把包装器解析错误解释成项目故障。
- 页面路径曾误猜为不存在的 `src/pages/en`；随后用 `rg --files src/pages` 枚举真实路由，并确认英文页面位于无语言前缀路径。路径探测仍须遵守“先枚举、后读取”。
- `rg --glob` 在零匹配时返回退出码 1，属于“没有命中”而非工具故障；负向审计必须同时检查输出与退出语义，不能因退出码 1 中断后续验收。
- PowerShell 中 `gh pr list --json` 的逗号分隔字段列表未加引号时被 CLI 当成未知参数；用单引号包住完整字段串后恢复并返回空数组。涉及逗号分隔的原生命令参数时，应把整个值作为一个参数传递。
- 核防 guide 的中间审计因 fallback 小节低于 401 词而失败，补充玩家可执行的全局兵损说明后复跑通过；长文必须在每节稳定后再把 PASS 当成交付证据。
- 清理 `conquest-gold` 研究元话语后，德语末节从合格值降到 394 词，单篇审计退出 1；立即补入收款后检查顺序并复跑。任何正文删改都可能使原先合格的小节跌破 401，最终审计必须在最后一次文案修改之后执行。
- 五语勘误 dry-run 先后因法语换行、德语描述锚点和荷兰语物理行假设不成立而主动中止，均发生在写入前；恢复方式是逐语读取真实物理行并缩小匹配锚点。dry-run 失败证明保护生效，不得绕过预检直接批量写入。

## 2026-10-09 搜索复盘失败与恢复

- 接续交付时把 `scripts/audit-guide*` 作为 rg 路径传入，Windows 报 os error 123；改为真实目录 `scripts` 配合 `--glob '*guide*'` 后恢复检索。属于已覆盖的通配路径规则复发，不修改 AGENTS.md。

- 实施时曾读取不存在的 `e2e/seo.spec.ts`；随后通过 `rg --files e2e` 找到 `seo-titles.spec.ts` 与 `seo-health.spec.ts`。这是路径猜测造成的读取失败，已恢复真实测试定位。

- 独立核验时，`rg` 同时读取真实 `src/layouts/BaseLayout.astro` 和未经枚举的 `src/components/SEO.astro`，后者不存在，导致缺失路径错误。用 `rg --files src` 恢复定位，确认 SEO 实际位于 `src/i18n/seo.ts` 与 BaseLayout；仅读取真实路径后完成核验。此为既有“先枚举、后读取”规则复发，未影响 GSC 原始数据或公开页面，无需修改 AGENTS.md。
