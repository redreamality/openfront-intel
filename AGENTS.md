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
