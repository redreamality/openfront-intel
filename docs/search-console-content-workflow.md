# Search Console → 内容机会工作流

> 本文只说明数据获取与机会分类。选题门槛、周/月节奏和当前战役见 [`content-strategy.md`](content-strategy.md)；每日执行状态见 [`content-loop.md`](content-loop.md)。

`pnpm gsc:queries` 读取 `sc-domain:openfront.fyi` 最近 7 个已稳定数据日的 web / final 数据：全站总数和 Query 使用 `byProperty`，Query × Page 使用 `byPage`，并生成：

- `.cache/gsc/top-queries.json`：完整本地数据，供脚本分析。
- `.cache/gsc/top-queries.md`：前 100 个查询检查项，供内容排期。

两个文件都被 gitignore，不会把点击、展现或查询数据提交到公开仓库。

## 使用本机 gsc-cli OAuth（推荐）

默认会自动查找兄弟目录 `../gsc-cli`，复用其中的 OAuth 客户端和用户配置目录里的 token：

```powershell
pnpm gsc:queries -- --days 7
```

目录不在默认位置时，设置 `GSC_CLI_DIR` 或传入参数：

```powershell
$env:GSC_CLI_DIR = 'C:\path\to\gsc-cli'
pnpm gsc:queries -- --days 7
```

Windows 使用系统代理时，`gsc-cli` 的虚拟环境还需要 `PySocks`，否则 `httplib2` 会忽略代理并直接连接 Google：

```powershell
Set-Location C:\path\to\gsc-cli
uv pip install --python .venv\Scripts\python.exe PySocks
```

桥接脚本会读取 Windows 用户代理并把 `localhost` 规范为 `127.0.0.1`；不会读取、输出或提交 OAuth token。

## 服务账号或 Access Token

1. 在 Google Cloud 创建服务账号并启用 Search Console API。
2. 在 Search Console 的 `sc-domain:openfront.fyi` 属性中，把服务账号邮箱添加为用户。
3. 将服务账号 JSON 保存在仓库之外，并在当前 PowerShell 会话设置：

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = 'C:\secure\openfront-gsc.json'
pnpm gsc:queries -- --days 7
```

也可以使用短期 `GSC_ACCESS_TOKEN`，或在 CI 中提供 `GSC_CLIENT_EMAIL` 与 `GSC_PRIVATE_KEY`。这些原生认证方式优先于 `gsc-cli`。不要把凭据写入仓库。

## 机会分类

- `snippet-check`：平均排名 1–3，检查真实搜索标题、摘要和答案承接。
- `answer-improvement`：平均排名 4–10，检查现有答案、FAQ、例子与入口。
- `relevance-check`：平均排名 11–30，核对相关性和独立意图，再决定更新或新建。

这些分类是检查提示。报表不再用通用 CTR 曲线判定标题失败或估算新增点击；少于 30 次展现标记小样本，纯品牌词标记可能的官网导航意图。

JSON `schemaVersion: 2` 中，`summary.clicks/impressions/ctr/position` 来自无维度的站点级请求，`topQueries` 来自查询级请求；不能由页面行求和推算。可见词覆盖率单列，匿名查询及查询明细保留限制使可见词合计可能小于全站总数。

`topPageByClicks` 和 `topPageByImpressions` 分别显示点击最多、展现最多的非锚点页面；`topPage` 保留为前者的兼容别名。无点击时按展现排序，不表示已确认主答案。`fragmentLinks` 和原始 `queryPageRows.isFragment` 单独保留锚点证据，不累加为市场需求。新旧 schema 的 query 指标不能直接比较。

展现表示本站在搜索结果中被展示的次数，不是全网月搜索量。平均排名混合观察范围内的国家、设备与日期，不是当前固定名次。多 URL 同现可能来自不同语言、站内链接或不同子意图，不能直接判定页面内耗。

默认跳过最近 2 天，以避免 Search Console 未完成聚合的数据扰动判断。需要对齐 UI 的更新鲜范围时，可运行：

```powershell
pnpm gsc:queries -- --days 7 --lag-days 0
```

编辑前合并同义词，再人工核对答案归属和页面职责。保留 `/shortcuts/` 的即时速查与 `/guides/hotkeys/` 的练习职责，不凭展示最多页重分配主答案。

## 选题与完整窗口复盘

按 [搜索改善计划](search-improvement-plan.md) 固定词簇、主答案、日期范围与适用国家/设备；发布前保存私有 28 天基线，发布后第一个完整 28 天窗口再比较。优先观察词簇总点击、站点级排名和主答案承接，页面份额只能用同一 `byPage` 口径比较，不能除以 property 展现。

新增独立页必须记录目标词、精确/邻近词的展现与排名、现有答案缺口。无有效搜索信号时标记教学探索并限制投入；已存在主答案时优先维护。缓存缺失或过旧记为数据未知，不写成零需求。
