# 内容、数据与多语 runbook

仅在任务涉及本主题时读取。规则从 2026-08-20 的项目级 `AGENTS.md` 逐条迁移；原始快照见 [归档](../archive/AGENTS-through-2026-08-20.md)。

来源范围：`路径与验证` 原章节。

## 规则

- **来源面板必须区分“提取 checkout”与“编辑验证范围”**：`_meta.upstreamCommit` 记录本次 extract 使用的源码 checkout，`_meta.upstreamVersion` 仍表示编辑验证范围/内置 fallback 版本；不得暗示该 commit 就是 vXX 对应 tag。源码链接可以指向 checkout，但文案必须明确两者含义。
- **核验机制数据前先用 `rg --files src/data` 确认可用生成文件**：项目不存在 `src/data/mechanics.json`；机制数值分布在 `formulas.json`、`structures.json`、`units.json`，机制解释则位于对应页面与上游源码。不要根据文件名猜测路径。
- **需要解析 Neon CLI JSON 时要隔离交互提示和日志**：先固定组织与非交互参数，再校验输出确实是 JSON；不要让组织选择、认证提示或状态日志污染后直接交给 JSON 解析器。
- **`neonctl connection-string --output json` 仍可能返回裸 `postgresql://...` 文本**：不要无条件交给 `ConvertFrom-Json`；先检查输出是否以 `postgres` 开头，只有确实是 JSON 时才解析对象或字符串格式，否则会报 `Invalid JSON primitive: postgresql`。
- **多语内容完整性审计不要给中文与拉丁语种套同一个字符长度门槛**：中文信息密度更高，统一阈值会制造假失败。按语种设置最小值，并继续单独校验版本号、必备事实和非空摘要。
- **核心内容严格审计会把超过 240 字符的单个段落记为失败**：新增法语、德语、荷兰语等长句时，把规则边界、导流和页面职责拆成自然的多个短段；不要为了通过审计删除事实或缩成含义不完整的一句。
- **GSC OAuth `token.json` 缺失时不要在无头自动化中反复触发交互授权**：确认 token 不存在后立即回退最后有效缓存，明确记录截止日与未刷新状态；授权必须由用户在可见终端运行 `gsc_cli.py auth` 完成，后续自动化再恢复刷新。
- **版本边界审计不能只搜索能力词组合而忽略否定语境**：例如“普通 Host UI 没有固定队伍按钮”是正确边界，粗糙正则会把它误报为能力声明；应只匹配明确的错误肯定陈述，或先排除 `没有`、`未`、`does not`、`no` 等否定上下文。
- **最新正式 Release 只在 `src/config/openfront-release.ts` 写一次 tag**：series、展示版本、Release URL、五语首页 Hero/优先路径和来源面板都必须从该配置派生；升级后运行 `pnpm release:audit`，用静态契约核验五语 frontmatter、核心章节、事实信号、官方来源与 `{series}` 占位。
