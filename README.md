# OpenFront 情报站 · openfront-intel

围绕开源 RTS 游戏 [OpenFront.io](https://openfront.io/) 整理的中文情报与攻略站。

- **机制 10 篇** — 出生、经济、军事、建筑、单位、核武、同盟、火车、贸易、模式。
- **数据库 4 页** — 单位 / 建筑 / 公式 / 地图分类与分析（数量由 extract 自动同步）。
- **战术攻略 4 篇 + 教程 3 篇（每种语言）** — FFA / Team / 海战 / 核威慑 / 新手第一局 / 快捷键 / 水上核弹。
- **版本笔记** — v24–v31 官方 Release 的整理与解读。
- **站点反馈** — 可接入 Feedlog 反馈面板与公开路线图，未配置时回退到 GitHub Issues。
- **发布者透明度** — 五语隐私政策、联系页与编辑政策，Analytics 仅在访客明确同意后加载。

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
pnpm dev   # 浏览器打开 http://localhost:4321/

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
5. 项目页部署时访问 `https://<your-username>.github.io/openfront-intel/`；本仓库当前使用根路径自定义域名 `https://openfront.fyi/`。

### AdSense 与认证 CMP

站点已包含 Google Funding Choices 的加载能力，但默认关闭。启用前必须先在 AdSense 的 **Privacy & messaging** 中为 `openfront.fyi` 创建并发布适用的同意消息，随后在 GitHub 仓库的 Actions variables 中设置：

```text
PUBLIC_GOOGLE_CMP_ENABLED=true
```

workflow 会在生产构建时读取该变量。未发布消息时不要开启，否则站点可能加载一个没有可用配置的 CMP。现有站内横幅只管理可选 Google Analytics；Funding Choices 负责法律要求地区的广告同意。`PUBLIC_GOOGLE_CMP_SCRIPT_SRC` 仅用于 e2e 的无网络 stub，生产环境不得设置。

### Feedlog 反馈与路线图

[Feedlog](https://github.com/linkcraftstudio/feedlog) 是需要数据库和服务端运行时的独立 Nuxt 应用，不能直接部署进本站的 GitHub Pages 静态产物。推荐将 Feedlog 部署到 `feedback.openfront.fyi` 等独立子域名，再把公开入口交给本站构建：

1. 按 Feedlog 官方文档部署到 Cloudflare Workers、Vercel 或 Docker。Feedlog 至少需要 PostgreSQL 17 + `pgvector`、`DATABASE_URL`、`BETTER_AUTH_SECRET` 与 `SYSTEM_ADMIN_EMAILS`。
2. 在 Feedlog 后台创建 OpenFront Intel workspace、反馈 board，并配置品牌信息。
3. 在本仓库 Settings → Secrets and variables → Actions → Variables 中设置：

   ```text
   PUBLIC_FEEDLOG_URL=https://feedback.openfront.fyi
   ```

4. 重新运行 Pages workflow。主导航和页脚会链接到 Feedlog，页脚同时展示其 `/roadmap` 入口。

`PUBLIC_FEEDLOG_URL` 只是公开地址，不得写入数据库连接、管理员邮箱、OAuth 密钥或 SSO 密钥。变量缺失时，“反馈”入口会回退到本站 GitHub Issues，不会生成失效链接。本项目目前没有用户账户，因此不接入 Feedlog SSO；将来若增加登录系统，JWT 必须由受信任的服务端签名，不能在 Astro 静态前端保存共享密钥。

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
