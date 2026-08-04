# 2026-08-04 内容信号与 v0.33.1 响应来源

本文件记录本次内容循环使用的一手来源、判断边界和交付范围。Search Console 原始 Query、点击、展现、CTR 与排名明细继续只保留在 `.cache/gsc/`，不提交到仓库。

## 今日判断

- 正式 [`v0.33.1`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.1) 触发 `FRESH-01`，优先级高于已排到下一项的 `DOOM-01`。
- 唯一主落地页仍是五语 `/changelog/v33/`。v33.0 与 v33.1 共用一篇版本系列总览，不新增小版本薄页。
- 同步范围是 v33 总览，以及明确写着 beta1 的机制、FAQ、第一局、快捷键、Water Nukes、核威慑和海战答案；不改无关页面。

## Release 与上游状态

- `v0.33.1` 发布于 2026-08-03T21:39:35Z，`draft=false`、`prerelease=false`，正文包含完整 v33.0 说明和两项 v33.1 修复，不是 `TEST` 占位。
- 两项 v33.1 玩家影响是：修复自定义 tribe 名称不显示在排行榜，以及修复回放出现 desync 错误。它们恢复可见性和可靠性，不改变 MIRV、Doomsday、Ranked 2v2、战舰熟练度或地图阈值。
- 正式正文继续确认 v33 的关键决策：MIRV 弹头按常规 SAM 弹道拦截、发射后 Silo 冷却、Doomsday 10 分钟宽限和波次门槛、Ranked 2v2、战舰熟练度、不可通行地形与 22 张地图。
- 成功核验到上游 `main` 为 `0668045`。GitHub compare 与 tag-ref 请求在一次重试后仍 TLS 握手超时，因此没有把未完整刷新的 compare 结果写成“绝无其他变化”。
- 本地 `OpenFrontIO` clone 的 `git pull --ff-only` 外层调用虽然超时，但事后核验确认已干净快进到 `0668045`，且与 `origin/main` 一致。结构化数据记录这个 extraction checkout，编辑版本范围仍为 `v33`；本地尚未取得 `v0.33.1` tag，因此不得暗示该 commit 就是 Release tag 对应提交。

## Search Console 7 / 28 天

- 7 天报告已主动刷新：2026-07-27 至 2026-08-02，生成于 2026-08-04T02:52:22.856Z，共 765 个 Query、1,411 条 Query × Page。
- 28 天报告已主动刷新：2026-07-06 至 2026-08-02，生成于 2026-08-04T02:52:55.304Z，共 1,077 个 Query、2,370 条 Query × Page。
- Doomsday 在 7 天窗口有 12 个相关 Query、152 次展现，仍主要落到 `/changelog/v32/`；它继续支持 `DOOM-01`，但不能越过正式 Release。
- Water Nukes 仍错落到 guides 或 hotkeys，controls 仍在 `/shortcuts/` 与 `/guides/hotkeys/` 间切换，经济相关 Query 已主要落到 `/mechanics/economy/`。这些结论继续留在 `NUKE-01`、`CTRL-01` 与 `ECON-01`。
- GSC 中没有 replay、desync 或 tribe 的真实查询信号；本次写入这两项只因为正式 Release 明确确认，不将它们升级成独立选题。

## Issues 与 Feedlog

- `redreamality/openfront-intel` 没有开放的真实 Issues，也没有同计划未合并 PR。
- [Feedlog](https://feedback.openfront.fyi/) 与[路线图](https://feedback.openfront.fyi/roadmap)仍只有系统 welcome：1 个 Other 帖子、0 票、0 评论。系统帖不进入选题池。

## 完成定义与视觉证据

- 五语 v33 总览显示正式 `v0.33.1`，直接说明两项热修，并保留已有实战决策、反制、相邻阅读和权威来源。
- 受影响旧页统一将 beta1 来源更新为正式 v33.1，核验日期为 2026-08-04；五语数字、键位、版本范围和结论一致。
- 继续使用正文、数据表和现有 HTML/CSS 解释内容；没有新增或伪造游戏截图。
- 内容完整性 e2e 必须覆盖五语正式 Release URL、两项 v33.1 修复、既有 v33 决策和源码链接。
