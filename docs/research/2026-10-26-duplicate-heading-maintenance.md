# 两篇既有攻略的重复主标题维护

## 任务与边界

- 类型：已有答案的阅读结构与 SEO 维护，不新增独立页面。
- 玩家任务与词簇：Ommatrypta 地图攻略；public special lobbies / modifiers。分别沿用 `guides/ommatrypta/` 与 `guides/public-special-lobbies/` 作为唯一主答案。
- 缺口：德语地图页、荷兰语特殊大厅页的 MDX 正文各有一个 H1，与 `src/layouts/DocLayout.astro` 从 frontmatter 输出的 H1 重复。其余八个语言版本没有正文 H1。
- 发现依据：本轮干净 main 的生产构建与 SEO 审计；十个对应页面逐页解析确认，问题不是通过搜索流量推测。
- 数据口径：沿用 2026-10-23 有效 GSC 缓存，schemaVersion 2、web/final、2026-10-14 至 2026-10-20；站点和 query 用 byProperty，queryPage 仅用于 byPage 落地诊断，锚点单列。本轮不刷新未到期的周更数据，不声明流量改善。原搜索批次的完整观察窗口 2026-10-10 至 2026-11-06 尚未结束。
- 自然入口：已有五语 Guides 目录、原路由和相邻文章链接。只删除两行重复标题；正文小节、链接、frontmatter、玩法结论、适用版本和核验日期均保持原值。

## 来源与版本门禁

- 模板一手依据：`src/layouts/DocLayout.astro` 的 `<h1>{title}</h1>`；五语动态攻略路由将 frontmatter 标题传给该模板。
- 内容一手依据：上述两篇 MDX 与同主题其余八个语言版本，以及本轮修改前后的生产 HTML。
- 正式 Release：https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.35.4 。2026-10-26 用 `gh api -X GET 'repos/openfrontio/OpenFrontIO/releases?per_page=10'` 核验，最新非 draft、非 prerelease、非 TEST 条目仍为 v0.35.4，发布时间 2026-10-24T20:08:23Z；tag commit 为 `14ba82badb1e945ef2e758999238339404fdb788`。
- upstream main 独立游标仍为 `2e779e235b24fe5d531996efb28254e8e7b360ca`。它不作为正式版本证据。
- 本轮 `release:audit` 五语 5/5；单一配置 v0.35.4、生成元数据系列 v35、五语 v35 版本文章及首页版本合同一致。未运行 extract，也不扩大两篇攻略的玩法核验边界。
- 维护不适用新长文 1500 词或 3 Reddit + 3 YouTube 门槛，未为结构修复重复采集社区来源。

## 验收与退出条件

本维护发布即完成并回到 Monitoring。验收要求：十个对应页面均仅一个 H1，原 H2/H3、页面 title、canonical、六个 hreflang 与链接保持一致；两篇正文除重复 H1 外精确不变；生成 JSON 的 SHA256 不变；内容审计、Astro 检查、生产构建、内部链接检查与 diff 检查通过。SEO 完整问题集合只允许移除这两个重复 H1，既有标题截断问题单独报告。

纯正文标题去重没有改变导航、入口、Cookie、语言切换或其他用户交互，按内容产物执行渲染校验，不新增交互 e2e。既有 SEO 审计继续保护全站 H1 数量。本轮私有基线、完整日志、产物哈希和线上复核保存在 automation cache，不提交查询明细。后续仅在标题结构再次回归、相关事实错误或新的正式变化时重开；不提前评价搜索因果。

实际本地验收：`pnpm content:audit` 核心页 95/95 与 What's New 通过；`pnpm check` 287 文件、0 errors、0 warnings、11 既有 hints；`pnpm exec astro build` 1000 页完成；`pnpm check:links` 检查 1005 HTML、47,683 条内部 href，无断链。十个目标页的单 H1、未改正文、元数据、H2/H3、title、canonical、六个 hreflang、链接及全部生成 JSON 精确哈希均通过。全量 HTML/XML SHA256 比对仅这两个 URL 改变。

SEO 前后完整诊断集合由 109 个标题截断加 2 个双 H1，变为原有的 109 个标题截断；仅移除预期两项，无新增。`pnpm seo:audit -- --verbose` 前后仍退出 1，根因为既有标题截断，不能称全站 SEO 通过；该复发记录同步到 build-test runbook。

## 受影响 URL（去重 2 个）

| URL | 变更类型 | 原因 |
|---|---|---|
| https://openfront.fyi/de/guides/ommatrypta/ | 正文结构维护 | 删除模板主标题之后的重复 H1，直接进入快速回答 |
| https://openfront.fyi/nl/guides/public-special-lobbies/ | 正文结构维护 | 删除模板主标题之后的重复 H1，直接进入特殊大厅答案 |
