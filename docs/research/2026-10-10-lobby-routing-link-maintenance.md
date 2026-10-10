# 2026-10-10 五语大厅攻略链接维护

任务类型：既有答案维护。交付状态及验证证据见自动化 memory 的本轮记录。

## 需求与答案边界

词簇：lobby pool、list lobbies、public special lobbies。玩家任务：理解大厅分池后，继续查看大厅列表或公开特殊大厅，并保留当前阅读语言。

GSC 最后有效数据为 schemaVersion 2，窗口 2026-09-10 至 2026-10-07；站点与 query 指标使用 byProperty，queryPage 仅用于落地页诊断。未到刷新期，本轮不扫描新需求；大厅词簇需求未知，不视作零。既有搜索维护批次已部署，Monitoring 完整 final 数据窗口仍为 2026-10-10 至 2026-11-06。

唯一主答案路由为 `/guides/lobby-pool-routing/` 及对应语言路由，解释分池机制；`list-lobbies` 承接列表入口，`public-special-lobbies` 承接特殊大厅。现有答案足以承接玩家任务，不新增独立页面。

## 修改与来源

五语源页各修改两个正文链接。英文补末尾斜杠；中文、法文、德文、荷兰文补对应语言前缀和末尾斜杠，直达 canonical 路由。自然入口为原有正文相关阅读链接，不改变首页栏目或导航。

既有事实来源包：[大厅分池来源包](2026-09-28-lobby-pool-routing-community-source-pack.md)。机制依据仍为 v0.34.19 公告及 v0.34.20 production 修复/tag。本轮仅维护站内路由，不新增数字、机制或版本边界，不修改 frontmatter 核验日期。

Gate 起点为干净 main，SHA `50453e390d919b1520a1c3328e1cdf16e21b0184`，无自有开放 PR。已核验最新正式非 TEST Release v0.34.24（2026-10-06），tag SHA `3f5633b92c9508461e6e2b9e1f926487a1804c9f`；upstream main 双游标从 `1e25448f2261d8adf07e12216c0259be00193c68` 更新核验至 `f867a49f5f0a829d0ec30aa6d6d94e2775d0bc17`。WN-01 与 LF-COMMUNITY-ROLLING 维持 Monitoring。

## 验收定义

五语各两个正文链接唯一存在，点击后语言、URL、标题和 canonical 正确。执行内容审计、类型检查、生产构建、内部链接检查、SEO 审计、完整 e2e 和 diff 检查；生成 JSON 保存精确字节基线，仅确认本轮生成噪声后恢复。新长文的 1500 词、逐节 401 词及 3+3 社区配额不适用于本轮链接维护。

验收结果：`pnpm content:audit` 95/95；`pnpm check` 检查 263 files，0 errors、0 warnings、9 hints；生产构建 825 pages；`pnpm check:links` 检查 825 HTML、39,339 hrefs，0 broken；定向 e2e 5/5，完整 `pnpm test:e2e` 435/435；`git diff --check` 通过。五语源页渲染标题无截断，canonical 正确，各有六个 hreflang 声明；两个正文链接均保留当前语言并指向带尾斜杠的目标。

`pnpm seo:audit` 退出 1，实际剩余 73 项既有问题：72 项标题省略号及 1 项荷兰文目标页双 H1。本轮已消除十项 redirect href，五个修改源页没有剩余 SEO 问题；不能宣称全站 SEO PASS，也不扩大本轮链接维护范围。

恢复记录：未引用的 `@me` 引发 PowerShell 解析失败，引用后恢复；猜测 patch 标题导致上下文不匹配，读取实际上下文后修复。首次完整 e2e 为 433/435，新增测试的宽泛 H1 定位及中文 `lang` 断言不符合实际 DOM；改用 `article > header h1` 和 `zh-CN` 后完整重跑 435/435。对应原因已写入 runbook，没有修改 AGENTS.md。

## 受影响 URL（去重 5 个）

| URL | 类型 | 原因 |
|---|---|---|
| https://openfront.fyi/guides/lobby-pool-routing/ | 正文链接维护 | 两处链接直达 canonical |
| https://openfront.fyi/zh/guides/lobby-pool-routing/ | 正文链接维护 | 保留中文并直达 canonical |
| https://openfront.fyi/fr/guides/lobby-pool-routing/ | 正文链接维护 | 保留法文并直达 canonical |
| https://openfront.fyi/de/guides/lobby-pool-routing/ | 正文链接维护 | 保留德文并直达 canonical |
| https://openfront.fyi/nl/guides/lobby-pool-routing/ | 正文链接维护 | 保留荷兰文并直达 canonical |
