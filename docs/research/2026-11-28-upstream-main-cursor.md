# 2026-11-28 upstream main 游标核验

访问与核验日期：2026-11-28，UTC+10。类型：What's New / 版本边界内部维护，不新增玩家页面，不改变正式版本内容。

## 玩家任务与边界

本轮任务是保持站内的正式 Release 与上游开发游标分离。当前正式非 TEST Release 仍为 [v0.36.9](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.9)，API 发布时间为 `2026-11-26T15:03:47Z`，tag 目标为 `5004a6420d1ba5743291c56ed688b42b5f9e8e10`。因此首页、五语 v36 changelog 和既有 v0.36.9 商店答案不因后续 `main` 提交刷新或改写。

## 上游变化

上一次记录的 upstream `main` 游标是 `32b10caebb17230ab7c5a6027f17d3b2427c3481`。本轮 GitHub 比较得到两个后续提交，当前游标为 `f3325100d242cd161f30e50cf2b8444c0f156141`：

| 提交 | 官方观察 | 发布边界 |
| --- | --- | --- |
| [5066ddc](https://github.com/openfrontio/OpenFrontIO/commit/5066ddc38117de9b515e888d899a09380538f3e4) | Steam 账户设置中的商店促销显示开关扩展到结束页购买框，并加入一次性关闭促销提示；保留原存储键，网页和 Android shell 不变 | 只存在于 upstream `main`，不属于 v0.36.9 |
| [f332510](https://github.com/openfrontio/OpenFrontIO/commit/f3325100d242cd161f30e50cf2b8444c0f156141) | 玩家卡片增加称号展示、库存选择器、商店商品及“Get the look”联动；无称号目录时保持原渲染 | 只存在于 upstream `main`，不属于 v0.36.9 |

这些提交的 PR 正文是开发说明和测试说明，不是稳定版 Release。它们没有证据证明已进入玩家当前正式客户端，也没有宣布战斗、经济、地图、人数上限、权限或评分规则变化。站内只更新内部双游标记录，避免把开发中的商店或外观能力误写为当前版本承诺。

## 验收边界

本轮只维护 `docs/content-loop.md` 的游标和来源锚点；不运行 extract，不修改 `src/data`、版本配置、首页、changelog 或任何玩家攻略。下一次公共内容响应仍须由新的正式非 TEST Release、确认事实错误或已完成的 GSC final 窗口触发。
