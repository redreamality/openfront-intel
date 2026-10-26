# 手机与长尾搜索入口维护

日期：2026-10-26。维护范围为五语已有 mobile-app-download 短答案，以及录像播放、复盘、地图尺寸和 MIRV 的正文前速查组件；不新增同义长文，不修改游戏数据 JSON。

## 已核验的一手依据

- [官方游戏首页](https://openfront.io/)：浏览器实际加载显示 v0.35.4、SOLO/TUTORIAL/CREATE LOBBY 等游戏入口，以及官方 Steam 链接。检查时间 2026-10-26。页面没有展示 Google Play/App Store 链接，但这不能证明商店里不存在任何应用。
- [官方首页指向的 Steam 页面](https://store.steampowered.com/app/3560670/OpenFront/)：本轮只核对首页实际链接关系，不引用价格、操作系统清单或购买承诺。
- [v0.35.4 iOS 主屏幕提示组件](https://github.com/openfrontio/OpenFrontIO/blob/v0.35.4/src/client/components/IOSAddToHomeScreenBanner.ts)：明确 Share → Add to Home Screen → 打开新图标；standalone 模式隐藏提示。用本地已存在 tag 的 git show 核对。
- [v0.35.4 ReplayEntry](https://github.com/openfrontio/OpenFrontIO/blob/v0.35.4/src/client/replay/ReplayEntry.ts)：New Replay Viewer 为 opt-in；game ID 进入 replay-viewer hash，旧版本有 versioned shell 及 classic fallback。新组件不承诺所有旧录像永久可播。
- 地图与 MIRV 组件只摘取现有页面的稳定概念，不刷新旧正文的版本标签：总网格与可用陆地不同、Compact 并非缩放；MIRV 载体与分离弹头的防御边界。原文的特定版本尺寸、价格、阈值仍保留其版本范围，不包装为全量最新事实。

web.run 的搜索和打开调用返回空内容，已回退实际浏览器官方首页与本地正式 tag。没有把空结果解释为网页不存在，也没有据 GitHub Release 附件缺失推断整个应用商店生态。

## 内容与实现

- MobilePlatformRoutes：五语 Android、iOS、桌面卡片；一个直接官方网页按钮，桌面 Steam 入口，触控与第一场教程链接。使用普通链接和完整服务端 HTML，不需要脚本或推断用户设备。
- mobile-app-download：保持既有短答案类型，去掉“本文如何核验”的正文，给主屏幕步骤及平台区别；官方证据留在 freshnessSummary 和简短参考链接。修改更新日期反映实际核验。
- LongTailAnswers：录像查看器和复盘互链；地图尺寸连接数据库/单图攻略；MIRV 连接价格与防御。只在四类目标页渲染，五语 URL 按现有路由生成。
- 组件放在 DocLayout 标题后，先完成用户操作或决策，再进入旧长文。原长文内容与各 H2/H3 字数未改，不新造需扩写的正文小节。
- 不建立 tracker；它仍是需求与数据可用性待验证项，由主研究处理。

## 回归合同

新增 e2e/mobile-longtail-recovery.spec.ts：五语手机视口卡片与官方 href、真实点击到触控页；录像播放/复盘双向点击；地图数据库、MIRV 价格和防御页真实点击。

旧 e2e/mobile-intent-pages.spec.ts 的官网/Release 链接数量属于旧版式假设，应改为按用途定位并保留官方来源断言，由主代理统一更新。组件无 props，内部根据当前 URL 判断是否渲染；共享 DocLayout 接入由主代理负责。

局部验证：`git diff --check` 通过；Playwright `--list` 成功识别 15 条新增用例；`.cache/verify-mobile-longtail.mjs` 检查五语核验日期/版本、Steam URL 和 40 个攻略源文件目标，全部通过。这些不等于浏览器断言已运行；全套构建/e2e 由主代理统一执行，结果见主交付报告。
