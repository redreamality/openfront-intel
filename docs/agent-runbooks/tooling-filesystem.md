# 工具、路径与文件系统 runbook

仅在任务涉及本主题时读取。规则从 2026-08-20 的项目级 `AGENTS.md` 逐条迁移；原始快照见 [归档](../archive/AGENTS-through-2026-08-20.md)。

来源范围：`路径与验证` 原章节。

## 规则

- **`apply_patch` 前先读取目标文件的精确片段，尤其是配置文件**：不要根据早先印象构造大段上下文；例如 sitemap 的 `lastmod` 位于 integration 顶层而非 `serialize` 返回值时，上下文不匹配会导致补丁整体失败。
- **`rg` 使用 lookahead/lookbehind 等环视正则时必须显式加 `--pcre2`**：默认 Rust regex 引擎不支持 `(?=...)`、`(?!...)`、`(?<=...)`、`(?<!...)`，会报 regex parse error。简单搜索优先不用环视，需要时再切换 PCRE2。
- **`apply_patch` 的上下文即使只差一个空格也会导致整份多文件补丁回滚**：复制长行作为锚点后要逐字核对；新文件和既有文件修改应拆成小补丁，避免附带更新的上下文错误阻止主要产物写入。
- **当前会话没有暴露某项 skill 时，不要沿用旧会话的缓存路径强行读取**：以本轮 `Available skills` 为准；缺失的 browser 等 skill 应改用当前可用工具或明确说明能力缺口。
- **Doomsday 配置不在假定的 `GameConfig.ts`**：模式 schema 位于上游 `src/core/Schemas.ts`，警告与损耗默认值位于 `src/core/configuration/Config.ts`；核验前先用 `rg --files` 和源码搜索确认真实路径，不要按旧文件名猜测。
- **扩写五语文章时不要假设各语种段落锚点逐字对应**：同一事实的译文句式可能不同，跨语种复用 `apply_patch` 上下文会失败；每个语种插入前分别读取目标标题附近的精确文本，再用短锚点分开补丁。
- **自动化环境中 `$CODEX_HOME` 可能未设置**：读取自动化记忆前先检测变量；缺失时使用当前用户已知的 `.codex` 目录（本机为 `C:\\Users\\Remy\\.codex`），不要把空变量直接拼进路径。
- **审计 MIRV/SAM 旧错误时必须区分“载体免疫”与“弹头免疫”**：载体免疫是正确规则；负向搜索应锁定 `warhead/弹头/ogive/Sprengkopf/kernkop` 与免疫或不可拦截的组合，不能用会跨字段吞到 `carrier immune` 的宽泛正则。
- **向长 Markdown 账本同时补章节和表格行时不要把整条历史表格行塞进同一份多位置补丁**：表格措辞只差一个词就会使 `apply_patch` 整体回滚。本轮把“回到 main”误作实际的“切回并同步 main”而匹配失败；应先读取精确尾行，再把日期、章节、清单和表格拆成独立短补丁。
- **2026-08-22 再次复发：给 `rg` 传多个搜索根前先确认每个目录真实存在**：把猜测的 `src/lib` 与有效目录一起传入会让 `rg` 即使找到匹配仍以路径错误退出 2。先用 `rg --files src` 或逐个 `Test-Path` 枚举真实根，再组合搜索；不要把部分输出误当成整条审计成功。
- **Node 20/23 不能直接动态导入项目 `.ts` 配置**：纯 Node 审计若要复用 TypeScript 单一来源，应通过项目内 `typescript.transpileModule` 转为 ESM 后加载，或使用项目已有的 TypeScript loader；不要直接 `import('./src/config/*.ts')`。
- **项目不存在 `src/layouts/GuideLayout.astro`**：当前布局只有 `BaseLayout.astro` 与 `DocLayout.astro`；追踪攻略渲染前先用 `rg --files src/layouts src/pages` 枚举真实入口，不要按组件职责猜文件名。
