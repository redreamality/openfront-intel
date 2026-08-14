# 2026-08-14 `ROOM-01` 私人房设置来源包

## 编辑结论

- `ROOM-01` 晋级为一次 Production 事实纠错，但合并到五语 `/mechanics/modes/`；取消独立 `/guides/private-room-settings/` 候选。
- 五语 FAQ 只保留当前 Host 能力的短答并导向 modes，不再维护第二份字段清单。
- 原因不是页面数量不足，而是现有 modes 与 FAQ 把 `isPeaceTime`、`isNukesDisabled`、`isSAMsDisabled`、`isPortsDisabled` 等公开轮换内部字段误写成普通房主可点选控件，玩家会在正式 v33.4 Host 界面里照做失败。
- 28 天最后有效 GSC 只有 4 个相关 Query、6 次展现、0 点击；需求支持修正现有主答案，不支持五语新路由。

## 正式版本与源码边界

最新正式非 TEST Release 仍是 [`v0.33.4`](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.4)，发布于 2026-08-11。普通房主界面的事实由正式 tag 的以下一方源码共同确认：

- [`HostLobbyModal.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/client/HostLobbyModal.ts)：模式、地图、AI、出生、资源、白名单、匿名和 Host Cheats 等 Host 控件。
- [`GameConfigSettings.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/client/components/GameConfigSettings.ts)：设置组件与范围。
- [`Schemas.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/core/Schemas.ts#L316-L377)：配置结构；其中 public modifiers 的存在不代表普通 Host UI 暴露同名控件。
- [`Config.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/core/configuration/Config.ts#L608-L613)：未自定义时联盟默认 5 分钟，自定义 0 分钟禁用，1-15 分钟覆盖。
- [`Worker.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/server/Worker.ts#L261-L306) 与 [`GameServer.ts`](https://github.com/openfrontio/OpenFrontIO/blob/v0.33.4/src/server/GameServer.ts#L1652-L1662)：白名单或 Host Cheats 与公开列房互斥，公开 hosted lobby 另有房主资格限制。

本轮核验时，以上三个关键客户端/Schema 文件在正式 tag 与上游 `main` 的 blob 相同。tag 后 Water Nukes 等修复不改变本次房主设置结论；未发布代码也没有被写成 v33.4 能力。

## 当前 Host 能力与玩家决策

| 目标 | 当前可用设置 | 正确边界 |
|---|---|---|
| 公平朋友局 | 白名单、标准资源、公开或私链 | Host Cheats 关闭；所有全局资源变化提前公开；白名单房不能公开列出 |
| 固定队伍训练 | Team、队伍数量、Random Spawn、Compact Map、免疫 | Team 自动启用金币和部队捐赠；要练相邻出生时关闭 Random Spawn |
| 机制实验 / 教学 | Infinite Gold/Troops、Instant Build、倍率、Starting Gold、禁用单位、特殊模式 | 对称实验用全局设置；Host Cheats 只适合房主单边演示，不能证明正常经济结论 |
| 赛事 / 连续多局 | 匿名与实名揭示、白名单、时限、开局延迟、规则清单 | 当前没有具名可保存 preset；复用房间链接后仍需逐项复核 |

Water Nukes、Doomsday、联盟生命周期和第一局出生分别保留既有唯一主答案。modes 只解释何时开启或关闭相关设置，并导流而不复制完整攻略。

## 真实问题与失败反例

- 上游 [`#2489`](https://github.com/openfrontio/OpenFrontIO/issues/2489) 记录赛事组织者反复配置同一房间的痛点；Issue 已获批准并进入 v34 milestone，但仍开放，因此只能写“preset 尚未上线”。
- 上游 [`#4951`](https://github.com/openfrontio/OpenFrontIO/issues/4951) 报告房主可临开局改变规则并立即开始；该 Issue 尚未批准、没有成熟讨论，只能作为“开局前重新核对”的谨慎失败反例，不能写成已确认高频问题或已修复能力。
- OpenFrontIO Discussions 未启用；没有可用的官方 Discussions 玩家池。站点 Issues 为 0，Feedlog 没有新的真实重复问题。

## Search Console

本轮按要求顺序运行 7 天与 28 天刷新，并分别只重试一次；四次请求均在没有可用代理的 Google API 等待中超时，缓存文件未改写。因此明确回退 2026-08-13 生成、截止 2026-08-10 的最后有效报告：

- 7 天：2026-08-04 至 2026-08-10，921 个 Query、1,867 条 Query x Page；私人房相关 Query 为 0。
- 28 天：2026-07-14 至 2026-08-10，1,298 个 Query、3,229 条 Query x Page；相关共 4 个 Query、6 次展现、0 点击，主要是公开 lobby 创建与 alliance duration。

该低量数据不能支撑新路由，但也不会抵消源码已经证明的现有页面事实错误。

## 完成定义

1. 五语 `/mechanics/modes/` 先给直接答案，再覆盖公平朋友局、固定队伍训练、机制实验和赛事连续多局。
2. 五语 FAQ 不再把四个 public modifier 字段列为普通私人房控件，只保留短答和主答案链接。
3. 五语 mechanics 索引与 FAQ 各提供一个自然入口；特殊模式和联盟只导向既有主答案。
4. 页面明确联盟 0 / 1-15 / 默认 5 分钟、Random Spawn 对固定队友训练的影响、白名单或 Host Cheats 与公开列房互斥、preset 尚未上线，以及开局前人工复核规则。
5. 严格内容审计、Astro check、build、link check、五语内容 e2e 与完整 Playwright 通过。
