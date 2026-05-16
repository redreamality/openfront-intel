# OpenFront 情报站 · openfront-intel

围绕开源 RTS 游戏 [OpenFront.io](https://openfront.io/) 整理的中文情报与攻略站。

- **机制 10 篇** — 出生、经济、军事、建筑、单位、核武、同盟、火车、贸易、模式。
- **数据库 4 页** — 单位 / 建筑 / 公式 / 78 张地图。
- **战术攻略 3 篇 + 教程 2 篇** — FFA / Team / 核威慑 / 新手第一局 / 快捷键。
- **更新日志** — v24 完整变更解读。

## 技术栈

- [Astro 5](https://astro.build) + Tailwind CSS 3 + @astrojs/mdx
- 纯静态（`output: 'static'`），部署到 GitHub Pages
- pnpm 包管理
- `scripts/extract-game-data.mjs` 在 `prebuild` 阶段自动从同级目录的 `OpenFrontIO/` 仓库提取数值生成 `src/data/*.json`

## 本地开发

```bash
# 1. 在同级目录克隆 OpenFrontIO（可选，但推荐）
cd ..
git clone --depth 1 https://github.com/openfrontio/OpenFrontIO.git
cd openfront-intel

# 2. 装依赖与启动开发服务器
pnpm install
pnpm dev   # 浏览器打开 http://localhost:4321/openfront-intel/

# 3. 构建生产版本
pnpm build
pnpm preview
```

> 没有 `../OpenFrontIO/` 也能构建——脚本会回退到内置的 v24 数据快照。

## 数据更新

OpenFrontIO 发布新版本时：

```bash
cd ../OpenFrontIO
git pull --depth 1
cd ../openfront-intel
pnpm extract            # 重新生成 src/data/*.json
pnpm build              # 验证构建
```

如需更新内置快照（用于无源码 CI），编辑 `scripts/extract-game-data.mjs` 顶部的 `UNIT_SNAPSHOT` / `FORMULAS_SNAPSHOT` / `MAP_CATEGORIES` 常量。

## 部署到 GitHub Pages

1. 在 GitHub 上创建空仓库 `<your-username>/openfront-intel`。
2. 在仓库 Settings → Pages → Build and deployment → Source 选 **GitHub Actions**。
3. 推送代码：
   ```bash
   git init -b main
   git remote add origin git@github.com:<your-username>/openfront-intel.git
   git add .
   git commit -m "init: 初始化情报站"
   git push -u origin main
   ```
4. Actions 自动跑 `.github/workflows/deploy.yml`：拉取 OpenFrontIO 源码 → 装包 → 构建 → 发布到 Pages。
5. 访问 `https://<your-username>.github.io/openfront-intel/`。

### 自定义域名

如需绑定独立域名：

1. 在 `public/` 目录放 `CNAME`（一行文本，例如 `intel.example.com`）。
2. 在 DNS 提供商加 CNAME 记录指向 `<your-username>.github.io`。
3. 修改 workflow 中的 `SITE_URL` 与 `BASE_PATH`（独立域名 base 为 `/`）。

## 目录结构速览

```
openfront-intel/
├── scripts/extract-game-data.mjs   # 数据提取脚本
├── src/
│   ├── content/
│   │   ├── guides/                  # 教程 MDX
│   │   ├── strategies/              # 攻略 MDX
│   │   └── changelog/               # 版本笔记 MDX
│   ├── data/                        # 自动生成的 JSON（提交进库）
│   ├── layouts/                     # BaseLayout / DocLayout
│   ├── components/                  # Header/Footer/Nav/TOC/UnitTable/...
│   └── pages/
│       ├── mechanics/               # 10 篇机制
│       ├── database/                # 4 页数据库
│       ├── strategies/[...slug].astro
│       ├── guides/[...slug].astro
│       ├── changelog/[...slug].astro
│       ├── glossary.astro
│       ├── faq.astro
│       ├── about.astro
│       ├── 404.astro
│       └── rss.xml.js
└── .github/workflows/deploy.yml
```

## License

- 网站代码：MIT
- 网站文字：CC BY-SA 4.0（请注明来源）
- OpenFront 源码遵循 AGPL-3.0，资源遵循 CC BY-SA 4.0，归 © OpenFront and Contributors。

本站为社区资料站，非官方。
