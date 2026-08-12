# 2026-08-12 `ATTACK-01` 攻击比例孵化来源

本文件记录攻击比例候选的玩家问题、正式版本源码、需求信号、页面边界与本轮决策。Search Console 的 Query × Page 明细仍只保留在 `.cache/gsc/`，不提交到仓库。

## 编辑结论

- `ATTACK-01` 继续 Incubation，不晋级 Production，也不建立五语 `/guides/attack-ratio/`。
- 稳定事实足以解释单次攻击：默认比例是 20%，滑杆范围 1%–100%，默认键盘/滚轮步进是 10 个百分点；单次发送量为点击时当前兵力乘以比例。
- 上游开放 [Issue #4237](https://github.com/openfrontio/OpenFrontIO/issues/4237) 记录高比例快速双击可能意外 full-send。两段视频、另一位玩家的复现经历和维护者的同 tick 执行假设说明这是实际风险，但尚未形成已修复、可稳定复现的正式行为。
- 需求仍弱：28 天精确 `openfront attack ratio` 只有 1 次展现；把 attack、send troops、troop generation 和 how to win 等泛意图合并后也只有 10 次展现、0 点击。Feedlog 没有真实玩家帖子，站点 Issues 为 0。
- 下一决策门槛：#4237 被修复或行为被维护者明确，或 GSC、Feedlog、Issues 出现真实重复的攻击比例问题。届时再决定独立页，或把稳定答案并入现有经济页。

## v33.4 稳定事实

- [`UserSettings.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/core/game/UserSettings.ts) 将攻击比例默认值设为 `0.2`，默认调整步进为 10；无效或非正步进也回退到 10。默认键位为 `T` 降低、`Y` 提高。
- [`ControlPanel.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/client/hud/layers/ControlPanel.ts) 从设置读取比例，将它限制在 1%–100%，并在滑杆旁显示 `当前兵力 × 比例` 的预计发送量。
- [`PlayerActionHandler.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/client/hud/layers/PlayerActionHandler.ts) 对地面攻击和海运攻击都发送 `attackRatio × player.troops()`。
- [`AttackExecution.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/core/execution/AttackExecution.ts) 在执行时把请求兵力限制为当前可用兵力、立即扣兵，并把同一目标的地面攻击合并；海运攻击不参与该合并。
- 攻击比例决定“这一次拿多少当前兵力发出去”，不是对胜率、伤亡或占地量的直接承诺。目标兵力、地形、边界、Defense Post 和反击都会改变结果。

## 双击风险边界

- #4237 报告：50% 等高比例快速双击有时会把全部可用兵力发出；报告者期望连续两次按剩余兵力计算，即总计 75%，而不是两次都按同一初始兵力计算。
- Issue 包含两段视频和对应回放链接；另一位玩家报告鼠标硬件双击时多次遇到 100% full-send。维护者认为可能与同一 tick 创建两个攻击执行有关。
- 源码可以解释这一假设为何合理：客户端为每次输入计算当时可见兵力乘以比例；服务端执行逐个限制并扣除兵力，随后合并相同目标攻击。它不能证明每次双击都必现，也不能替代尚未落地的测试或修复。
- 在行为明确前，不能发布“50% 双击稳定等于 75%”或“高比例连续点击安全”的建议。若未来写玩家页，应把单击、等待一 tick 后再次发送、取消/撤退和鼠标双击故障列为独立失败场景。

## 与现有页面的边界

- 五语 `/mechanics/economy/` 继续负责“保留多少兵、何时停止扩张、增长区和威胁储备”。它已经说明 35%–50% 是安静边界的增长区，50%–70% 是受威胁时的储备区。
- 候选 `/guides/attack-ratio/` 若晋级，只负责把期望的攻击后储备换算为滑杆比例，并解释单次发送、连续点击、海运、反击和撤退。它不重复人口增长公式，也不把某一个比例写成全局最优。
- `/shortcuts/` 与 `/guides/hotkeys/` 只负责找到和练习 `T` / `Y` 调整，不承担不同局势投入多少兵的策略答案。

## 可验证的晋级定义

若候选晋级，至少需要：

1. 直接回答“我想保留多少兵时，滑杆应该设多少”。
2. 用两个可复现场景覆盖安静扩张与敌对边界，并明确攻击后的最低储备。
3. 解释同一目标连续点击、海运攻击、反击和撤退的差异。
4. 将 #4237 的最终状态写成已修复事实或明确的当前风险，不能保留模糊传闻。
5. 同步 en、zh、fr、de、nl，补至少两个自然入口和内容完整性 e2e。
