#!/usr/bin/env node
/**
 * Extracts unit/structure/map/formula data from the upstream OpenFrontIO source.
 *
 *   Expected layout:
 *     <sandbox>/OpenFrontIO/    (cloned source)
 *     <sandbox>/openfront-intel/ (this site — runs the script from here)
 *
 * Writes JSON to ./src/data/. Falls back to a built-in v24 snapshot when the
 * source repo is not present, so the site can still build (e.g. on a CI box
 * that only has this repo checked out).
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = join(ROOT, 'src', 'data');
const SOURCE_DIR = resolve(ROOT, '..', 'OpenFrontIO');

mkdirSync(OUT_DIR, { recursive: true });

const HAS_SOURCE = existsSync(SOURCE_DIR);
const meta = {
  generatedAt: new Date().toISOString(),
  source: HAS_SOURCE ? SOURCE_DIR : 'embedded-snapshot-v24',
  upstreamVersion: 'v24',
};

// ---------------------------------------------------------------------------
// Snapshot — last-known-good v24 data, used as fallback and also as the
// canonical metadata layer (cost formulas, descriptions, categories) that the
// source code does not provide directly in human-readable form.
// ---------------------------------------------------------------------------

const UNIT_SNAPSHOT = [
  {
    id: 'TransportShip',
    name: '运输船',
    enName: 'Transport Ship',
    category: 'ship',
    role: '海上登陆载具，从港口或海岸生成。',
    cost: 0,
    costFormula: '免费（消耗发起者部队）',
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    notes: [
      '受 isWaterNukes / isPortsDisabled 影响',
      '战舰会优先打击运输船',
    ],
  },
  {
    id: 'Warship',
    name: '战舰',
    enName: 'Warship',
    category: 'ship',
    role: '海上控制单位，发射 Shell 攻击敌方船只/海岸。',
    cost: 250000,
    costFormula: 'min(1,000,000, (n+1) × 250,000)，n = 已有战舰数',
    maxHealth: 1000,
    damage: 250,
    constructionDuration: 50,
    upgradable: false,
    notes: [
      '生命值 ≤ 750 自动撤退',
      'v24 起优先击中运输船且击中后立即冷却',
    ],
  },
  {
    id: 'Shell',
    name: '炮弹',
    enName: 'Shell',
    category: 'projectile',
    role: '战舰与防御工事发射的实体炮弹。',
    cost: 0,
    costFormula: '由战舰/防御工事自动生成',
    maxHealth: null,
    damage: 250,
    constructionDuration: null,
    upgradable: false,
    notes: ['命中可被障碍物拦截'],
  },
  {
    id: 'SAMMissile',
    name: 'SAM 拦截弹',
    enName: 'SAM Missile',
    category: 'projectile',
    role: '由 SAM 发射器自动发射拦截核弹。',
    cost: 0,
    costFormula: '免费，受 SAM 冷却限制',
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    notes: ['默认速度 12 tiles/tick', '仅拦截 AtomBomb 与 HydrogenBomb，MIRV 弹头免疫'],
  },
  {
    id: 'Port',
    name: '港口',
    enName: 'Port',
    category: 'structure',
    role: '海上枢纽：贸易船、运输船与战舰的生成基地。',
    cost: 125000,
    costFormula: 'min(1,000,000, 2^n × 125,000)，n = 已有港口/工厂数',
    maxHealth: null,
    damage: null,
    constructionDuration: 50,
    upgradable: true,
    notes: ['等级越高，贸易船生成率与收益越高', '可被夺取，被占领后归新主'],
  },
  {
    id: 'AtomBomb',
    name: '原子弹',
    enName: 'Atom Bomb',
    category: 'nuke',
    role: '基础核弹：成本低、半径中。',
    cost: 750000,
    costFormula: '固定 750,000',
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    notes: ['爆炸 inner 12 / outer 30 tiles', '可被 SAM 拦截'],
  },
  {
    id: 'HydrogenBomb',
    name: '氢弹',
    enName: 'Hydrogen Bomb',
    category: 'nuke',
    role: '大规模杀伤核弹。',
    cost: 5000000,
    costFormula: '固定 5,000,000',
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    notes: ['爆炸 inner 80 / outer 100 tiles', '可被 SAM 拦截'],
  },
  {
    id: 'MIRV',
    name: 'MIRV 多弹头',
    enName: 'MIRV',
    category: 'nuke',
    role: '远程多弹头载具，到达目标后分裂为多枚 MIRVWarhead。',
    cost: 25000000,
    costFormula: '25,000,000 + 15,000,000 × 已发射数',
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    notes: ['v24 大幅削弱：陨石坑可被快速征服', 'MIRV 本体不可被 SAM 拦截，弹头亦免疫'],
  },
  {
    id: 'MIRVWarhead',
    name: 'MIRV 弹头',
    enName: 'MIRV Warhead',
    category: 'nuke',
    role: 'MIRV 分裂后的小型弹头。',
    cost: 0,
    costFormula: '由 MIRV 自动产生',
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    notes: ['爆炸 inner 12 / outer 18 tiles', 'SAM 无法拦截'],
  },
  {
    id: 'TradeShip',
    name: '贸易船',
    enName: 'Trade Ship',
    category: 'ship',
    role: '在港口之间自动往返产生金币。',
    cost: 0,
    costFormula: '免费，按概率生成',
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    notes: ['v24 全局上限 150 艘', '被敌方夺取归对方所有；被毁则消失'],
  },
  {
    id: 'MissileSilo',
    name: '导弹井',
    enName: 'Missile Silo',
    category: 'structure',
    role: '发射核弹的基础设施。',
    cost: 1000000,
    costFormula: '固定 1,000,000',
    maxHealth: null,
    damage: null,
    constructionDuration: 100,
    upgradable: true,
    notes: ['升级提升装填速度', 'AI 核弹会避开 SAM 覆盖区'],
  },
  {
    id: 'DefensePost',
    name: '防御工事',
    enName: 'Defense Post',
    category: 'structure',
    role: '陆地防御塔：周围 30 tiles 内显著加强防御。',
    cost: 50000,
    costFormula: 'min(250,000, (n+1) × 50,000)',
    maxHealth: null,
    damage: null,
    constructionDuration: 50,
    upgradable: false,
    notes: ['防御区 mag ×5，speed ×3', '范围 30 tiles'],
  },
  {
    id: 'SAMLauncher',
    name: 'SAM 防空发射器',
    enName: 'SAM Launcher',
    category: 'structure',
    role: '拦截原子弹与氢弹的防空设施。',
    cost: 1500000,
    costFormula: 'min(3,000,000, (n+1) × 1,500,000)',
    maxHealth: null,
    damage: null,
    constructionDuration: 300,
    upgradable: true,
    notes: ['冷却 90 ticks', '射程随等级 70 → 150 tiles', '不能拦截 MIRV'],
  },
  {
    id: 'City',
    name: '城市',
    enName: 'City',
    category: 'structure',
    role: '提升人口上限并参与火车贸易。',
    cost: 125000,
    costFormula: 'min(1,000,000, 2^n × 125,000)',
    maxHealth: null,
    damage: null,
    constructionDuration: 20,
    upgradable: true,
    notes: ['每级 +250,000 部队上限', '即使无港口也可建造（v24）', '是火车站点'],
  },
  {
    id: 'Factory',
    name: '工厂',
    enName: 'Factory',
    category: 'structure',
    role: '生成火车，搭配铁路与城市形成贸易网。',
    cost: 125000,
    costFormula: 'min(1,000,000, 2^n × 125,000)（与港口共享 n）',
    maxHealth: null,
    damage: null,
    constructionDuration: 20,
    upgradable: true,
    notes: ['火车生成率 (factories+10) × 15 tick', '可建造铁路环路'],
  },
  {
    id: 'Train',
    name: '火车',
    enName: 'Train',
    category: 'ship',
    role: '陆地贸易载具：在城市与工厂间运输金币。',
    cost: 0,
    costFormula: '免费（工厂自动生成）',
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    notes: ['速度 2 tiles/tick', '车辆间距 2 tiles', 'v24 实验功能：单人/私密大厅可用'],
  },
];

const FORMULAS_SNAPSHOT = {
  defense: {
    label: '防御与攻防计算',
    items: [
      { name: '平原地形', expr: 'mag = 80, speed = 16.5' },
      { name: '高地地形', expr: 'mag = 100, speed = 20' },
      { name: '山地地形', expr: 'mag = 120, speed = 25' },
      { name: '防御工事增益', expr: '范围 30 tiles 内：mag ×5, speed ×3' },
      { name: '辐射区减益', expr: 'mag *= (5 - falloutRatio × 2)' },
      { name: '大军减益 sigmoid', expr: 'defenseSig = 1 - sigmoid(defender.tiles, ln(2)/50000, 150000)' },
      { name: '背叛减益', expr: '防御 ×0.5, 速度 ×0.8, 持续 300 ticks (30s)' },
      { name: '攻击方大规模加成', expr: 'tiles > 100k 时: bonus = (100k/tiles)^0.7' },
    ],
  },
  troops: {
    label: '部队上限与增长',
    items: [
      { name: '人口上限基础', expr: '2 × (0.6 × tiles^0.6 × 1000 + 50,000) + Σ(cityLevel × 250,000)' },
      { name: '人口类型乘数', expr: 'Human ×1 / Bot ÷3 / Nation Easy ×0.5, Med ×0.75, Hard ×1, Imp ×1.25' },
      { name: '部队增长率', expr: 'toAdd = (10 + troops^0.73 / 4) × (1 - troops / maxTroops)' },
    ],
  },
  economy: {
    label: '经济与贸易',
    items: [
      { name: '基础金币产出', expr: '玩家 100 / tick，Bot 50 / tick（乘 goldMultiplier）' },
      { name: '城市部队加成', expr: '每级 City 提供 +250,000 部队上限' },
      { name: '火车收益', expr: 'baseGold (ally 35k / team 25k / self 10k) − distPenalty (5,000 × max(0, citiesVisited − 9))，下限 5,000' },
      { name: '贸易船收益', expr: 'floor( (75,000 / (1 + exp(-0.03 × (dist - 300))) + 50 × dist) × goldMultiplier )' },
      { name: '贸易船生成', expr: 'spawnRate = floor((100 × 1/(rejections+1)) / (1 - sigmoid(numShips, ln(2)/50, 200)))' },
      { name: '贸易船上限', expr: '全局 150 艘 (v24)' },
    ],
  },
  nukes: {
    label: '核武器与 SAM',
    items: [
      { name: '原子弹冲击半径', expr: 'inner 12 / outer 30 tiles' },
      { name: '氢弹冲击半径', expr: 'inner 80 / outer 100 tiles' },
      { name: 'MIRV 弹头', expr: 'inner 12 / outer 18 tiles' },
      { name: 'SAM 冷却', expr: '90 ticks (9s)' },
      { name: 'SAM 射程公式', expr: 'samRange(level) = 150 - 480 / (level + 5); 默认 70, 顶级 ≈ 140, 上限 150' },
      { name: 'SAM 拦截目标', expr: '仅 AtomBomb / HydrogenBomb；MIRV 本体与弹头免疫' },
      { name: '提前射击窗口', expr: 'tickBeforeShooting = nukeReachTick − samReachTick ≥ 0' },
    ],
  },
  alliance: {
    label: '同盟与背叛',
    items: [
      { name: '同盟时长', expr: '3000 ticks ≈ 5 分钟' },
      { name: '延期提示', expr: '到期前 300 ticks (30s) 提示双方' },
      { name: '续约规则', expr: '双方同意自动续期；仅一方同意进入延期窗口' },
      { name: '背叛立即效果', expr: '触发自动禁运；防御减益 0.5，速度减益 0.8，持续 300 ticks' },
    ],
  },
  spawn: {
    label: '出生与初始',
    items: [
      { name: '出生免疫', expr: '50 ticks（5 秒）攻击免疫' },
      { name: '随机出生阶段', expr: '单人 100 turns / 多人随机 150 turns / 多人固定 300 turns' },
    ],
  },
};

const MAP_CATEGORIES = {
  Continental: [
    'africa', 'asia', 'australia', 'europe', 'europeclassic', 'giantworldmap',
    'northamerica', 'oceania', 'southamerica', 'world',
  ],
  Regional: [
    'achiran', 'aegean', 'alps', 'amazonriver', 'antarctica', 'archipelagosea',
    'arctic', 'baikal', 'baikalnukewars', 'bajacalifornia', 'beringsea',
    'beringstrait', 'betweentwoseas', 'blacksea', 'bosphorusstraits',
    'britannia', 'britanniaclassic', 'caucasus', 'conakry',
    'deglaciatedantarctica', 'didier', 'didierfrance', 'dyslexdria',
    'eastasia', 'falklandislands', 'faroeislands', 'fourislands',
    'gatewaytotheatlantic', 'greatlakes', 'gulfofstlawrence', 'halkidiki',
    'hawaii', 'iceland', 'italia', 'japan', 'lemnos', 'lisbon',
    'losangeles', 'manicouagan', 'marenostrum', 'mena', 'middleeast',
    'montreal', 'newyorkcity', 'niledelta', 'passage', 'sanfrancisco',
    'straitofgibraltar', 'straitofhormuz', 'straitofmalacca',
    'svalmel', 'taiwanstrait', 'thestraits', 'tradersdream', 'twolakes',
    'yenisei',
  ],
  Fantasy: [
    'luna', 'mars', 'milkyway', 'pangaea', 'pluto', 'surrounded',
  ],
  Arcade: ['sierpinski', 'thebox'],
  Tournament: ['tourney1', 'tourney2', 'tourney3', 'tourney4'],
};

const MAP_DISPLAY_NAMES = {
  achiran: '阿契兰', aegean: '爱琴海', africa: '非洲', alps: '阿尔卑斯',
  amazonriver: '亚马逊河', antarctica: '南极洲', archipelagosea: '群岛海',
  arctic: '北极', asia: '亚洲', australia: '澳大利亚', baikal: '贝加尔',
  baikalnukewars: '贝加尔核战', bajacalifornia: '下加利福尼亚',
  beringsea: '白令海', beringstrait: '白令海峡', betweentwoseas: '两海之间',
  blacksea: '黑海', bosphorusstraits: '博斯普鲁斯海峡', britannia: '不列颠',
  britanniaclassic: '不列颠经典', caucasus: '高加索', conakry: '科纳克里',
  deglaciatedantarctica: '解冻南极', didier: '迪迪埃',
  didierfrance: '迪迪埃·法国', dyslexdria: '困惑塞德里亚',
  eastasia: '东亚', europe: '欧洲', europeclassic: '欧洲经典',
  falklandislands: '福克兰群岛', faroeislands: '法罗群岛',
  fourislands: '四岛', gatewaytotheatlantic: '大西洋之门',
  giantworldmap: '巨型世界图', greatlakes: '大湖区',
  gulfofstlawrence: '圣劳伦斯湾', halkidiki: '哈尔基季基',
  hawaii: '夏威夷', iceland: '冰岛', italia: '意大利', japan: '日本',
  lemnos: '林姆诺斯岛', lisbon: '里斯本', losangeles: '洛杉矶',
  luna: '月球', manicouagan: '马尼夸根', marenostrum: '地中海',
  mars: '火星', mena: '中东北非', middleeast: '中东',
  milkyway: '银河系', montreal: '蒙特利尔',
  newyorkcity: '纽约', niledelta: '尼罗河三角洲',
  northamerica: '北美', oceania: '大洋洲', pangaea: '盘古大陆',
  passage: '海峡通道', pluto: '冥王星', sanfrancisco: '旧金山',
  sierpinski: '谢尔宾斯基', southamerica: '南美',
  straitofgibraltar: '直布罗陀海峡', straitofhormuz: '霍尔木兹海峡',
  straitofmalacca: '马六甲海峡', surrounded: '四面楚歌',
  svalmel: 'Svalmel', taiwanstrait: '台湾海峡', thebox: '盒子',
  thestraits: '诸海峡', tourney1: '锦标赛 1', tourney2: '锦标赛 2',
  tourney3: '锦标赛 3', tourney4: '锦标赛 4',
  tradersdream: '商人之梦', twolakes: '双湖', world: '世界',
  yenisei: '叶尼塞河',
};

const CATEGORY_META = {
  Continental: { label: '大陆 / 全球', desc: '完整大陆或全球级地图，规模最大、扩张周期最长。' },
  Regional: { label: '区域', desc: '基于真实地理的区域地图：海峡、岛屿、河流等。' },
  Fantasy: { label: '幻想 / 太空', desc: '虚构世界与天体：火星、冥王星、银河系等。' },
  Arcade: { label: '街机 / 抽象', desc: '抽象图形或趣味设计图，玩法独特。' },
  Tournament: { label: '锦标赛', desc: '官方对赛专用图，平衡度高。' },
};

// ---------------------------------------------------------------------------
// Live extraction (best effort): scan the upstream Config.ts for cost numbers
// and the maps/ directory for the actual map list. Anything that fails falls
// back to the snapshot above.
// ---------------------------------------------------------------------------

function extractFromConfig() {
  if (!HAS_SOURCE) return null;
  const path = join(SOURCE_DIR, 'src', 'core', 'configuration', 'Config.ts');
  if (!existsSync(path)) return null;
  const src = readFileSync(path, 'utf8');
  const get = (re) => {
    const m = src.match(re);
    return m ? m[1].replace(/_/g, '') : null;
  };
  return {
    atomBomb: get(/UnitType\.AtomBomb\s*:[\s\S]*?cost:[^()]*\(\)\s*=>\s*([\d_]+)/),
    hydrogenBomb: get(/UnitType\.HydrogenBomb\s*:[\s\S]*?cost:[^()]*\(\)\s*=>\s*([\d_]+)/),
    missileSilo: get(/UnitType\.MissileSilo\s*:[\s\S]*?cost:[^()]*\(\)\s*=>\s*([\d_]+)/),
    defenseMidpoint: get(/DEFENSE_DEBUFF_MIDPOINT\s*=\s*([\d_]+)/),
    spawnImmunityDefault: get(/DEFAULT_SPAWN_IMMUNITY_TICKS\s*=\s*([\d_*\s]+)/),
    samConstruction: get(/SAM_CONSTRUCTION_TICKS\s*=\s*([\d_*\s]+)/),
  };
}

function readMapDirs() {
  if (!HAS_SOURCE) return Object.values(MAP_CATEGORIES).flat();
  const dir = join(SOURCE_DIR, 'resources', 'maps');
  if (!existsSync(dir)) return Object.values(MAP_CATEGORIES).flat();
  return readdirSync(dir).filter((name) => {
    try {
      return statSync(join(dir, name)).isDirectory();
    } catch {
      return false;
    }
  });
}

// ---------------------------------------------------------------------------
// Build output payloads
// ---------------------------------------------------------------------------

const liveConfig = extractFromConfig();
if (liveConfig) {
  meta.liveConfig = liveConfig;
}

const units = UNIT_SNAPSHOT.map((u) => ({ ...u }));

const structures = units
  .filter((u) => u.category === 'structure')
  .map((u) => ({ ...u }));

const liveMapIds = readMapDirs();
const idToCategory = {};
for (const [cat, ids] of Object.entries(MAP_CATEGORIES)) {
  ids.forEach((id) => (idToCategory[id] = cat));
}
const maps = liveMapIds
  .map((id) => ({
    id,
    name: MAP_DISPLAY_NAMES[id] ?? id,
    enName: id,
    category: idToCategory[id] ?? 'Regional',
  }))
  .sort((a, b) => {
    const order = ['Continental', 'Regional', 'Fantasy', 'Arcade', 'Tournament'];
    const ca = order.indexOf(a.category);
    const cb = order.indexOf(b.category);
    if (ca !== cb) return ca - cb;
    return a.id.localeCompare(b.id);
  });

const mapsByCategory = Object.fromEntries(
  Object.keys(MAP_CATEGORIES).map((cat) => [cat, maps.filter((m) => m.category === cat)]),
);

const formulasPayload = {
  meta: { description: '从 OpenFrontIO v24 提取的核心公式（数值/系数为字符串展示）。' },
  groups: FORMULAS_SNAPSHOT,
};

const mapsPayload = {
  meta: {
    total: maps.length,
    categories: Object.fromEntries(
      Object.keys(MAP_CATEGORIES).map((cat) => [cat, { ...CATEGORY_META[cat], count: mapsByCategory[cat].length }]),
    ),
  },
  list: maps,
};

function write(file, data) {
  writeFileSync(join(OUT_DIR, file), JSON.stringify(data, null, 2) + '\n', 'utf8');
}

write('_meta.json', meta);
write('units.json', units);
write('structures.json', structures);
write('formulas.json', formulasPayload);
write('maps.json', mapsPayload);

console.log(`[extract] mode=${HAS_SOURCE ? 'live' : 'snapshot'}  units=${units.length}  structures=${structures.length}  maps=${maps.length}`);
