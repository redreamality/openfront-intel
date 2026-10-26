# 2026-10-26 前排竞争页正文核查

范围：主研究已在 Google 的 openfront guide / open front guide / how to play openfront 搜索结果发现以下站点；本记录只核验页面内容，不用一次搜索快照证明历史排名原因，不包含 GSC 私有指标。访问方式为 Codex 内置浏览器实际加载正文。web.run 未返回可用内容，已回退浏览器；三站均可读。

## 竞争页的真实长处与缺口

| 页面 | 实读观察 | 可借鉴之处 | 明确弱点 |
|---|---|---|---|
| [Miraheze Attacking Guide](https://openfront.miraheze.org/wiki/Attacking_Guide) | 页首有过时警告与 v23.0 标记；目录涵盖人口、增长推导、盾牌、攻击、叛盟、防御塔与速度。数值以公式和列表展示，正文有 GitHub 仓库链接及作者署名，页脚最后编辑为 2026-08-11。图像主要是数学公式，未见实战操作截图。 | 同一页解释连续相关机制；精确机制名、列表和目录便于定位，数值解释可独立引用。 | 编辑日期不等于适用最新版本。对纯新手，开头长公式推导也不直接。不能复制其 v23 数值当作当前事实。 |
| [Fandom HOW_TO_PLAY](https://openfront.fandom.com/wiki/HOW_TO_PLAY) | 页面标记 stub。正文只有基本操作与径向菜单两组：鼠标、Space、滑杆，以及剑、船、扳手、信息、外交图标说明。正文图像为 0，未见文章版本或明确事实来源。 | 用动作和界面对象直接回答“怎么操作”；读者可立即对应游戏画面。 | 篇幅短、缺完整开局路线和当前版本证据；关于背叛的陈述不能据此作为最新事实。前排出现不证明内容全面或准确。 |
| [OpenFront Wiki 首页](https://openfront.wiki/) | 首页显示 v0.35.0，按主题直达 Combat、Gold、Bots、Buildings、Port、Train 等；展示 v35 更新摘要和游戏/Discord/GitHub/Steam 链接，嵌入 Lonely_Millennial 的新手与团队视频。 | 游戏名词导航清楚；把版本、机制、社区、视频放在一个可发现入口。 | 页脚声明与品牌所有者无关联，不能仅凭 SERP 的 official 文案认定官方背书。其突出推荐的 [Early Game](https://openfront.wiki/Early_Game/) 实际仅一条施工中说明，无可执行开局正文。 |

这些页面的存在提供了具体设计参照，不足以确定反向链接、域名权重、点击行为或 Google 排名因素。未观看 Wiki 内嵌视频，不将视频标题、封面或嵌入状态记为已分析视频。

## 本站同任务页面对照

补充法语结果：[Mychromebook.fr 初学者指南](https://mychromebook.fr/comment-jouer-et-gagner-a-openfront-io/) 于本轮法语 Google openfront tuto（hl=fr、gl=fr、pws=0）中出现在本站之前。已打开正文核查：作者 Nicolas、发布日期 2025-05-05、标注阅读 7 分钟；正文依次解释选出生点、点击相邻格、攻击滑杆、人口分配、建筑、海军、外交，再给五条获胜建议。有建筑作用表、提示框，以及建筑菜单和外交菜单的截图链接。它的优势是动作明确、列表短、原生法语口吻与作者身份清楚；不是更长或更新。正文仍有六边形地图、Destroyer、旧城市人口等需要独立核实的陈述，不能拿来作当前玩法依据。本站法语入门改善可借鉴其操作顺序和菜单视觉对应，并使用当前正式版本事实。本文未以这篇旧文章的内容结构推断其排名原因。

本地核对文件：[first-match](../../src/content/guides/en/first-match.mdx)、[guides 索引](../../src/pages/guides/index.astro)。核对日期 2026-10-26；本小节反映工作树源文件，不假设部署产物同步。

- first-match 标题已经明确 How to Play / Beginner Tutorial，描述也覆盖出生、扩张、留兵、建筑。已有直接答案和首分钟、前三分钟、建筑、外交、海军、核武、FAQ 等完整结构，不能简单建议“再加教程关键词”。
- 但首段主要讲稳健扩张与局势判断。后续首分钟步骤仍使用“适中投入”“观察结果”等抽象表述；精确的第一次点击、打开菜单、如何看到攻击比例等基本动作不在首屏。Fandom 的具体操作映射补到了这一层需求。
- first-match 源文件未检出图片、视频或 iframe 标记，缺可直接对照当前游戏 UI 的实战图解；竞争者 Miraheze/Fandom 也并非靠实战图片更强，不能把缺图写成已证明掉排名原因。
- frontmatter 仍为 version v33、updatedDate 2026-09-05，freshnessSummary 讲 v33.11 Overtime。需要核验后更新入门页事实与适用版本；不能只改日期制造新鲜度。
- guides 索引已有 SearchAnswerPaths、CollectionIntro 和大量问题卡片，且全文目录按更新/发布日期排序。应先实际核对搜索入口如何承接以及首屏优先级，不宜机械追加更多同层链接。

## 建议纳入主执行计划

1. 保留 first-match 为初次上手主答案。在正文开头加入可验证的短操作序列，区分桌面与触屏：进入哪种练习局、在哪点出生、第一次如何扩张、如何调比例、如何打开建筑菜单、何时停手。事实由当前正式版本核验。
2. 采用真实 UI 标注截图或原生示意图，演示“操作—界面反馈—下一步判断”；不为补图伪造游戏画面。保留深度解释，但让第一次操作先完成。
3. 保留 guides 索引的发现职责，以少量主要任务入口组织优先级。新手应直接到 first-match，快捷键到 shortcuts，特定数值到机制/数据库；不新建另一个泛 beginner guide。
4. 比较版式和任务完成度时，要记录竞品的弱点：我们可以提供兼具当前事实与可执行动作的完整答案。不要模仿旧 Wiki 的旧数字，也不要为了与短 stub 一样长而整体删减已有深度内容。

## 验证与限制

- 实读 4 个站点、5 个 URL；均读取实际正文，未把搜索摘要当全文。
- 只产出研究文档，无公开页面变更，无需构建或 e2e。
- 查询源码时一度把索引猜成 src/pages/guides.astro，rg 报路径缺失；已按文件枚举改读 src/pages/guides/index.astro，结论来自恢复后的有效读取。复发记录已追加 tooling-filesystem runbook，未修改 AGENTS.md。
