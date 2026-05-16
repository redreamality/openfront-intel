# OpenFront 情报站 · 项目概览

## 线上地址

- **站点**: https://redreamality.github.io/openfront-intel/
- **仓库**: https://github.com/redreamality/openfront-intel (public)
- **RSS**: https://redreamality.github.io/openfront-intel/rss.xml

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Astro | ^5.12.8 |
| 样式 | Tailwind CSS | ^3.4.17 |
| 排版 | @tailwindcss/typography | ^0.5.15 |
| 内容 | @astrojs/mdx | ^4.0.8 |
| SEO | @astrojs/sitemap + astro-robots-txt | latest |
| 包管理 | pnpm | 9.x |
| 部署 | GitHub Pages + Actions | - |

## 内容架构

### 页面统计：30 页

| 栏目 | 页数 | 说明 |
|------|------|------|
| 首页 | 1 | 导航入口 + 关键档速查 |
| 机制 | 11 | index + 10 篇系统讲解 |
| 数据库 | 5 | index + units/structures/formulas/maps |
| 攻略 | 4 | index + 3 篇 MDX |
| 教程 | 3 | index + 2 篇 MDX |
| 更新日志 | 2 | index + v24 |
| 辅助 | 4 | glossary/faq/about/404 |

### 机制章节（10 篇）

1. **basics** — 出生免疫 50 ticks、阶段时长、起手决策
2. **economy** — 金币 100/tick、贸易船、火车收益
3. **military** — 地形 mag/speed、防御工事 ×5/×3、大军减益
4. **structures** — City/Port/Factory/DefensePost/SAM/Silo
5. **units** — 运输船/战舰/贸易船/火车/炮弹
6. **nukes** — AtomBomb 750k / HydrogenBomb 5M / MIRV 25M+15M·n
7. **alliances** — 3000 ticks 同盟、背叛 ×0.5/×0.8
8. **trains** — Factory→Train、铁路 120 tiles、盟友 35k/站
9. **trade** — 贸易船 cap 150、距离收益曲线
10. **modes** — FFA/Duos/Trios/Quads/Team/Tournament

### 攻略文章

- FFA 出生与早期扩张
- 核威慑与 SAM 网络
- Team 模式：海上控制流派

### 教程

- 新手指南：第一局
- 快捷键速查表

## 数据提取机制

### 脚本位置
`scripts/extract-game-data.mjs`

### 数据来源
从同级目录 `../OpenFrontIO/` 读取：
- `src/core/configuration/Config.ts` — 单位成本公式
- `src/core/game/Game.ts` — UnitType 枚举
- `resources/maps/` — 78 张地图目录

### 输出文件
```
src/data/
├── _meta.json      # 采集时间、来源、版本
├── units.json      # 16 种单位完整数据
├── structures.json # 6 种建筑子集
├── formulas.json   # 攻防/人口/经济公式
└── maps.json       # 78 张地图分类
```

### 运行方式
- **本地**: `pnpm extract` 或 `pnpm build`（prebuild 自动触发）
- **CI**: workflow 自动 sparse checkout OpenFrontIO 后运行
- **无源码**: 回退到内置 v24 快照

## 关键数值速查（v24）

| 项目 | 值 |
|------|-----|
| AtomBomb | 750,000 G |
| HydrogenBomb | 5,000,000 G |
| MIRV | 25M + 15M × 已发射数 |
| SAM 射程 | 70 → 150 tiles (按等级) |
| SAM 冷却 | 90 ticks |
| 同盟时长 | 3000 ticks ≈ 5 分钟 |
| 背叛减益 | 防御 ×0.5, 速度 ×0.8, 持续 300 ticks |
| 城市部队加成 | +250,000 / 级 |
| 贸易船上限 | 150 艘 (v24) |
| 出生免疫 | 50 ticks (5 秒) |
| 防御工事范围 | 30 tiles, mag ×5, speed ×3 |

## 目录结构

```
openfront-intel/
├── .github/workflows/deploy.yml  # GitHub Pages CI/CD
├── scripts/extract-game-data.mjs # 数据提取
├── src/
│   ├── content/                  # MDX 内容
│   │   ├── guides/               # 教程
│   │   ├── strategies/           # 攻略
│   │   └── changelog/            # 版本笔记
│   ├── data/                     # 自动生成 JSON
│   ├── layouts/                  # BaseLayout / DocLayout
│   ├── components/               # 14 个组件
│   │   ├── UnitTable.astro       # 单位数据表
│   │   ├── MapGrid.astro         # 地图网格
│   │   ├── FormulaBlock.astro    # 公式展示
│   │   ├── Callout.astro         # 提示框
│   │   └── ...
│   └── pages/                    # 路由页面
│       ├── mechanics/            # 10 篇机制
│       ├── database/             # 4 页数据库
│       ├── strategies/           # 攻略路由
│       ├── guides/               # 教程路由
│       └── ...
└── public/
    └── favicon.svg
```

## 部署流程

1. push 到 main 分支
2. GitHub Actions 触发 `.github/workflows/deploy.yml`
3. Sparse checkout OpenFrontIO（仅 src/core + resources/maps）
4. `pnpm install` → `pnpm build`（含 prebuild 数据提取）
5. 上传 `dist/` 到 GitHub Pages
6. 自动发布到 https://redreamality.github.io/openfront-intel/

### 定时更新
- Cron: `17 4 * * 1`（每周一 UTC 04:17）
- 自动同步 OpenFrontIO 数值变化

## 视觉风格

- **主题**: 深色军事/策略风
- **主色**: 炮橙 #d97706、军绿 #4d7c0f
- **背景**: 铁灰 #0b0f17 ~ #1f2937
- **排版**: prose-invert + @tailwindcss/typography

## 后续扩展方向

- [ ] 地图预览图（从游戏截图或 minimap 提取）
- [ ] 更多攻略文章（Duos/Trios 配合、内陆流派）
- [ ] 英文版本（目录已预留 /en/）
- [ ] 互动计算器（成本/收益模拟）
- [ ] 社区投稿入口

---

**创建日期**: 2026-05-16  
**数据版本**: OpenFrontIO v24  
**维护者**: redreamality
