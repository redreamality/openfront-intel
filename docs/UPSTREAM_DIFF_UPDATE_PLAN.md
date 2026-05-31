# 上游 OpenFrontIO Diff 更新计划

> Diff 范围：`990eba6 ... main`
> 生成日期：2026-05-31

## 1. 概览

- **Baseline commit**：`990eba6`（"Improve MapPlaylist" PR #3904）。
- **上游领先多少**：核验时 `origin/main` 与 `990eba6` 实际为同一 commit（无新提交）；唯一的上游推进来自 **地图资源** 的变化（新增 10 张、修改 18 张）以及 v32 的 **test-release**（正文仍是占位 "TEST"）。
- **一句话结论**：**数值数据完全没变**（`units/structures/formulas` 及所有硬编码数值散文与 `Config.ts@990eba6` 一致），本轮唯一需要落地的实质工作是 **新增 10 张地图** + **5 张已有地图的显示名修正**；机制散文仅 1 处建议性措辞澄清；v32 changelog **暂不写**。

---

## 2. 新增地图（10 张）

| id | enName | zh | category | confidence |
|---|---|---|---|---|
| balkans | Balkans | 巴尔干 | Regional | high |
| caribbean | Caribbean | 加勒比海 | Regional | high |
| danishstraits | Danish Straits | 丹麦海峡 | Regional | high |
| indiansubcontinent | Indian Subcontinent | 印度次大陆 | Regional | high |
| korea | Korea | 朝鲜 | Regional | high |
| labyrinth | Labyrinth | 迷宫 | Arcade | high |
| northwestpassage | Northwest Passage | 西北航道 | Regional | high |
| onion | Onion | 洋葱 | Arcade | high |
| venice | Venice | 威尼斯 | Regional | high |
| yellowsea | Yellow Sea | 黄海 | Regional | high |

**分类汇总**：Regional ×8（balkans, caribbean, danishstraits, indiansubcontinent, korea, northwestpassage, venice, yellowsea），Arcade ×2（labyrinth, onion）。

### 精确动作

1. 在 `scripts/extract-game-data.mjs` 的 `MAP_CATEGORIES`（第 490 行起）把 8 个 id 加入 `Regional` 数组、2 个 id 加入 `Arcade` 数组（保持字母序）。
2. 在同文件 `MAP_I18N`（第 536 行起）追加下方 10 条。
3. 跑 `pnpm extract` 重新生成 `src/data/maps.json`（`database/maps` 页由该 JSON 驱动，自动更新；无需改页面）。

> 注意：`readMapDirs()` 会扫描本地 `OpenFrontIO/resources/maps/` 目录。**只有当本地 clone 已 `git pull` 到含这 10 张地图目录的版本时，`pnpm extract` 才会把它们写进 `maps.json`**；否则 fallback 会用 `MAP_CATEGORIES` 全量 flat 列表，因此提前补好 `MAP_CATEGORIES` 也能让它们出现。先 `git -C ../OpenFrontIO pull` 再 extract 最稳。

### 可直接粘贴的 `MAP_I18N` 追加片段

按 `MAP_I18N` 现有风格（每张地图一行，`enName/en` 用英文官名，其余为对应语种）：

```js
  // --- 新增地图 (upstream 990eba6...main) ---
  balkans: { enName: 'Balkans', en: 'Balkans', zh: '巴尔干', fr: 'Balkans', de: 'Balkan', nl: 'Balkan' },
  caribbean: { enName: 'Caribbean', en: 'Caribbean', zh: '加勒比海', fr: 'Caribéen', de: 'Karibik', nl: 'Caribisch' },
  danishstraits: { enName: 'Danish Straits', en: 'Danish Straits', zh: '丹麦海峡', fr: 'Détroits danois', de: 'Dänische Meerenge', nl: 'Deense Zeeëngen' },
  indiansubcontinent: { enName: 'Indian Subcontinent', en: 'Indian Subcontinent', zh: '印度次大陆', fr: 'Sous-continent indien', de: 'Indischer Subkontinent', nl: 'Indisch subcontinent' },
  korea: { enName: 'Korea', en: 'Korea', zh: '朝鲜', fr: 'Corée', de: 'Korea', nl: 'Korea' },
  labyrinth: { enName: 'Labyrinth', en: 'Labyrinth', zh: '迷宫', fr: 'Labyrinthe', de: 'Labyrinth', nl: 'Labyrint' },
  northwestpassage: { enName: 'Northwest Passage', en: 'Northwest Passage', zh: '西北航道', fr: 'Passage du Nord-Ouest', de: 'Nordwestpassage', nl: 'Noordwestpassage' },
  onion: { enName: 'Onion', en: 'Onion', zh: '洋葱', fr: 'Oignon', de: 'Zwiebel', nl: 'Ui' },
  venice: { enName: 'Venice', en: 'Venice', zh: '威尼斯', fr: 'Venise', de: 'Venedig', nl: 'Venetië' },
  yellowsea: { enName: 'Yellow Sea', en: 'Yellow Sea', zh: '黄海', fr: 'Mer Jaune', de: 'Gelbes Meer', nl: 'Gele Zee' },
```

### `MAP_CATEGORIES` 分组（把 id 并入对应数组，保持字母序）

```js
// Regional 数组追加：
'balkans', 'caribbean', 'danishstraits', 'indiansubcontinent', 'korea',
'northwestpassage', 'venice', 'yellowsea',

// Arcade 数组追加：
'labyrinth', 'onion',
```

---

## 3. 修改的已有地图（18 张）

绝大多数为 **纯美术/二进制变更**（`map.bin` / `map4x.bin` / `map16x.bin` / `thumbnail.webp` 或 `manifest.json` 内非显示名字段），站点 **无需动作**。仅有 **5 张** 因 `manifest.json` 的 **显示名（name）变化** 需要核对站点数据：

| id | 显示名变化 | 站点是否已正确？ |
|---|---|---|
| bajacalifornia | `bajacalifornia` → **Baja California** | ✅ 已是 `Baja California`（第 556 行）|
| greatlakes | `greatlakes` → **Great Lakes** | ✅ 已是 `Great Lakes`（第 575 行）|
| milkyway | `milkyway` → **Milky Way** | ✅ 已是 `Milky Way`（第 605 行）|
| southamerica | `Americas` → **South America** | ✅ 已是 `South America`（第 545 行）|
| straitofmalacca | `straitofmalacca` → **Strait Of Malacca** | ✅ 已是 `Strait of Malacca`（第 596 行）|

**结论**：这 5 张地图的官方显示名升级，本站 `MAP_I18N` **早已使用正式名称**，无需修改。其余 13 张（aegean, beringsea, beringstrait, bosphorusstraits, conakry, falklandislands, gulfofstlawrence, pluto, straitofgibraltar, straitofhormuz, surrounded, taiwanstrait, tradersdream）均为美术/二进制变更，**全部无需动作**。

> 唯一仍建议做的：重跑 `pnpm extract` 一次，让 `maps.json` 反映上游目录现状（顺带把新增地图带入），无须人工编辑任何地图条目。

---

## 4. 数值 / 数据页

**全部稳定，无需任何动作。**

- 重新运行 `extract-game-data.mjs` 后，仅 `_meta.json` 的时间戳变化；`units.json` / `structures.json` / `formulas.json` **逐字节相同**。
- `Config.ts@990eba6` 关键常量均未变：
  - `DEFENSE_DEBUFF_MIDPOINT = 150_000`
  - `DEFAULT_SPAWN_IMMUNITY_TICKS = 50`、`SAM_CONSTRUCTION_TICKS = 300`
  - AtomBomb `750_000` / HydrogenBomb `5_000_000` / MissileSilo `1_000_000`
- 受这些数据驱动或硬编码引用的页面（`database/units`、`database/structures`、`database/formulas`、`mechanics/nukes`、`mechanics/military`、`mechanics/structures`、`mechanics/basics`、`mechanics/alliances`）的数值全部与上游一致，**无需改任何数字**。

---

## 5. 机制 / 散文页

### 已确认需要处理（CONFIRMED）

严格按 `allVerdicts`（唯一判定）：**没有页面构成硬性的事实错误（needsUpdate 全为 false）**。机制扫描另把下面这条标为 high，作为 **建议性措辞澄清**（非阻断、非数值）：

- **页面**：`src/pages/mechanics/structures.astro`（第 61–62 行）
- **现状原文**：
  > "When territory is captured, **buildings transfer to new owner** (including SAM and Silo). Late-game attacks on enemy core cities can strip their nuclear shield—a critical strike target."
- **问题**：用 "including SAM and Silo" 举例，未明确 DefensePost 行为；按 PR #4016，**DefensePost 在被占领时是被摧毁而非移交**，措辞可能误导。
- **建议修正**（澄清式，不改数值）：把 Callout 正文改为明确区分：
  > "SAM Launcher and Missile Silo transfer to the new owner upon capture, while Defense Posts are destroyed."（中/法/德/荷四语同步对应措辞）

> 判定层级说明：`allVerdicts` 认为原句用 "including" 属举例、未与新机制直接矛盾，故 `needsUpdate=false`；建议把它当作 **低风险的可选澄清**，与新增地图一并提交即可，不必单独阻塞发布。

### 缺少专门页面的新功能（可选新内容点子）

本轮 diff 未带来需要新建机制页的强信号；若要顺手补内容，可考虑：

- **DefensePost 占领即摧毁（PR #4016）**：可在 `mechanics/structures` 或 `mechanics/military` 增设一小节，系统讲“占领时哪些建筑移交 / 哪些被摧毁”，把上面的澄清扩展成完整知识点。
- （非必须）随官方 v32 正式发布后，再评估是否有新机制需要建页。

---

## 6. Changelog

- 本地最新为 **v31**（en/zh/fr/de/nl 五语齐全）。
- 上游 v32 当前 **只有 test-release**（最新 `v0.32.0-test-release3`，2026-05-29），release 正文仍是占位 **"TEST"**，**没有真实补丁说明**。
- **建议：暂不写 v32 changelog（WAIT）**。遵循项目约定“只有 GitHub Release 正文有真实内容时才写”，等官方 v32 正式发布、正文落地后再补 `src/content/changelog/{lang}/v32.mdx`（沿用现有 frontmatter）。

---

## 7. 执行清单（按序，可复制）

> ✅ = 现在就能做（safe-now）；⛔ = 阻塞，等官方 v32 正式 release。

```bash
# ── 1. 同步上游 clone，确保新增地图目录就位（safe-now）
git -C ../OpenFrontIO pull

# ── 2. 编辑脚本（safe-now）：scripts/extract-game-data.mjs
#   (a) MAP_I18N (≈第 536 行起) 追加第 2 节的 10 条
#   (b) MAP_CATEGORIES (≈第 490 行起):
#       Regional 加 8 个 (balkans/caribbean/danishstraits/indiansubcontinent/
#                         korea/northwestpassage/venice/yellowsea)
#       Arcade   加 2 个 (labyrinth/onion)

# ── 3. 重新抽取数据（safe-now）→ 重写 src/data/maps.json + _meta.json
pnpm extract

# ── 4. （可选 safe-now）机制澄清：编辑 src/pages/mechanics/structures.astro
#       第 61-62 行 Callout，明确 DefensePost 被摧毁 / SAM+Silo 移交（5 语同步）

# ── 5. 构建校验（safe-now）
pnpm build

# ── 6. e2e（safe-now）—— 若动了 structures.astro 等 UI，按约定补/更新 e2e/*.spec.ts
pnpm test:e2e

# ── 7. 提交（safe-now）—— 分支后提交；仓库默认私有
git checkout -b chore/upstream-990eba6-maps
git add scripts/extract-game-data.mjs src/data/maps.json src/data/_meta.json \
        src/pages/mechanics/structures.astro
git commit   # 信息描述：新增 10 张地图 + DefensePost 占领措辞澄清

# ── ⛔ 8. 阻塞：等官方 v32 正式 release 正文落地后再写
#       src/content/changelog/{en,zh,fr,de,nl}/v32.mdx
#       （现在 test-release 正文是 "TEST"，不要据此编造）
```

**数值/已有地图相关：第 4、第 3 节确认无需任何手工数据编辑。**
