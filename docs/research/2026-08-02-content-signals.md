# 2026-08-02 内容信号与 FRESH-02 交付来源

本文件记录本次内容循环使用的一手来源、今日判断和交付边界。Search Console 原始指标继续只保留在 `.cache/gsc/`，不提交点击、展现、CTR 或排名明细。

## 今日判断

- 唯一计划项是 `FRESH-02`：更新现有 7 个核心答案的 en、zh、fr、de、nl 页面，共 35 页。
- 不创建新内容路由。每个页面继续承接原有唯一玩家意图，只新增统一的新鲜度展示和页面专属版本变化摘要。
- 最新正式 Release、上游修复、GSC、Issues 与 Feedlog 均未形成打断当前战役去领取 Next/Later 的理由。

## Release 与上游变化

- 最新正式 Release 仍是 [`v0.33.0-beta1`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.0-beta1)，发布时间为 2026-07-31T17:49:23Z，`draft=false`、`prerelease=false`，正文为真实版本说明，不是 `TEST` 占位。
- Release tag 指向 [`3fa1a8e`](https://github.com/openfrontio/OpenFrontIO/commit/3fa1a8e0f1996c9efe786a62b5ff97a4d87779cd)。截至本轮，上游 `main` 为 [`daec50e`](https://github.com/openfrontio/OpenFrontIO/commit/daec50e3bd31f65bea71479d3dcaaa7a388c683e)，tag 后有 6 个提交。
- 其中唯一直接改变玩家操作结果的是 [`bf38c58`](https://github.com/openfrontio/OpenFrontIO/commit/bf38c58b60f081e3eeefbb45774c426ea177eeba)：普通核弹会优先选择具有清晰抛物线路径的就绪 Silo，并可在一侧曲线被不可通行地形阻挡时切换到另一侧；两侧都阻挡时 UI 会提前判定不可发射。MIRV 仍按最近 Silo 选择并豁免该路径检查。
- 站内现有内容只说明不可通行地形会改变核弹路径，没有声称“总选最近 Silo”或“路径被挡后必定静默失败”，因此没有已确认事实错误。该修复进入信号池，等待正式版本或相关主答案后续刷新时吸收。
- 其余 tag 后提交是地图文档、管理员白名单、玩家图标清理、归档记录与翻译更新，不改变本轮 35 个页面的核心玩家结论。

## GSC、Issues 与 Feedlog

- `.cache/gsc/top-queries-7d.md` 与 `top-queries-28d.md` 仍截止 2026-07-29。Water Nukes、controls/hotkeys、economy/growth 和品牌词错落地结论未变化，继续留在 `NUKE-01`、`CTRL-01`、`ECON-01` 与 `FRESH-03`。
- `redreamality/openfront-intel` 远端没有未合并 PR，也没有开放 Issues；没有同一计划项的重复交付。
- [Feedlog](https://feedback.openfront.fyi/) 可见内容仍只有系统 welcome：0 票、0 评论。系统帖不能升级为玩家选题。

## FRESH-02 完成定义

- 共享静态组件在文章标题后、直接答案前显示：适用版本、最后核验日期、本版本关键变化。
- 35 个核心页面统一适用于 `v33`，核验日期为 `2026-08-02`，每页摘要对应自己的玩家决策。
- 严格内容审计同时检查当前版本、核验基线与非空摘要，并按中文与拉丁语种分别设置合理长度门槛。
- Playwright 对 7 个页面 × 5 个语种逐页断言摘要可见、标签本地化、版本日期存在且关键事实进入页面。

## 视觉证据

本轮只使用代码原生的静态版本摘要，没有游戏截图，也没有生成或伪造游戏画面。
