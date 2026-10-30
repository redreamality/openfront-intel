# v0.35.9 五语正式版本维护

日期：2026-10-31。类型：正式 Release 响应，维护既有五语 `/changelog/v35/`，不新增 v0.35.9 独立机制页。

## 玩家任务与事实边界

玩家需要知道 v0.35.9 影响的是氏族捐赠榜与商店余额显示，而 v0.35.7 的 Tutorial、氏族 Map alpha、加载失败反馈和外观 AI 标签仍属于同一 v35 版本答案。官方 v0.35.9 Release（2026-10-30）只宣布：Clan Donations 标签页增加 Top donors 排行，按 caps 或 plutonium 展示贡献最多者；捐赠后 Store 不再停留在旧余额直到刷新页面。没有宣布战斗、经济、地图资源或大厅公式变化，因此本轮不改常青玩法数字。

## 实施

- `src/config/openfront-release.ts` 推进至 `v0.35.9`，使首页版本卡、最新入口、Freshness 与 Provenance 组件统一读取新游标。
- 五语 `src/content/changelog/*/v35.mdx` 同步 v35.9 标题、描述、直接答案、正式边界和官方 Release 链接；保留 v35.7、v35.6、v35.5 等历史版本边界。
- Rio de Janeiro 五语新地图页与来源包改以 v0.35.9 tag 核验；v0.35.9 的 Rio manifest、MapPlaylist 公式与 v0.35.7 相同，历史河流连接修复归因于 v0.35.5。
- GuideCatalog 五语共用目录新增 `riodejaneiro-map` 的 Naval、maps & teams 入口。

## 验收与退出

正式版本维护不套新长文的 3 Reddit、3 YouTube 和每语 1500 词门槛；Rio 新长文则保留这些门槛。v35.9 内容需通过 release/content/check/build/links/SEO 审计；Rio 需额外通过 `guide:audit`、五语分词/词数核验、图片渲染和入口链接检查。部署日为 T，版本文章和 Rio 页均在发布后转 Monitoring；下次触发为新的正式 Release、确认事实错误或各自完整 GSC final 窗口。
