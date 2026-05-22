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
 *
 * Every emitted entry uses a nested i18n bundle: { en, zh, fr, de, nl }.
 * Components pick the right bundle via getLangFromUrl + pickI18n.
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
// Unit / structure / projectile / nuke snapshot — 5-language i18n bundles.
// Stable fields (id, category, cost, maxHealth, damage, constructionDuration,
// upgradable, enName) live at the top; locale-sensitive copy lives under i18n.
// ---------------------------------------------------------------------------

const UNIT_SNAPSHOT = [
  {
    id: 'TransportShip',
    enName: 'Transport Ship',
    category: 'ship',
    cost: 0,
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    i18n: {
      en: {
        name: 'Transport Ship',
        role: 'Naval landing vehicle, spawned from ports or coasts.',
        costFormula: "Free (consumes initiator's troops)",
        notes: [
          'Affected by isWaterNukes / isPortsDisabled',
          'Warships prioritize attacking transport ships',
        ],
      },
      zh: {
        name: '运输船',
        role: '海上登陆载具,从港口或海岸生成。',
        costFormula: '免费(消耗发起者部队)',
        notes: ['受 isWaterNukes / isPortsDisabled 影响', '战舰会优先打击运输船'],
      },
      fr: {
        name: 'Navire de transport',
        role: 'Véhicule de débarquement naval, généré depuis les ports ou les côtes.',
        costFormula: "Gratuit (consomme les troupes de l'initiateur)",
        notes: [
          'Affecté par isWaterNukes / isPortsDisabled',
          'Les navires de guerre attaquent en priorité les navires de transport',
        ],
      },
      de: {
        name: 'Transportschiff',
        role: 'Marinelandungsfahrzeug, gespawnt von Häfen oder Küsten.',
        costFormula: 'Kostenlos (verbraucht Truppen des Initiators)',
        notes: [
          'Beeinflusst von isWaterNukes / isPortsDisabled',
          'Kriegsschiffe greifen vorrangig Transportschiffe an',
        ],
      },
      nl: {
        name: 'Transportschip',
        role: 'Marine landingsvoertuig, gespawned vanaf havens of kusten.',
        costFormula: 'Gratis (verbruikt troepen van initiator)',
        notes: [
          'Beïnvloed door isWaterNukes / isPortsDisabled',
          'Oorlogsschepen vallen transportschepen prioritair aan',
        ],
      },
    },
  },
  {
    id: 'Warship',
    enName: 'Warship',
    category: 'ship',
    cost: 250000,
    maxHealth: 1000,
    damage: 250,
    constructionDuration: 50,
    upgradable: false,
    i18n: {
      en: {
        name: 'Warship',
        role: 'Naval control unit; fires Shells against enemy ships/coasts.',
        costFormula: 'min(1,000,000, (n+1) × 250,000), n = existing warships',
        notes: [
          'Auto-retreats at HP ≤ 750',
          'Since v24: prioritizes transport ships and cools down immediately on hit',
        ],
      },
      zh: {
        name: '战舰',
        role: '海上控制单位,发射 Shell 攻击敌方船只/海岸。',
        costFormula: 'min(1,000,000, (n+1) × 250,000),n = 已有战舰数',
        notes: ['生命值 ≤ 750 自动撤退', 'v24 起优先击中运输船且击中后立即冷却'],
      },
      fr: {
        name: 'Navire de guerre',
        role: 'Unité de contrôle naval ; tire des obus sur les navires/côtes ennemis.',
        costFormula: 'min(1 000 000, (n+1) × 250 000), n = navires de guerre déjà construits',
        notes: [
          'Retraite automatique à HP ≤ 750',
          'Depuis v24 : cible en priorité les navires de transport et refroidit immédiatement après un tir',
        ],
      },
      de: {
        name: 'Kriegsschiff',
        role: 'Marinekontrolleinheit; feuert Granaten auf feindliche Schiffe/Küsten.',
        costFormula: 'min(1.000.000, (n+1) × 250.000), n = vorhandene Kriegsschiffe',
        notes: ['Automatischer Rückzug bei HP ≤ 750', 'Ab v24: priorisiert Transportschiffe und kühlt nach Treffer sofort ab'],
      },
      nl: {
        name: 'Oorlogsschip',
        role: 'Marine controle-eenheid; vuurt granaten af op vijandelijke schepen/kusten.',
        costFormula: 'min(1.000.000, (n+1) × 250.000), n = bestaande oorlogsschepen',
        notes: ['Automatische terugtocht bij HP ≤ 750', 'Sinds v24: prioriteert transportschepen en koelt direct af na een treffer'],
      },
    },
  },
  {
    id: 'Shell',
    enName: 'Shell',
    category: 'projectile',
    cost: 0,
    maxHealth: null,
    damage: 250,
    constructionDuration: null,
    upgradable: false,
    i18n: {
      en: { name: 'Shell', role: 'Solid projectile fired by warships and defense posts.', costFormula: 'Auto-generated by warships/defense posts', notes: ['Hits can be intercepted by obstacles'] },
      zh: { name: '炮弹', role: '战舰与防御工事发射的实体炮弹。', costFormula: '由战舰/防御工事自动生成', notes: ['命中可被障碍物拦截'] },
      fr: { name: 'Obus', role: 'Projectile solide tiré par les navires de guerre et postes de défense.', costFormula: 'Auto-généré par les navires de guerre/postes de défense', notes: ['Les tirs peuvent être interceptés par des obstacles'] },
      de: { name: 'Granate', role: 'Festes Projektil, abgefeuert von Kriegsschiffen und Verteidigungsposten.', costFormula: 'Automatisch von Kriegsschiffen/Verteidigungsposten erzeugt', notes: ['Treffer können durch Hindernisse abgefangen werden'] },
      nl: { name: 'Granaat', role: 'Vast projectiel afgevuurd door oorlogsschepen en verdedigingsposten.', costFormula: 'Automatisch gegenereerd door oorlogsschepen/verdedigingsposten', notes: ['Treffers kunnen worden onderschept door obstakels'] },
    },
  },
  {
    id: 'SAMMissile',
    enName: 'SAM Missile',
    category: 'projectile',
    cost: 0,
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    i18n: {
      en: { name: 'SAM Missile', role: 'Auto-launched by SAM Launchers to intercept nukes.', costFormula: 'Free, gated by SAM cooldown', notes: ['Default speed 12 tiles/tick', 'Intercepts only AtomBomb and HydrogenBomb; MIRV warheads immune'] },
      zh: { name: 'SAM 拦截弹', role: '由 SAM 发射器自动发射拦截核弹。', costFormula: '免费,受 SAM 冷却限制', notes: ['默认速度 12 tiles/tick', '仅拦截 AtomBomb 与 HydrogenBomb,MIRV 弹头免疫'] },
      fr: { name: 'Missile SAM', role: 'Auto-lancé par les lanceurs SAM pour intercepter les nukes.', costFormula: 'Gratuit, limité par le cooldown SAM', notes: ['Vitesse par défaut 12 tiles/tick', 'Intercepte uniquement AtomBomb et HydrogenBomb ; les têtes MIRV sont immunisées'] },
      de: { name: 'SAM-Rakete', role: 'Automatisch von SAM-Werfern abgefeuert, um Atomwaffen abzufangen.', costFormula: 'Kostenlos, durch SAM-Abklingzeit begrenzt', notes: ['Standardgeschwindigkeit 12 Tiles/Tick', 'Fängt nur AtomBomb und HydrogenBomb ab; MIRV-Sprengköpfe sind immun'] },
      nl: { name: 'SAM-raket', role: 'Automatisch gelanceerd door SAM-installaties om nukes te onderscheppen.', costFormula: 'Gratis, beperkt door SAM-cooldown', notes: ['Standaardsnelheid 12 tiles/tick', 'Onderschept alleen AtomBomb en HydrogenBomb; MIRV-kernkoppen zijn immuun'] },
    },
  },
  {
    id: 'Port',
    enName: 'Port',
    category: 'structure',
    cost: 125000,
    maxHealth: null,
    damage: null,
    constructionDuration: 50,
    upgradable: true,
    i18n: {
      en: { name: 'Port', role: 'Naval hub: spawn base for trade ships, transports, and warships.', costFormula: 'min(1,000,000, 2^n × 125,000), n = existing ports/factories', notes: ['Higher level = better trade ship spawn rate and revenue', 'Can be captured; ownership transfers to the new occupier'] },
      zh: { name: '港口', role: '海上枢纽：贸易船、运输船与战舰的生成基地。', costFormula: 'min(1,000,000, 2^n × 125,000),n = 已有港口/工厂数', notes: ['等级越高,贸易船生成率与收益越高', '可被夺取,被占领后归新主'] },
      fr: { name: 'Port', role: 'Hub naval : base de génération des navires de commerce, transports et navires de guerre.', costFormula: 'min(1 000 000, 2^n × 125 000), n = ports/usines déjà construits', notes: ["Plus le niveau est élevé, meilleurs sont le taux d'apparition et les revenus des navires de commerce", 'Peut être capturé ; la propriété passe au nouvel occupant'] },
      de: { name: 'Hafen', role: 'Seehub: Spawn-Basis für Handelsschiffe, Transporter und Kriegsschiffe.', costFormula: 'min(1.000.000, 2^n × 125.000), n = vorhandene Häfen/Fabriken', notes: ['Höheres Level = bessere Spawn-Rate und Einnahmen von Handelsschiffen', 'Kann erobert werden; Eigentum geht an den neuen Besetzer'] },
      nl: { name: 'Haven', role: 'Maritieme hub: spawn-basis voor handelsschepen, transporten en oorlogsschepen.', costFormula: 'min(1.000.000, 2^n × 125.000), n = bestaande havens/fabrieken', notes: ['Hoger niveau = betere spawn-rate en inkomsten van handelsschepen', 'Kan worden veroverd; eigendom gaat naar de nieuwe bezetter'] },
    },
  },
  {
    id: 'AtomBomb',
    enName: 'Atom Bomb',
    category: 'nuke',
    cost: 750000,
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    i18n: {
      en: { name: 'Atom Bomb', role: 'Basic nuke: low cost, medium blast radius.', costFormula: 'Fixed 750,000', notes: ['Blast inner 12 / outer 30 tiles', 'Can be intercepted by SAM'] },
      zh: { name: '原子弹', role: '基础核弹：成本低、半径中。', costFormula: '固定 750,000', notes: ['爆炸 inner 12 / outer 30 tiles', '可被 SAM 拦截'] },
      fr: { name: 'Bombe atomique', role: "Nuke de base : coût faible, rayon d'explosion moyen.", costFormula: 'Fixe 750 000', notes: ['Explosion inner 12 / outer 30 tiles', 'Peut être interceptée par les SAM'] },
      de: { name: 'Atombombe', role: 'Basis-Atomwaffe: niedrige Kosten, mittlerer Explosionsradius.', costFormula: 'Fest 750.000', notes: ['Explosion inner 12 / outer 30 Tiles', 'Kann von SAM abgefangen werden'] },
      nl: { name: 'Atoombom', role: 'Basis-nuke: lage kosten, gemiddelde explosieradius.', costFormula: 'Vast 750.000', notes: ['Explosie inner 12 / outer 30 tiles', 'Kan worden onderschept door SAM'] },
    },
  },
  {
    id: 'HydrogenBomb',
    enName: 'Hydrogen Bomb',
    category: 'nuke',
    cost: 5000000,
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    i18n: {
      en: { name: 'Hydrogen Bomb', role: 'Mass-destruction nuke.', costFormula: 'Fixed 5,000,000', notes: ['Blast inner 80 / outer 100 tiles', 'Can be intercepted by SAM'] },
      zh: { name: '氢弹', role: '大规模杀伤核弹。', costFormula: '固定 5,000,000', notes: ['爆炸 inner 80 / outer 100 tiles', '可被 SAM 拦截'] },
      fr: { name: 'Bombe à hydrogène', role: 'Nuke à destruction massive.', costFormula: 'Fixe 5 000 000', notes: ['Explosion inner 80 / outer 100 tiles', 'Peut être interceptée par les SAM'] },
      de: { name: 'Wasserstoffbombe', role: 'Atomwaffe für Massenvernichtung.', costFormula: 'Fest 5.000.000', notes: ['Explosion inner 80 / outer 100 Tiles', 'Kann von SAM abgefangen werden'] },
      nl: { name: 'Waterstofbom', role: 'Massavernietigingsnuke.', costFormula: 'Vast 5.000.000', notes: ['Explosie inner 80 / outer 100 tiles', 'Kan worden onderschept door SAM'] },
    },
  },
  {
    id: 'MIRV',
    enName: 'MIRV',
    category: 'nuke',
    cost: 25000000,
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    i18n: {
      en: { name: 'MIRV', role: 'Long-range multi-warhead vehicle; splits into multiple MIRV Warheads on arrival.', costFormula: '25,000,000 + 15,000,000 × launches fired', notes: ['Major v24 nerf: craters can be quickly conquered', 'MIRV body cannot be intercepted by SAM; warheads also immune'] },
      zh: { name: 'MIRV 多弹头', role: '远程多弹头载具,到达目标后分裂为多枚 MIRVWarhead。', costFormula: '25,000,000 + 15,000,000 × 已发射数', notes: ['v24 大幅削弱：陨石坑可被快速征服', 'MIRV 本体不可被 SAM 拦截,弹头亦免疫'] },
      fr: { name: 'MIRV', role: "Véhicule longue portée à têtes multiples ; se divise en plusieurs têtes MIRV à l'arrivée.", costFormula: '25 000 000 + 15 000 000 × lancements effectués', notes: ['Gros nerf v24 : les cratères peuvent être conquis rapidement', 'Le corps du MIRV ne peut pas être intercepté par SAM ; les têtes sont également immunisées'] },
      de: { name: 'MIRV', role: 'Langstrecken-Mehrkopfraketenträger; teilt sich bei Ankunft in mehrere MIRV-Sprengköpfe.', costFormula: '25.000.000 + 15.000.000 × Anzahl Starts', notes: ['Großer v24-Nerf: Krater können schnell erobert werden', 'MIRV-Körper kann nicht von SAM abgefangen werden; Sprengköpfe ebenfalls immun'] },
      nl: { name: 'MIRV', role: 'Langeafstandsvoertuig met meerdere kernkoppen; splitst bij aankomst in meerdere MIRV-kernkoppen.', costFormula: '25.000.000 + 15.000.000 × aantal lanceringen', notes: ['Grote v24-nerf: kraters kunnen snel veroverd worden', 'MIRV-lichaam kan niet door SAM onderschept worden; kernkoppen ook immuun'] },
    },
  },
  {
    id: 'MIRVWarhead',
    enName: 'MIRV Warhead',
    category: 'nuke',
    cost: 0,
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    i18n: {
      en: { name: 'MIRV Warhead', role: 'Small warhead produced when a MIRV splits.', costFormula: 'Auto-produced by MIRV', notes: ['Blast inner 12 / outer 18 tiles', 'SAM cannot intercept'] },
      zh: { name: 'MIRV 弹头', role: 'MIRV 分裂后的小型弹头。', costFormula: '由 MIRV 自动产生', notes: ['爆炸 inner 12 / outer 18 tiles', 'SAM 无法拦截'] },
      fr: { name: 'Tête MIRV', role: "Petite tête produite lors de la séparation d'un MIRV.", costFormula: 'Auto-produite par MIRV', notes: ['Explosion inner 12 / outer 18 tiles', 'Le SAM ne peut pas intercepter'] },
      de: { name: 'MIRV-Sprengkopf', role: 'Kleiner Sprengkopf, der bei der Trennung eines MIRV entsteht.', costFormula: 'Automatisch von MIRV produziert', notes: ['Explosion inner 12 / outer 18 Tiles', 'SAM kann nicht abfangen'] },
      nl: { name: 'MIRV-kernkop', role: 'Kleine kernkop geproduceerd bij splitsing van een MIRV.', costFormula: 'Automatisch geproduceerd door MIRV', notes: ['Explosie inner 12 / outer 18 tiles', 'SAM kan niet onderscheppen'] },
    },
  },
  {
    id: 'TradeShip',
    enName: 'Trade Ship',
    category: 'ship',
    cost: 0,
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    i18n: {
      en: { name: 'Trade Ship', role: 'Auto-shuttles between ports to generate gold.', costFormula: 'Free, spawned probabilistically', notes: ['v24 global cap 150 ships', 'Captured ships transfer to the captor; destroyed ships are lost'] },
      zh: { name: '贸易船', role: '在港口之间自动往返产生金币。', costFormula: '免费,按概率生成', notes: ['v24 全局上限 150 艘', '被敌方夺取归对方所有;被毁则消失'] },
      fr: { name: 'Navire de commerce', role: "Fait l'aller-retour automatique entre les ports pour générer de l'or.", costFormula: 'Gratuit, généré par probabilité', notes: ['Cap global v24 : 150 navires', 'Les navires capturés vont au captureur ; les détruits sont perdus'] },
      de: { name: 'Handelsschiff', role: 'Pendelt automatisch zwischen Häfen, um Gold zu generieren.', costFormula: 'Kostenlos, probabilistisch gespawnt', notes: ['v24 globales Limit 150 Schiffe', 'Eroberte Schiffe gehen an den Eroberer; zerstörte sind verloren'] },
      nl: { name: 'Handelsschip', role: 'Pendelt automatisch tussen havens om goud te genereren.', costFormula: 'Gratis, probabilistisch gespawned', notes: ['v24 globaal limiet 150 schepen', 'Veroverde schepen gaan naar de veroveraar; vernietigde zijn verloren'] },
    },
  },
  {
    id: 'MissileSilo',
    enName: 'Missile Silo',
    category: 'structure',
    cost: 1000000,
    maxHealth: null,
    damage: null,
    constructionDuration: 100,
    upgradable: true,
    i18n: {
      en: { name: 'Missile Silo', role: 'Core infrastructure for launching nuclear weapons.', costFormula: 'Fixed 1,000,000', notes: ['Upgrades reduce reload time', 'AI nukes avoid SAM-covered targets'] },
      zh: { name: '导弹井', role: '发射核弹的基础设施。', costFormula: '固定 1,000,000', notes: ['升级提升装填速度', 'AI 核弹会避开 SAM 覆盖区'] },
      fr: { name: 'Silo à missiles', role: 'Infrastructure de base pour lancer des armes nucléaires.', costFormula: 'Fixe 1 000 000', notes: ['Les améliorations réduisent le temps de rechargement', "Les nukes de l'IA évitent les zones couvertes par les SAM"] },
      de: { name: 'Raketensilo', role: 'Kerninfrastruktur zum Starten von Atomwaffen.', costFormula: 'Fest 1.000.000', notes: ['Upgrades reduzieren die Nachladezeit', 'KI-Atomwaffen meiden SAM-abgedeckte Ziele'] },
      nl: { name: 'Raketsilo', role: 'Kerninfrastructuur voor het lanceren van kernwapens.', costFormula: 'Vast 1.000.000', notes: ['Upgrades verkorten de herlaadtijd', 'AI-nukes vermijden door SAM gedekte doelen'] },
    },
  },
  {
    id: 'DefensePost',
    enName: 'Defense Post',
    category: 'structure',
    cost: 50000,
    maxHealth: null,
    damage: null,
    constructionDuration: 50,
    upgradable: false,
    i18n: {
      en: { name: 'Defense Post', role: 'Land defense tower: significantly boosts defense within 30 tiles.', costFormula: 'min(250,000, (n+1) × 50,000)', notes: ['Defense zone mag ×5, speed ×3', 'Range 30 tiles'] },
      zh: { name: '防御工事', role: '陆地防御塔：周围 30 tiles 内显著加强防御。', costFormula: 'min(250,000, (n+1) × 50,000)', notes: ['防御区 mag ×5,speed ×3', '范围 30 tiles'] },
      fr: { name: 'Poste de défense', role: 'Tour de défense terrestre : renforce significativement la défense dans un rayon de 30 tiles.', costFormula: 'min(250 000, (n+1) × 50 000)', notes: ['Zone de défense mag ×5, speed ×3', 'Portée 30 tiles'] },
      de: { name: 'Verteidigungsposten', role: 'Landverteidigungsturm: erhöht die Verteidigung innerhalb von 30 Tiles signifikant.', costFormula: 'min(250.000, (n+1) × 50.000)', notes: ['Verteidigungszone mag ×5, speed ×3', 'Reichweite 30 Tiles'] },
      nl: { name: 'Verdedigingspost', role: 'Landverdedigingstoren: verhoogt verdediging significant binnen 30 tiles.', costFormula: 'min(250.000, (n+1) × 50.000)', notes: ['Verdedigingszone mag ×5, speed ×3', 'Bereik 30 tiles'] },
    },
  },
  {
    id: 'SAMLauncher',
    enName: 'SAM Launcher',
    category: 'structure',
    cost: 1500000,
    maxHealth: null,
    damage: null,
    constructionDuration: 300,
    upgradable: true,
    i18n: {
      en: { name: 'SAM Launcher', role: 'Anti-air installation intercepting atom and hydrogen bombs.', costFormula: 'min(3,000,000, (n+1) × 1,500,000)', notes: ['Cooldown 90 ticks', 'Range scales 70 → 150 tiles by level', 'Cannot intercept MIRV'] },
      zh: { name: 'SAM 防空发射器', role: '拦截原子弹与氢弹的防空设施。', costFormula: 'min(3,000,000, (n+1) × 1,500,000)', notes: ['冷却 90 ticks', '射程随等级 70 → 150 tiles', '不能拦截 MIRV'] },
      fr: { name: 'Lanceur SAM', role: 'Installation anti-aérienne interceptant bombes atomiques et à hydrogène.', costFormula: 'min(3 000 000, (n+1) × 1 500 000)', notes: ['Cooldown 90 ticks', 'Portée 70 → 150 tiles selon le niveau', 'Ne peut pas intercepter les MIRV'] },
      de: { name: 'SAM-Werfer', role: 'Flugabwehranlage, die Atom- und Wasserstoffbomben abfängt.', costFormula: 'min(3.000.000, (n+1) × 1.500.000)', notes: ['Abklingzeit 90 Ticks', 'Reichweite skaliert 70 → 150 Tiles je Level', 'Kann MIRV nicht abfangen'] },
      nl: { name: 'SAM-lanceerinstallatie', role: 'Luchtafweerinstallatie die atoom- en waterstofbommen onderschept.', costFormula: 'min(3.000.000, (n+1) × 1.500.000)', notes: ['Cooldown 90 ticks', 'Bereik schaalt 70 → 150 tiles per niveau', 'Kan MIRV niet onderscheppen'] },
    },
  },
  {
    id: 'City',
    enName: 'City',
    category: 'structure',
    cost: 125000,
    maxHealth: null,
    damage: null,
    constructionDuration: 20,
    upgradable: true,
    i18n: {
      en: { name: 'City', role: 'Raises population cap and participates in train trade.', costFormula: 'min(1,000,000, 2^n × 125,000)', notes: ['+250,000 troop cap per level', 'Buildable even without a port (v24)', 'Acts as a train station'] },
      zh: { name: '城市', role: '提升人口上限并参与火车贸易。', costFormula: 'min(1,000,000, 2^n × 125,000)', notes: ['每级 +250,000 部队上限', '即使无港口也可建造(v24)', '是火车站点'] },
      fr: { name: 'Ville', role: 'Augmente la limite de population et participe au commerce ferroviaire.', costFormula: 'min(1 000 000, 2^n × 125 000)', notes: ['+250 000 cap de troupes par niveau', 'Constructible même sans port (v24)', 'Sert de gare ferroviaire'] },
      de: { name: 'Stadt', role: 'Erhöht das Bevölkerungslimit und nimmt am Zughandel teil.', costFormula: 'min(1.000.000, 2^n × 125.000)', notes: ['+250.000 Truppenlimit pro Level', 'Auch ohne Hafen baubar (v24)', 'Dient als Bahnhof'] },
      nl: { name: 'Stad', role: 'Verhoogt het bevolkingsplafond en neemt deel aan treinhandel.', costFormula: 'min(1.000.000, 2^n × 125.000)', notes: ['+250.000 troepenlimiet per niveau', 'Bouwbaar zelfs zonder haven (v24)', 'Functioneert als treinstation'] },
    },
  },
  {
    id: 'Factory',
    enName: 'Factory',
    category: 'structure',
    cost: 125000,
    maxHealth: null,
    damage: null,
    constructionDuration: 20,
    upgradable: true,
    i18n: {
      en: { name: 'Factory', role: 'Spawns trains; combines with railways and cities to form a trade network.', costFormula: 'min(1,000,000, 2^n × 125,000) (shares n with Port)', notes: ['Train spawn rate (factories+10) × 15 ticks', 'Builds railway loops'] },
      zh: { name: '工厂', role: '生成火车,搭配铁路与城市形成贸易网。', costFormula: 'min(1,000,000, 2^n × 125,000)(与港口共享 n)', notes: ['火车生成率 (factories+10) × 15 tick', '可建造铁路环路'] },
      fr: { name: 'Usine', role: 'Génère des trains ; combinée aux rails et aux villes forme un réseau commercial.', costFormula: 'min(1 000 000, 2^n × 125 000) (partage n avec Port)', notes: ["Taux d'apparition des trains (usines+10) × 15 ticks", 'Construit des boucles ferroviaires'] },
      de: { name: 'Fabrik', role: 'Erzeugt Züge; bildet mit Bahnstrecken und Städten ein Handelsnetz.', costFormula: 'min(1.000.000, 2^n × 125.000) (teilt n mit Hafen)', notes: ['Zug-Spawn-Rate (Fabriken+10) × 15 Ticks', 'Baut Eisenbahnschleifen'] },
      nl: { name: 'Fabriek', role: 'Genereert treinen; combineert met spoorwegen en steden tot een handelsnetwerk.', costFormula: 'min(1.000.000, 2^n × 125.000) (deelt n met Haven)', notes: ['Trein-spawn-rate (fabrieken+10) × 15 ticks', 'Bouwt spoorwegcircuits'] },
    },
  },
  {
    id: 'Train',
    enName: 'Train',
    category: 'ship',
    cost: 0,
    maxHealth: null,
    damage: null,
    constructionDuration: null,
    upgradable: false,
    i18n: {
      en: { name: 'Train', role: 'Land trade vehicle: shuttles gold between cities and factories.', costFormula: 'Free (auto-generated by factories)', notes: ['Speed 2 tiles/tick', 'Vehicle spacing 2 tiles', 'v24 experimental: available in single-player and private lobbies'] },
      zh: { name: '火车', role: '陆地贸易载具：在城市与工厂间运输金币。', costFormula: '免费(工厂自动生成)', notes: ['速度 2 tiles/tick', '车辆间距 2 tiles', 'v24 实验功能：单人/私密大厅可用'] },
      fr: { name: 'Train', role: "Véhicule de commerce terrestre : transporte de l'or entre villes et usines.", costFormula: 'Gratuit (auto-généré par les usines)', notes: ['Vitesse 2 tiles/tick', 'Espacement entre véhicules 2 tiles', 'Expérimental v24 : disponible en solo/salons privés'] },
      de: { name: 'Zug', role: 'Landhandelsfahrzeug: transportiert Gold zwischen Städten und Fabriken.', costFormula: 'Kostenlos (automatisch von Fabriken erzeugt)', notes: ['Geschwindigkeit 2 Tiles/Tick', 'Fahrzeugabstand 2 Tiles', 'v24 experimentell: in Einzelspieler/privaten Lobbys verfügbar'] },
      nl: { name: 'Trein', role: 'Landhandelsvoertuig: vervoert goud tussen steden en fabrieken.', costFormula: 'Gratis (automatisch gegenereerd door fabrieken)', notes: ['Snelheid 2 tiles/tick', 'Voertuigafstand 2 tiles', 'v24 experimenteel: beschikbaar in singleplayer/privélobbies'] },
    },
  },
];

// ---------------------------------------------------------------------------
// Formula snapshot — same i18n bundle shape per group/item.
// ---------------------------------------------------------------------------

const FORMULAS_SNAPSHOT = {
  defense: {
    i18n: {
      en: { label: 'Defense and Combat Math' },
      zh: { label: '防御与攻防计算' },
      fr: { label: 'Défense et calculs de combat' },
      de: { label: 'Verteidigung und Kampfberechnung' },
      nl: { label: 'Verdediging en gevechtsberekeningen' },
    },
    items: [
      { i18n: { en: { name: 'Plains terrain', expr: 'mag = 80, speed = 16.5' }, zh: { name: '平原地形', expr: 'mag = 80, speed = 16.5' }, fr: { name: 'Terrain de plaine', expr: 'mag = 80, speed = 16.5' }, de: { name: 'Flachland', expr: 'mag = 80, speed = 16.5' }, nl: { name: 'Vlakte-terrein', expr: 'mag = 80, speed = 16.5' } } },
      { i18n: { en: { name: 'Highland terrain', expr: 'mag = 100, speed = 20' }, zh: { name: '高地地形', expr: 'mag = 100, speed = 20' }, fr: { name: 'Terrain de hauteurs', expr: 'mag = 100, speed = 20' }, de: { name: 'Hochland', expr: 'mag = 100, speed = 20' }, nl: { name: 'Hoogland-terrein', expr: 'mag = 100, speed = 20' } } },
      { i18n: { en: { name: 'Mountain terrain', expr: 'mag = 120, speed = 25' }, zh: { name: '山地地形', expr: 'mag = 120, speed = 25' }, fr: { name: 'Terrain de montagne', expr: 'mag = 120, speed = 25' }, de: { name: 'Bergland', expr: 'mag = 120, speed = 25' }, nl: { name: 'Berg-terrein', expr: 'mag = 120, speed = 25' } } },
      { i18n: { en: { name: 'Defense Post bonus', expr: 'Within 30 tiles: mag ×5, speed ×3' }, zh: { name: '防御工事增益', expr: '范围 30 tiles 内：mag ×5, speed ×3' }, fr: { name: 'Bonus Poste de défense', expr: 'Dans un rayon de 30 tiles : mag ×5, speed ×3' }, de: { name: 'Verteidigungsposten-Bonus', expr: 'Innerhalb von 30 Tiles: mag ×5, speed ×3' }, nl: { name: 'Verdedigingspost-bonus', expr: 'Binnen 30 tiles: mag ×5, speed ×3' } } },
      { i18n: { en: { name: 'Fallout-zone penalty', expr: 'mag *= (5 - falloutRatio × 2)' }, zh: { name: '辐射区减益', expr: 'mag *= (5 - falloutRatio × 2)' }, fr: { name: 'Pénalité zone de retombées', expr: 'mag *= (5 - falloutRatio × 2)' }, de: { name: 'Fallout-Zonen-Strafe', expr: 'mag *= (5 - falloutRatio × 2)' }, nl: { name: 'Fallout-zone straf', expr: 'mag *= (5 - falloutRatio × 2)' } } },
      { i18n: { en: { name: 'Large-army sigmoid penalty', expr: 'defenseSig = 1 - sigmoid(defender.tiles, ln(2)/50000, 150000)' }, zh: { name: '大军减益 sigmoid', expr: 'defenseSig = 1 - sigmoid(defender.tiles, ln(2)/50000, 150000)' }, fr: { name: 'Pénalité sigmoïde grande armée', expr: 'defenseSig = 1 - sigmoid(defender.tiles, ln(2)/50000, 150000)' }, de: { name: 'Großarmee-Sigmoid-Strafe', expr: 'defenseSig = 1 - sigmoid(defender.tiles, ln(2)/50000, 150000)' }, nl: { name: 'Groot-leger sigmoïde straf', expr: 'defenseSig = 1 - sigmoid(defender.tiles, ln(2)/50000, 150000)' } } },
      { i18n: { en: { name: 'Betrayal penalty', expr: 'Defense ×0.5, Speed ×0.8, duration 300 ticks (30s)' }, zh: { name: '背叛减益', expr: '防御 ×0.5, 速度 ×0.8, 持续 300 ticks (30s)' }, fr: { name: 'Pénalité de trahison', expr: 'Défense ×0.5, Vitesse ×0.8, durée 300 ticks (30s)' }, de: { name: 'Verrats-Strafe', expr: 'Verteidigung ×0.5, Geschwindigkeit ×0.8, Dauer 300 Ticks (30s)' }, nl: { name: 'Verraadstraf', expr: 'Verdediging ×0.5, Snelheid ×0.8, duur 300 ticks (30s)' } } },
      { i18n: { en: { name: 'Large-attacker bonus', expr: 'When tiles > 100k: bonus = (100k/tiles)^0.7' }, zh: { name: '攻击方大规模加成', expr: 'tiles > 100k 时: bonus = (100k/tiles)^0.7' }, fr: { name: 'Bonus grand attaquant', expr: 'Quand tiles > 100k : bonus = (100k/tiles)^0.7' }, de: { name: 'Großangreifer-Bonus', expr: 'Wenn tiles > 100k: bonus = (100k/tiles)^0.7' }, nl: { name: 'Grote-aanvaller bonus', expr: 'Als tiles > 100k: bonus = (100k/tiles)^0.7' } } },
    ],
  },
  troops: {
    i18n: {
      en: { label: 'Population Cap and Growth' },
      zh: { label: '部队上限与增长' },
      fr: { label: 'Limite et croissance de troupes' },
      de: { label: 'Bevölkerungslimit und Wachstum' },
      nl: { label: 'Bevolkingslimiet en groei' },
    },
    items: [
      { i18n: { en: { name: 'Population cap base', expr: '2 × (0.6 × tiles^0.6 × 1000 + 50,000) + Σ(cityLevel × 250,000)' }, zh: { name: '人口上限基础', expr: '2 × (0.6 × tiles^0.6 × 1000 + 50,000) + Σ(cityLevel × 250,000)' }, fr: { name: 'Base limite de population', expr: '2 × (0.6 × tiles^0.6 × 1000 + 50 000) + Σ(cityLevel × 250 000)' }, de: { name: 'Bevölkerungslimit-Basis', expr: '2 × (0.6 × tiles^0.6 × 1000 + 50.000) + Σ(cityLevel × 250.000)' }, nl: { name: 'Bevolkingslimiet-basis', expr: '2 × (0.6 × tiles^0.6 × 1000 + 50.000) + Σ(cityLevel × 250.000)' } } },
      { i18n: { en: { name: 'Population type multiplier', expr: 'Human ×1 / Bot ÷3 / Nation Easy ×0.5, Med ×0.75, Hard ×1, Imp ×1.25' }, zh: { name: '人口类型乘数', expr: 'Human ×1 / Bot ÷3 / Nation Easy ×0.5, Med ×0.75, Hard ×1, Imp ×1.25' }, fr: { name: 'Multiplicateur de type', expr: 'Humain ×1 / Bot ÷3 / Nation Easy ×0.5, Med ×0.75, Hard ×1, Imp ×1.25' }, de: { name: 'Bevölkerungstyp-Multiplikator', expr: 'Mensch ×1 / Bot ÷3 / Nation Easy ×0.5, Med ×0.75, Hard ×1, Imp ×1.25' }, nl: { name: 'Bevolkingstype-multiplier', expr: 'Mens ×1 / Bot ÷3 / Nation Easy ×0.5, Med ×0.75, Hard ×1, Imp ×1.25' } } },
      { i18n: { en: { name: 'Troop growth rate', expr: 'toAdd = (10 + troops^0.73 / 4) × (1 - troops / maxTroops)' }, zh: { name: '部队增长率', expr: 'toAdd = (10 + troops^0.73 / 4) × (1 - troops / maxTroops)' }, fr: { name: 'Taux de croissance des troupes', expr: 'toAdd = (10 + troops^0.73 / 4) × (1 - troops / maxTroops)' }, de: { name: 'Truppenwachstumsrate', expr: 'toAdd = (10 + troops^0.73 / 4) × (1 - troops / maxTroops)' }, nl: { name: 'Troepengroei', expr: 'toAdd = (10 + troops^0.73 / 4) × (1 - troops / maxTroops)' } } },
    ],
  },
  economy: {
    i18n: {
      en: { label: 'Economy and Trade' },
      zh: { label: '经济与贸易' },
      fr: { label: 'Économie et commerce' },
      de: { label: 'Wirtschaft und Handel' },
      nl: { label: 'Economie en handel' },
    },
    items: [
      { i18n: { en: { name: 'Base gold income', expr: 'Players 100 / tick, Bots 50 / tick (× goldMultiplier)' }, zh: { name: '基础金币产出', expr: '玩家 100 / tick,Bot 50 / tick(乘 goldMultiplier)' }, fr: { name: "Revenu d'or de base", expr: 'Joueurs 100 / tick, Bots 50 / tick (× goldMultiplier)' }, de: { name: 'Basis-Goldeinkommen', expr: 'Spieler 100 / Tick, Bots 50 / Tick (× goldMultiplier)' }, nl: { name: 'Basis-goudinkomen', expr: 'Spelers 100 / tick, Bots 50 / tick (× goldMultiplier)' } } },
      { i18n: { en: { name: 'City troop bonus', expr: 'Each City level provides +250,000 troop cap' }, zh: { name: '城市部队加成', expr: '每级 City 提供 +250,000 部队上限' }, fr: { name: 'Bonus troupes Ville', expr: 'Chaque niveau de Ville fournit +250 000 cap de troupes' }, de: { name: 'Stadt-Truppenbonus', expr: 'Jede Stadt-Stufe gibt +250.000 Truppenlimit' }, nl: { name: 'Stad-troepenbonus', expr: 'Elk stadsniveau geeft +250.000 troepenlimiet' } } },
      { i18n: { en: { name: 'Train revenue', expr: 'baseGold (ally 35k / team 25k / self 10k) − distPenalty (5,000 × max(0, citiesVisited − 9)), floor 5,000' }, zh: { name: '火车收益', expr: 'baseGold (ally 35k / team 25k / self 10k) − distPenalty (5,000 × max(0, citiesVisited − 9)),下限 5,000' }, fr: { name: 'Revenu des trains', expr: 'baseGold (allié 35k / équipe 25k / soi 10k) − distPenalty (5 000 × max(0, citiesVisited − 9)), min 5 000' }, de: { name: 'Zug-Einkommen', expr: 'baseGold (Verbündeter 35k / Team 25k / selbst 10k) − distPenalty (5.000 × max(0, citiesVisited − 9)), min 5.000' }, nl: { name: 'Trein-inkomsten', expr: 'baseGold (bondgenoot 35k / team 25k / zelf 10k) − distPenalty (5.000 × max(0, citiesVisited − 9)), min 5.000' } } },
      { i18n: { en: { name: 'Trade ship revenue', expr: 'floor( (75,000 / (1 + exp(-0.03 × (dist - 300))) + 50 × dist) × goldMultiplier )' }, zh: { name: '贸易船收益', expr: 'floor( (75,000 / (1 + exp(-0.03 × (dist - 300))) + 50 × dist) × goldMultiplier )' }, fr: { name: 'Revenu navires de commerce', expr: 'floor( (75 000 / (1 + exp(-0.03 × (dist - 300))) + 50 × dist) × goldMultiplier )' }, de: { name: 'Handelsschiff-Einnahmen', expr: 'floor( (75.000 / (1 + exp(-0.03 × (dist - 300))) + 50 × dist) × goldMultiplier )' }, nl: { name: 'Handelsschip-inkomsten', expr: 'floor( (75.000 / (1 + exp(-0.03 × (dist - 300))) + 50 × dist) × goldMultiplier )' } } },
      { i18n: { en: { name: 'Trade ship spawn', expr: 'spawnRate = floor((100 × 1/(rejections+1)) / (1 - sigmoid(numShips, ln(2)/50, 200)))' }, zh: { name: '贸易船生成', expr: 'spawnRate = floor((100 × 1/(rejections+1)) / (1 - sigmoid(numShips, ln(2)/50, 200)))' }, fr: { name: 'Spawn navires de commerce', expr: 'spawnRate = floor((100 × 1/(rejections+1)) / (1 - sigmoid(numShips, ln(2)/50, 200)))' }, de: { name: 'Handelsschiff-Spawn', expr: 'spawnRate = floor((100 × 1/(rejections+1)) / (1 - sigmoid(numShips, ln(2)/50, 200)))' }, nl: { name: 'Handelsschip-spawn', expr: 'spawnRate = floor((100 × 1/(rejections+1)) / (1 - sigmoid(numShips, ln(2)/50, 200)))' } } },
      { i18n: { en: { name: 'Trade ship cap', expr: 'Global 150 ships (v24)' }, zh: { name: '贸易船上限', expr: '全局 150 艘 (v24)' }, fr: { name: 'Cap navires de commerce', expr: 'Global 150 navires (v24)' }, de: { name: 'Handelsschiff-Limit', expr: 'Global 150 Schiffe (v24)' }, nl: { name: 'Handelsschip-limiet', expr: 'Globaal 150 schepen (v24)' } } },
    ],
  },
  nukes: {
    i18n: {
      en: { label: 'Nuclear Weapons and SAM' },
      zh: { label: '核武器与 SAM' },
      fr: { label: 'Armes nucléaires et SAM' },
      de: { label: 'Atomwaffen und SAM' },
      nl: { label: 'Kernwapens en SAM' },
    },
    items: [
      { i18n: { en: { name: 'Atom bomb blast radius', expr: 'inner 12 / outer 30 tiles' }, zh: { name: '原子弹冲击半径', expr: 'inner 12 / outer 30 tiles' }, fr: { name: "Rayon d'explosion bombe atomique", expr: 'inner 12 / outer 30 tiles' }, de: { name: 'Atombomben-Explosionsradius', expr: 'inner 12 / outer 30 Tiles' }, nl: { name: 'Atoombom explosieradius', expr: 'inner 12 / outer 30 tiles' } } },
      { i18n: { en: { name: 'Hydrogen bomb blast radius', expr: 'inner 80 / outer 100 tiles' }, zh: { name: '氢弹冲击半径', expr: 'inner 80 / outer 100 tiles' }, fr: { name: "Rayon d'explosion bombe à hydrogène", expr: 'inner 80 / outer 100 tiles' }, de: { name: 'Wasserstoffbomben-Explosionsradius', expr: 'inner 80 / outer 100 Tiles' }, nl: { name: 'Waterstofbom explosieradius', expr: 'inner 80 / outer 100 tiles' } } },
      { i18n: { en: { name: 'MIRV warhead', expr: 'inner 12 / outer 18 tiles' }, zh: { name: 'MIRV 弹头', expr: 'inner 12 / outer 18 tiles' }, fr: { name: 'Tête MIRV', expr: 'inner 12 / outer 18 tiles' }, de: { name: 'MIRV-Sprengkopf', expr: 'inner 12 / outer 18 Tiles' }, nl: { name: 'MIRV-kernkop', expr: 'inner 12 / outer 18 tiles' } } },
      { i18n: { en: { name: 'SAM cooldown', expr: '90 ticks (9s)' }, zh: { name: 'SAM 冷却', expr: '90 ticks (9s)' }, fr: { name: 'Cooldown SAM', expr: '90 ticks (9s)' }, de: { name: 'SAM-Abklingzeit', expr: '90 Ticks (9s)' }, nl: { name: 'SAM-cooldown', expr: '90 ticks (9s)' } } },
      { i18n: { en: { name: 'SAM range formula', expr: 'samRange(level) = 150 - 480 / (level + 5); default 70, top ≈ 140, cap 150' }, zh: { name: 'SAM 射程公式', expr: 'samRange(level) = 150 - 480 / (level + 5); 默认 70, 顶级 ≈ 140, 上限 150' }, fr: { name: 'Formule de portée SAM', expr: 'samRange(level) = 150 - 480 / (level + 5) ; défaut 70, max ≈ 140, plafond 150' }, de: { name: 'SAM-Reichweiten-Formel', expr: 'samRange(level) = 150 - 480 / (level + 5); Standard 70, Top ≈ 140, Max 150' }, nl: { name: 'SAM-bereik-formule', expr: 'samRange(level) = 150 - 480 / (level + 5); standaard 70, top ≈ 140, max 150' } } },
      { i18n: { en: { name: 'SAM intercept targets', expr: 'Only AtomBomb / HydrogenBomb; MIRV body and warheads immune' }, zh: { name: 'SAM 拦截目标', expr: '仅 AtomBomb / HydrogenBomb;MIRV 本体与弹头免疫' }, fr: { name: "Cibles d'interception SAM", expr: 'Seulement AtomBomb / HydrogenBomb ; corps et têtes MIRV immunisés' }, de: { name: 'SAM-Abfangziele', expr: 'Nur AtomBomb / HydrogenBomb; MIRV-Körper und Sprengköpfe immun' }, nl: { name: 'SAM-onderscheppingsdoelen', expr: 'Alleen AtomBomb / HydrogenBomb; MIRV-lichaam en kernkoppen immuun' } } },
      { i18n: { en: { name: 'Pre-fire window', expr: 'tickBeforeShooting = nukeReachTick − samReachTick ≥ 0' }, zh: { name: '提前射击窗口', expr: 'tickBeforeShooting = nukeReachTick − samReachTick ≥ 0' }, fr: { name: 'Fenêtre de tir anticipé', expr: 'tickBeforeShooting = nukeReachTick − samReachTick ≥ 0' }, de: { name: 'Vorab-Feuer-Fenster', expr: 'tickBeforeShooting = nukeReachTick − samReachTick ≥ 0' }, nl: { name: 'Voor-vuurvenster', expr: 'tickBeforeShooting = nukeReachTick − samReachTick ≥ 0' } } },
    ],
  },
  alliance: {
    i18n: {
      en: { label: 'Alliances and Betrayal' },
      zh: { label: '同盟与背叛' },
      fr: { label: 'Alliances et trahison' },
      de: { label: 'Allianzen und Verrat' },
      nl: { label: 'Allianties en verraad' },
    },
    items: [
      { i18n: { en: { name: 'Alliance duration', expr: '3000 ticks ≈ 5 minutes' }, zh: { name: '同盟时长', expr: '3000 ticks ≈ 5 分钟' }, fr: { name: "Durée d'alliance", expr: '3000 ticks ≈ 5 minutes' }, de: { name: 'Allianzdauer', expr: '3000 Ticks ≈ 5 Minuten' }, nl: { name: 'Alliantieduur', expr: '3000 ticks ≈ 5 minuten' } } },
      { i18n: { en: { name: 'Renewal warning', expr: 'Both parties notified 300 ticks (30s) before expiry' }, zh: { name: '延期提示', expr: '到期前 300 ticks (30s) 提示双方' }, fr: { name: 'Avertissement de renouvellement', expr: "Les deux parties sont notifiées 300 ticks (30s) avant l'expiration" }, de: { name: 'Verlängerungswarnung', expr: 'Beide Parteien werden 300 Ticks (30s) vor Ablauf benachrichtigt' }, nl: { name: 'Verlengingswaarschuwing', expr: 'Beide partijen krijgen 300 ticks (30s) voor afloop melding' } } },
      { i18n: { en: { name: 'Renewal rules', expr: 'Mutual consent auto-renews; single-party consent enters renewal window' }, zh: { name: '续约规则', expr: '双方同意自动续期;仅一方同意进入延期窗口' }, fr: { name: 'Règles de renouvellement', expr: 'Accord mutuel = renouvellement automatique ; accord unilatéral = fenêtre de renouvellement' }, de: { name: 'Verlängerungsregeln', expr: 'Beiderseitige Zustimmung = automatische Verlängerung; einseitige Zustimmung = Verlängerungsfenster' }, nl: { name: 'Verlengingsregels', expr: 'Wederzijdse instemming = automatische verlenging; eenzijdige instemming = verlengingsvenster' } } },
      { i18n: { en: { name: 'Betrayal immediate effect', expr: 'Triggers automatic embargo; defense ×0.5, speed ×0.8, duration 300 ticks' }, zh: { name: '背叛立即效果', expr: '触发自动禁运;防御减益 0.5,速度减益 0.8,持续 300 ticks' }, fr: { name: 'Effet immédiat de trahison', expr: 'Déclenche embargo automatique ; défense ×0.5, vitesse ×0.8, durée 300 ticks' }, de: { name: 'Verrats-Soforteffekt', expr: 'Löst automatisches Embargo aus; Verteidigung ×0.5, Geschwindigkeit ×0.8, Dauer 300 Ticks' }, nl: { name: 'Verraad direct effect', expr: 'Activeert automatisch embargo; verdediging ×0.5, snelheid ×0.8, duur 300 ticks' } } },
    ],
  },
  spawn: {
    i18n: {
      en: { label: 'Spawn and Setup' },
      zh: { label: '出生与初始' },
      fr: { label: 'Spawn et configuration' },
      de: { label: 'Spawn und Setup' },
      nl: { label: 'Spawn en setup' },
    },
    items: [
      { i18n: { en: { name: 'Spawn immunity', expr: '50 ticks (5 seconds) attack immunity' }, zh: { name: '出生免疫', expr: '50 ticks(5 秒)攻击免疫' }, fr: { name: 'Immunité de spawn', expr: '50 ticks (5 secondes) d\'immunité aux attaques' }, de: { name: 'Spawn-Immunität', expr: '50 Ticks (5 Sekunden) Angriffsimmunität' }, nl: { name: 'Spawn-immuniteit', expr: '50 ticks (5 seconden) aanvalsimmuniteit' } } },
      { i18n: { en: { name: 'Random spawn phase', expr: 'Single-player 100 turns / Multiplayer random 150 turns / Multiplayer fixed 300 turns' }, zh: { name: '随机出生阶段', expr: '单人 100 turns / 多人随机 150 turns / 多人固定 300 turns' }, fr: { name: 'Phase de spawn aléatoire', expr: 'Solo 100 tours / Multi aléatoire 150 tours / Multi fixe 300 tours' }, de: { name: 'Zufällige Spawn-Phase', expr: 'Einzelspieler 100 Züge / Multi zufällig 150 Züge / Multi fest 300 Züge' }, nl: { name: 'Willekeurige spawn-fase', expr: 'Singleplayer 100 turns / Multi willekeurig 150 turns / Multi vast 300 turns' } } },
    ],
  },
};

// ---------------------------------------------------------------------------
// Map snapshot
// ---------------------------------------------------------------------------

const MAP_CATEGORIES = {
  Continental: ['africa', 'asia', 'australia', 'europe', 'europeclassic', 'giantworldmap', 'northamerica', 'oceania', 'southamerica', 'world'],
  Regional: ['achiran', 'aegean', 'alps', 'amazonriver', 'antarctica', 'archipelagosea', 'arctic', 'baikal', 'baikalnukewars', 'bajacalifornia', 'beringsea', 'beringstrait', 'betweentwoseas', 'blacksea', 'bosphorusstraits', 'britannia', 'britanniaclassic', 'caucasus', 'conakry', 'deglaciatedantarctica', 'didier', 'didierfrance', 'dyslexdria', 'eastasia', 'falklandislands', 'faroeislands', 'fourislands', 'gatewaytotheatlantic', 'greatlakes', 'gulfofstlawrence', 'halkidiki', 'hawaii', 'iceland', 'italia', 'japan', 'lemnos', 'lisbon', 'losangeles', 'manicouagan', 'marenostrum', 'mena', 'middleeast', 'montreal', 'newyorkcity', 'niledelta', 'passage', 'sanfrancisco', 'straitofgibraltar', 'straitofhormuz', 'straitofmalacca', 'svalmel', 'taiwanstrait', 'thestraits', 'tradersdream', 'twolakes', 'yenisei'],
  Fantasy: ['luna', 'mars', 'milkyway', 'pangaea', 'pluto', 'surrounded'],
  Arcade: ['sierpinski', 'thebox'],
  Tournament: ['tourney1', 'tourney2', 'tourney3', 'tourney4'],
};

const CATEGORY_I18N = {
  Continental: {
    en: { label: 'Continental / Global', desc: 'Whole continents or global-scale maps; largest scale and longest expansion cycle.' },
    zh: { label: '大陆 / 全球', desc: '完整大陆或全球级地图,规模最大、扩张周期最长。' },
    fr: { label: 'Continental / Global', desc: "Continents entiers ou cartes à l'échelle mondiale ; la plus grande échelle et le cycle d'expansion le plus long." },
    de: { label: 'Kontinental / Global', desc: 'Ganze Kontinente oder globale Karten; größte Skala und längster Expansionszyklus.' },
    nl: { label: 'Continentaal / Globaal', desc: 'Hele continenten of globale kaarten; grootste schaal en langste expansiecyclus.' },
  },
  Regional: {
    en: { label: 'Regional', desc: 'Regional maps based on real geography: straits, islands, rivers, etc.' },
    zh: { label: '区域', desc: '基于真实地理的区域地图：海峡、岛屿、河流等。' },
    fr: { label: 'Régional', desc: 'Cartes régionales basées sur la géographie réelle : détroits, îles, rivières, etc.' },
    de: { label: 'Regional', desc: 'Regionale Karten basierend auf realer Geografie: Meerengen, Inseln, Flüsse usw.' },
    nl: { label: 'Regionaal', desc: 'Regionale kaarten gebaseerd op echte geografie: zeestraten, eilanden, rivieren, enz.' },
  },
  Fantasy: {
    en: { label: 'Fantasy / Space', desc: 'Fictional worlds and celestial bodies: Mars, Pluto, the Milky Way, and more.' },
    zh: { label: '幻想 / 太空', desc: '虚构世界与天体：火星、冥王星、银河系等。' },
    fr: { label: 'Fantaisie / Espace', desc: 'Mondes fictifs et corps célestes : Mars, Pluton, la Voie lactée, etc.' },
    de: { label: 'Fantasy / Weltraum', desc: 'Fiktive Welten und Himmelskörper: Mars, Pluto, Milchstraße usw.' },
    nl: { label: 'Fantasie / Ruimte', desc: 'Fictieve werelden en hemellichamen: Mars, Pluto, Melkweg, enz.' },
  },
  Arcade: {
    en: { label: 'Arcade / Abstract', desc: 'Abstract shapes or playful designs with unique gameplay.' },
    zh: { label: '街机 / 抽象', desc: '抽象图形或趣味设计图,玩法独特。' },
    fr: { label: 'Arcade / Abstrait', desc: 'Formes abstraites ou designs ludiques au gameplay unique.' },
    de: { label: 'Arcade / Abstrakt', desc: 'Abstrakte Formen oder verspielte Designs mit einzigartigem Gameplay.' },
    nl: { label: 'Arcade / Abstract', desc: 'Abstracte vormen of speelse designs met unieke gameplay.' },
  },
  Tournament: {
    en: { label: 'Tournament', desc: 'Official competition maps with high balance.' },
    zh: { label: '锦标赛', desc: '官方对赛专用图,平衡度高。' },
    fr: { label: 'Tournoi', desc: 'Cartes officielles de compétition avec un haut équilibre.' },
    de: { label: 'Turnier', desc: 'Offizielle Wettkampfkarten mit hoher Balance.' },
    nl: { label: 'Toernooi', desc: 'Officiële competitiekaarten met hoge balans.' },
  },
};

const MAP_I18N = {
  africa: { enName: 'Africa', en: 'Africa', zh: '非洲', fr: 'Afrique', de: 'Afrika', nl: 'Afrika' },
  asia: { enName: 'Asia', en: 'Asia', zh: '亚洲', fr: 'Asie', de: 'Asien', nl: 'Azië' },
  australia: { enName: 'Australia', en: 'Australia', zh: '澳大利亚', fr: 'Australie', de: 'Australien', nl: 'Australië' },
  europe: { enName: 'Europe', en: 'Europe', zh: '欧洲', fr: 'Europe', de: 'Europa', nl: 'Europa' },
  europeclassic: { enName: 'Europe Classic', en: 'Europe Classic', zh: '欧洲经典', fr: 'Europe classique', de: 'Europa Klassisch', nl: 'Europa Klassiek' },
  giantworldmap: { enName: 'Giant World Map', en: 'Giant World Map', zh: '巨型世界图', fr: 'Carte mondiale géante', de: 'Riesige Weltkarte', nl: 'Reusachtige wereldkaart' },
  northamerica: { enName: 'North America', en: 'North America', zh: '北美', fr: 'Amérique du Nord', de: 'Nordamerika', nl: 'Noord-Amerika' },
  oceania: { enName: 'Oceania', en: 'Oceania', zh: '大洋洲', fr: 'Océanie', de: 'Ozeanien', nl: 'Oceanië' },
  southamerica: { enName: 'South America', en: 'South America', zh: '南美', fr: 'Amérique du Sud', de: 'Südamerika', nl: 'Zuid-Amerika' },
  world: { enName: 'World', en: 'World', zh: '世界', fr: 'Monde', de: 'Welt', nl: 'Wereld' },
  achiran: { enName: 'Achiran', en: 'Achiran', zh: '阿契兰', fr: 'Achiran', de: 'Achiran', nl: 'Achiran' },
  aegean: { enName: 'Aegean', en: 'Aegean', zh: '爱琴海', fr: 'Égée', de: 'Ägäis', nl: 'Egeïsche Zee' },
  alps: { enName: 'Alps', en: 'Alps', zh: '阿尔卑斯', fr: 'Alpes', de: 'Alpen', nl: 'Alpen' },
  amazonriver: { enName: 'Amazon River', en: 'Amazon River', zh: '亚马逊河', fr: 'Amazone', de: 'Amazonas', nl: 'Amazone' },
  antarctica: { enName: 'Antarctica', en: 'Antarctica', zh: '南极洲', fr: 'Antarctique', de: 'Antarktis', nl: 'Antarctica' },
  archipelagosea: { enName: 'Archipelago Sea', en: 'Archipelago Sea', zh: '群岛海', fr: "Mer de l'Archipel", de: 'Schärenmeer', nl: 'Schiereilandzee' },
  arctic: { enName: 'Arctic', en: 'Arctic', zh: '北极', fr: 'Arctique', de: 'Arktis', nl: 'Arctisch gebied' },
  baikal: { enName: 'Baikal', en: 'Baikal', zh: '贝加尔', fr: 'Baïkal', de: 'Baikal', nl: 'Bajkal' },
  baikalnukewars: { enName: 'Baikal Nuke Wars', en: 'Baikal Nuke Wars', zh: '贝加尔核战', fr: 'Guerres nucléaires du Baïkal', de: 'Baikal-Atomkriege', nl: 'Bajkal Nuke-oorlogen' },
  bajacalifornia: { enName: 'Baja California', en: 'Baja California', zh: '下加利福尼亚', fr: 'Basse-Californie', de: 'Niederkalifornien', nl: 'Neder-Californië' },
  beringsea: { enName: 'Bering Sea', en: 'Bering Sea', zh: '白令海', fr: 'Mer de Béring', de: 'Beringmeer', nl: 'Beringzee' },
  beringstrait: { enName: 'Bering Strait', en: 'Bering Strait', zh: '白令海峡', fr: 'Détroit de Béring', de: 'Beringstraße', nl: 'Beringstraat' },
  betweentwoseas: { enName: 'Between Two Seas', en: 'Between Two Seas', zh: '两海之间', fr: 'Entre deux mers', de: 'Zwischen zwei Meeren', nl: 'Tussen twee zeeën' },
  blacksea: { enName: 'Black Sea', en: 'Black Sea', zh: '黑海', fr: 'Mer Noire', de: 'Schwarzes Meer', nl: 'Zwarte Zee' },
  bosphorusstraits: { enName: 'Bosphorus Straits', en: 'Bosphorus Straits', zh: '博斯普鲁斯海峡', fr: 'Détroits du Bosphore', de: 'Bosporus', nl: 'Bosporus' },
  britannia: { enName: 'Britannia', en: 'Britannia', zh: '不列颠', fr: 'Britannia', de: 'Britannia', nl: 'Britannia' },
  britanniaclassic: { enName: 'Britannia Classic', en: 'Britannia Classic', zh: '不列颠经典', fr: 'Britannia classique', de: 'Britannia Klassisch', nl: 'Britannia Klassiek' },
  caucasus: { enName: 'Caucasus', en: 'Caucasus', zh: '高加索', fr: 'Caucase', de: 'Kaukasus', nl: 'Kaukasus' },
  conakry: { enName: 'Conakry', en: 'Conakry', zh: '科纳克里', fr: 'Conakry', de: 'Conakry', nl: 'Conakry' },
  deglaciatedantarctica: { enName: 'Deglaciated Antarctica', en: 'Deglaciated Antarctica', zh: '解冻南极', fr: 'Antarctique déglacé', de: 'Enteistes Antarktis', nl: 'Ontijst Antarctica' },
  didier: { enName: 'Didier', en: 'Didier', zh: '迪迪埃', fr: 'Didier', de: 'Didier', nl: 'Didier' },
  didierfrance: { enName: 'Didier France', en: 'Didier France', zh: '迪迪埃·法国', fr: 'Didier France', de: 'Didier Frankreich', nl: 'Didier Frankrijk' },
  dyslexdria: { enName: 'Dyslexdria', en: 'Dyslexdria', zh: '困惑塞德里亚', fr: 'Dyslexdria', de: 'Dyslexdria', nl: 'Dyslexdria' },
  eastasia: { enName: 'East Asia', en: 'East Asia', zh: '东亚', fr: "Asie de l'Est", de: 'Ostasien', nl: 'Oost-Azië' },
  falklandislands: { enName: 'Falkland Islands', en: 'Falkland Islands', zh: '福克兰群岛', fr: 'Îles Malouines', de: 'Falklandinseln', nl: 'Falklandeilanden' },
  faroeislands: { enName: 'Faroe Islands', en: 'Faroe Islands', zh: '法罗群岛', fr: 'Îles Féroé', de: 'Färöer-Inseln', nl: 'Faeröer' },
  fourislands: { enName: 'Four Islands', en: 'Four Islands', zh: '四岛', fr: 'Quatre îles', de: 'Vier Inseln', nl: 'Vier eilanden' },
  gatewaytotheatlantic: { enName: 'Gateway to the Atlantic', en: 'Gateway to the Atlantic', zh: '大西洋之门', fr: "Porte de l'Atlantique", de: 'Tor zum Atlantik', nl: 'Poort naar de Atlantische Oceaan' },
  greatlakes: { enName: 'Great Lakes', en: 'Great Lakes', zh: '大湖区', fr: 'Grands Lacs', de: 'Große Seen', nl: 'Grote Meren' },
  gulfofstlawrence: { enName: 'Gulf of St. Lawrence', en: 'Gulf of St. Lawrence', zh: '圣劳伦斯湾', fr: 'Golfe du Saint-Laurent', de: 'Sankt-Lorenz-Golf', nl: 'Saint Lawrencebaai' },
  halkidiki: { enName: 'Halkidiki', en: 'Halkidiki', zh: '哈尔基季基', fr: 'Chalcidique', de: 'Chalkidiki', nl: 'Chalkidiki' },
  hawaii: { enName: 'Hawaii', en: 'Hawaii', zh: '夏威夷', fr: 'Hawaï', de: 'Hawaii', nl: 'Hawaï' },
  iceland: { enName: 'Iceland', en: 'Iceland', zh: '冰岛', fr: 'Islande', de: 'Island', nl: 'IJsland' },
  italia: { enName: 'Italia', en: 'Italia', zh: '意大利', fr: 'Italie', de: 'Italien', nl: 'Italië' },
  japan: { enName: 'Japan', en: 'Japan', zh: '日本', fr: 'Japon', de: 'Japan', nl: 'Japan' },
  lemnos: { enName: 'Lemnos', en: 'Lemnos', zh: '林姆诺斯岛', fr: 'Lemnos', de: 'Lemnos', nl: 'Lemnos' },
  lisbon: { enName: 'Lisbon', en: 'Lisbon', zh: '里斯本', fr: 'Lisbonne', de: 'Lissabon', nl: 'Lissabon' },
  losangeles: { enName: 'Los Angeles', en: 'Los Angeles', zh: '洛杉矶', fr: 'Los Angeles', de: 'Los Angeles', nl: 'Los Angeles' },
  manicouagan: { enName: 'Manicouagan', en: 'Manicouagan', zh: '马尼夸根', fr: 'Manicouagan', de: 'Manicouagan', nl: 'Manicouagan' },
  marenostrum: { enName: 'Mare Nostrum', en: 'Mare Nostrum', zh: '地中海', fr: 'Mare Nostrum', de: 'Mare Nostrum', nl: 'Mare Nostrum' },
  mena: { enName: 'MENA', en: 'MENA', zh: '中东北非', fr: 'MOAN', de: 'MENA', nl: 'MONA' },
  middleeast: { enName: 'Middle East', en: 'Middle East', zh: '中东', fr: 'Moyen-Orient', de: 'Naher Osten', nl: 'Midden-Oosten' },
  montreal: { enName: 'Montreal', en: 'Montreal', zh: '蒙特利尔', fr: 'Montréal', de: 'Montreal', nl: 'Montreal' },
  newyorkcity: { enName: 'New York City', en: 'New York City', zh: '纽约', fr: 'New York', de: 'New York City', nl: 'New York City' },
  niledelta: { enName: 'Nile Delta', en: 'Nile Delta', zh: '尼罗河三角洲', fr: 'Delta du Nil', de: 'Nildelta', nl: 'Nijldelta' },
  passage: { enName: 'Passage', en: 'Passage', zh: '海峡通道', fr: 'Passage', de: 'Durchgang', nl: 'Doorgang' },
  sanfrancisco: { enName: 'San Francisco', en: 'San Francisco', zh: '旧金山', fr: 'San Francisco', de: 'San Francisco', nl: 'San Francisco' },
  straitofgibraltar: { enName: 'Strait of Gibraltar', en: 'Strait of Gibraltar', zh: '直布罗陀海峡', fr: 'Détroit de Gibraltar', de: 'Straße von Gibraltar', nl: 'Straat van Gibraltar' },
  straitofhormuz: { enName: 'Strait of Hormuz', en: 'Strait of Hormuz', zh: '霍尔木兹海峡', fr: "Détroit d'Ormuz", de: 'Straße von Hormus', nl: 'Straat van Hormuz' },
  straitofmalacca: { enName: 'Strait of Malacca', en: 'Strait of Malacca', zh: '马六甲海峡', fr: 'Détroit de Malacca', de: 'Straße von Malakka', nl: 'Straat Malakka' },
  svalmel: { enName: 'Svalmel', en: 'Svalmel', zh: 'Svalmel', fr: 'Svalmel', de: 'Svalmel', nl: 'Svalmel' },
  taiwanstrait: { enName: 'Taiwan Strait', en: 'Taiwan Strait', zh: '台湾海峡', fr: 'Détroit de Taïwan', de: 'Taiwanstraße', nl: 'Straat van Taiwan' },
  thestraits: { enName: 'The Straits', en: 'The Straits', zh: '诸海峡', fr: 'Les Détroits', de: 'Die Meerengen', nl: 'De Zeestraten' },
  tradersdream: { enName: "Trader's Dream", en: "Trader's Dream", zh: '商人之梦', fr: 'Rêve du marchand', de: 'Händlertraum', nl: 'Handelaarsdroom' },
  twolakes: { enName: 'Two Lakes', en: 'Two Lakes', zh: '双湖', fr: 'Deux lacs', de: 'Zwei Seen', nl: 'Twee meren' },
  yenisei: { enName: 'Yenisei', en: 'Yenisei', zh: '叶尼塞河', fr: 'Ienisseï', de: 'Jenissei', nl: 'Jenisej' },
  luna: { enName: 'Luna', en: 'Luna', zh: '月球', fr: 'Lune', de: 'Mond', nl: 'Maan' },
  mars: { enName: 'Mars', en: 'Mars', zh: '火星', fr: 'Mars', de: 'Mars', nl: 'Mars' },
  milkyway: { enName: 'Milky Way', en: 'Milky Way', zh: '银河系', fr: 'Voie lactée', de: 'Milchstraße', nl: 'Melkweg' },
  pangaea: { enName: 'Pangaea', en: 'Pangaea', zh: '盘古大陆', fr: 'Pangée', de: 'Pangäa', nl: 'Pangea' },
  pluto: { enName: 'Pluto', en: 'Pluto', zh: '冥王星', fr: 'Pluton', de: 'Pluto', nl: 'Pluto' },
  surrounded: { enName: 'Surrounded', en: 'Surrounded', zh: '四面楚歌', fr: 'Encerclé', de: 'Umzingelt', nl: 'Omsingeld' },
  sierpinski: { enName: 'Sierpinski', en: 'Sierpinski', zh: '谢尔宾斯基', fr: 'Sierpinski', de: 'Sierpinski', nl: 'Sierpinski' },
  thebox: { enName: 'The Box', en: 'The Box', zh: '盒子', fr: 'La Boîte', de: 'Die Box', nl: 'De Doos' },
  tourney1: { enName: 'Tournament 1', en: 'Tournament 1', zh: '锦标赛 1', fr: 'Tournoi 1', de: 'Turnier 1', nl: 'Toernooi 1' },
  tourney2: { enName: 'Tournament 2', en: 'Tournament 2', zh: '锦标赛 2', fr: 'Tournoi 2', de: 'Turnier 2', nl: 'Toernooi 2' },
  tourney3: { enName: 'Tournament 3', en: 'Tournament 3', zh: '锦标赛 3', fr: 'Tournoi 3', de: 'Turnier 3', nl: 'Toernooi 3' },
  tourney4: { enName: 'Tournament 4', en: 'Tournament 4', zh: '锦标赛 4', fr: 'Tournoi 4', de: 'Turnier 4', nl: 'Toernooi 4' },
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
const structures = units.filter((u) => u.category === 'structure').map((u) => ({ ...u }));

const liveMapIds = readMapDirs();
const idToCategory = {};
for (const [cat, ids] of Object.entries(MAP_CATEGORIES)) {
  ids.forEach((id) => (idToCategory[id] = cat));
}

function buildMapEntry(id) {
  const tr = MAP_I18N[id] ?? { enName: id, en: id, zh: id, fr: id, de: id, nl: id };
  return {
    id,
    enName: tr.enName,
    category: idToCategory[id] ?? 'Regional',
    i18n: {
      en: { name: tr.en },
      zh: { name: tr.zh },
      fr: { name: tr.fr },
      de: { name: tr.de },
      nl: { name: tr.nl },
    },
  };
}

const maps = liveMapIds
  .map(buildMapEntry)
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
  meta: {
    i18n: {
      en: { description: 'Core formulas extracted from OpenFrontIO v24 (numeric values/coefficients shown as strings).' },
      zh: { description: '从 OpenFrontIO v24 提取的核心公式(数值/系数为字符串展示)。' },
      fr: { description: "Formules clés extraites d'OpenFrontIO v24 (valeurs/coefficients en chaînes)." },
      de: { description: 'Aus OpenFrontIO v24 extrahierte Kernformeln (Werte/Koeffizienten als Strings).' },
      nl: { description: 'Kernformules uit OpenFrontIO v24 (waarden/coëfficiënten als strings weergegeven).' },
    },
  },
  groups: FORMULAS_SNAPSHOT,
};

const mapsPayload = {
  meta: {
    total: maps.length,
    categories: Object.fromEntries(
      Object.keys(MAP_CATEGORIES).map((cat) => [
        cat,
        { count: mapsByCategory[cat].length, i18n: CATEGORY_I18N[cat] },
      ]),
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
