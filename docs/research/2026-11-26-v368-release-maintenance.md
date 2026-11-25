# v0.36.8 正式 Release 响应维护

访问与核验日期：2026-11-26，Asia/Vladivostok。类型：正式 Release 响应及既有五语主答案维护，不新建玩家页面。

## 官方来源

| URL | 日期与观察 | 局限 |
| --- | --- | --- |
| https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.8 | GitHub API `published_at=2026-11-25T13:43:55Z`，`draft=false`、`prerelease=false`；tag 目标 commit `a9780cf68b5ef7210b1917bcda138054e9986add`。正文说明：最近 14 天加入商店的外观与礼包获得 New 标记；Cosmetics 下新增 New 标签页，按最新顺序列出且排除已拥有商品；闪购改为一个 Ends in 倒计时，横幅写出商品名称，价格与购买按钮靠近优惠；Steam 应用首页增加 Steam Awards 提名横幅，提名结束日为 2026-11-30。 | 正式 Release 只说明商店、展示和推广变化，没有提供新的战斗、经济、地图、人数上限或权限规则。 |
| https://github.com/openfrontio/OpenFrontIO/commit/b9e74160cbe8d9461360520640a5af0427f6f61d | 2026-11-25 upstream `main` 双游标记录；提交消息为 “WaterManager and the scenario thumbnail use the mapgen library (#6563)”。 | `main` 未发布提交不是公开版本规则依据，本轮不据此扩写玩家内容。 |

## 交付边界

本站把 `src/config/openfront-release.ts` 推进到 `v0.36.8`，同步五语首页最新版本卡片与 `/changelog/v36/` 首段、标题、描述和更新日期，并更新 `docs/content-loop.md` 的正式/上游游标记录。正文明确 v0.36.8 只涉及商店标签、闪购展示和 Steam 提名横幅；不把 “New” 排序、已拥有商品排除或提名横幅推导成购买权益、库存规则、游戏玩法或永久活动。

这是既有答案维护。新长文的五语 1500 词、小节 401 词和 3 Reddit + 3 YouTube 社区来源配额不适用；本轮使用 1 个官方 Release 来源，另记录 1 个只读 upstream main 游标。
