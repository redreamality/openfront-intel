# AGENTS.md — openfront-intel

OpenFront.io 多语种（en/zh/fr/de/nl）情报与攻略站，Astro + Tailwind 静态站点。

## 核心约定

- Node 包管理使用 `pnpm`；Python 包管理使用 `uv`。
- `src/data/*.json` 由 `pnpm extract`（`scripts/extract-game-data.mjs`）从本地 `OpenFrontIO` clone 生成，禁止手改。
- 仅首次创建仓库时默认设为 private；已有仓库 push 时禁止改变 visibility，除非用户明确要求。
- 修改页脚、导航、Cookie、语言切换等交互后，必须新增或更新对应 `e2e/*.spec.ts`，并运行 `pnpm test:e2e`。
- 大文件少量多次编辑；手工修改使用 `apply_patch`。
- 会话中若有命令失败，结束前必须总结失败模式和根因，并把新规则或明确的复发记录追加到对应 runbook。

## 产品事实

- 撰写面向玩家的长文时，以玩法、结论和玩家可理解的说明为主；源码只作为事实核验依据，正文尽量避免大段或密集引用源码。
- 公开一级内容栏目一旦建立独立索引路由（例如 `/maps/`），必须同步提供五语首页栏目入口并用 e2e 保护；不能只出现在导航、数据库或相邻页面中。
- Footer 的版本来自 `src/data/_meta.json.upstreamVersion`；`src/i18n/ui.ts` 五语 `footer.copyright` 必须保留 `{version}`，禁止写死版本号，也不保留 “made with Astro”。
- `src/content/changelog/{lang}/vXX.mdx` 是 OpenFront 游戏版本笔记。只以 `openfrontio/OpenFrontIO` 正式 GitHub Release 的真实正文为依据；`TEST` 占位不能生成补丁说明。
- changelog frontmatter 沿用 `version: vXX`、`category: Release Notes`（zh 为 `版本笔记`）、`tags: [changelog, balance, features]`。

## 按需加载 runbook

不要每轮读取全部避坑历史。先按任务范围加载对应文件；跨主题任务可读取多个。

| 任务范围 | 必读 runbook |
|---|---|
| UI、导航、Cookie、浏览器测试 | [`docs/agent-runbooks/e2e.md`](docs/agent-runbooks/e2e.md) |
| Astro、构建、类型检查、Playwright 执行 | [`docs/agent-runbooks/build-test.md`](docs/agent-runbooks/build-test.md) |
| extract、地图、生成数据 | [`docs/agent-runbooks/data-extraction.md`](docs/agent-runbooks/data-extraction.md) |
| MDX、i18n、SEO、版本内容与来源 | [`docs/agent-runbooks/content-data.md`](docs/agent-runbooks/content-data.md) |
| Git、GitHub、PR、Release、Pages | [`docs/agent-runbooks/git-github.md`](docs/agent-runbooks/git-github.md) |
| PowerShell、Windows、原生命令参数 | [`docs/agent-runbooks/powershell-windows.md`](docs/agent-runbooks/powershell-windows.md) |
| GSC、Cloudflare、Neon、gopass 等 | [`docs/agent-runbooks/external-services.md`](docs/agent-runbooks/external-services.md) |
| 路径、临时文件、通用工具 | [`docs/agent-runbooks/tooling-filesystem.md`](docs/agent-runbooks/tooling-filesystem.md) |

内容定时任务只需额外读取 [`docs/content-strategy.md`](docs/content-strategy.md)、[`docs/content-loop.md`](docs/content-loop.md) 和当前 Production 项直接链接的计划文件。完整旧规则快照仅供追溯，不属于热上下文：[`docs/archive/AGENTS-through-2026-08-20.md`](docs/archive/AGENTS-through-2026-08-20.md)。

## 本轮新增避坑

- What's New 的 `relatedPath` 允许包含多级相对路由（例如 `mechanics/modes/`）；静态审计正则必须同时允许中间路径段和末尾斜杠，不能只匹配单段 slug。
- Windows PowerShell 下移动或清理文件时，复杂 `ForEach-Object` 脚本块可能被 Codex 命令包装器拒绝；先创建目标目录，再用明确的 `Move-Item -LiteralPath` 逐个移动。即使是已确认为空的临时目录，`Remove-Item` 也可能被安全策略拒绝，优先移动到项目忽略的 `_` 目录，避免强制删除。
- e2e 测试标题包含英文撇号时不要放进未转义的单引号 TypeScript 字符串；使用双引号或显式转义，避免 `astro check` 把整段测试解析成多个未声明标识符。
- PowerShell 读取 Astro `[...slug].astro` 等带方括号的路径必须使用 `-LiteralPath`；普通路径参数会被当作通配符并报告“路径不存在”。
- `pnpm build` 反复刷新 `_meta.json.generatedAt` 后，恢复生成噪声前先读取文件中的实际时间戳；不要假设某次运行时间并直接套用 `apply_patch`，否则会因上下文不匹配失败。
- Astro data collection 使用 camelCase 名称时，内容目录和自定义审计脚本必须同步使用同一目录名（本项目为 `src/content/whatsNew`）；不要只改集合目录而遗漏审计路径，否则 `pnpm content:audit` 会以 ENOENT 失败。
- Playwright 启动时报 `127.0.0.1:4327 is already used` 时，先用 `Get-NetTCPConnection -LocalPort 4327` 找到占用 PID，并核对其命令行确实是本项目残留的 Astro preview；结束该精确进程或改用空闲的 `PLAYWRIGHT_PORT`，不要把 `reuseExistingServer` 改成 `true` 以掩盖错误页面。
- PowerShell 的 `Get-NetTCPConnection -ErrorAction SilentlyContinue` 在没有匹配监听连接时可能以退出码 1 结束；把“无输出”解释为端口空闲，不要把它当成网络故障。需要在脚本中继续执行时先保存结果并显式忽略该查询退出码。
