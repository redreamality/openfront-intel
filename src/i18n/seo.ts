import type { Lang } from './ui';

type SeoCopy = {
  home: string;
  mechanics: (title: string) => string;
  database: (title: string) => string;
  strategies: (title: string) => string;
  guides: (title: string) => string;
  changelog: (title: string) => string;
  fallback: (title: string) => string;
  special: Record<string, string>;
  specialPaths: Record<string, string>;
};

type SeoSection = 'mechanics' | 'database' | 'strategies' | 'guides' | 'changelog';

const seoCopy: Record<Lang, SeoCopy> = {
  en: {
    home: 'OpenFront.io Guide: Maps, Units, Mechanics & Strategy',
    mechanics: (title) => `OpenFront.io ${title}: Rules, Stats & Examples`,
    database: (title) => `OpenFront.io ${title}: Stats, Costs & Formulas`,
    strategies: (title) => `${title}: OpenFront.io Tactics, Timing & Counters`,
    guides: (title) => `${title}: Step-by-Step OpenFront.io Guide`,
    changelog: (title) => `${title}: OpenFront.io Patch Notes & Meta`,
    fallback: (title) => `${title} | OpenFront.io Guide`,
    special: {
      glossary: 'OpenFront.io Glossary: Units, Modes & Strategy Terms',
      shortcuts: 'OpenFront.io Hotkeys: Keyboard & Mouse Controls',
      faq: 'OpenFront.io FAQ: Gameplay, Maps, Units & Strategy',
      about: 'About OpenFront Intel: Sources, Data & Editorial Method',
      contact: 'Contact OpenFront Intel: Corrections & Contributions',
      privacy: 'OpenFront Intel Privacy: Analytics & Cookie Choices',
      'editorial-policy': 'OpenFront Intel Editorial Policy: Sources & Verification',
      'whats-new': "OpenFront.io What's New: Releases, Merged Changes & Development",
    },
    specialPaths: {
      'guides/doomsday-clock': 'OpenFront Doomsday Clock: Rules, Waves & Survival',
      'guides/building-timing': 'OpenFront Building Timing: Cities, Factories, Ports & Defense',
      'guides/hotkeys': 'OpenFront Hotkey Practice: Faster Keyboard & Mouse Control',
      'guides/map-size-compact-mode': 'OpenFront Map Sizes: Compact Scale & Player Counts',
      'guides/population-growth': 'OpenFront Population Growth: Troops, Cities & Timing',
      'mechanics/economy': 'OpenFront Economy Guide: Troop Growth, Cities & Trains',
      'mechanics/nations': 'OpenFront Nation AI: Behavior, Diplomacy & Counterplay',
      'strategies/diplomacy-betrayal': 'OpenFront Diplomacy: Alliances, Embargoes & Betrayal',
      'strategies/nuclear-deterrence': 'OpenFront Nuclear Deterrence: SAM Defense & Counterplay',
    },
  },
  fr: {
    home: 'Guide OpenFront.io : cartes, unités, mécaniques et stratégies',
    mechanics: (title) => `OpenFront.io ${title} : règles, chiffres, exemples`,
    database: (title) => `OpenFront.io — ${title} : stats, coûts et formules`,
    strategies: (title) => `${title} : tactiques, timing et contres OpenFront.io`,
    guides: (title) => `${title} : guide OpenFront.io étape par étape`,
    changelog: (title) => `${title} : notes de mise à jour OpenFront.io`,
    fallback: (title) => `${title} | Guide OpenFront.io`,
    special: {
      glossary: 'Glossaire OpenFront.io : unités, modes et termes de stratégie',
      shortcuts: 'Raccourcis OpenFront.io : commandes clavier et souris',
      faq: 'FAQ OpenFront.io : gameplay, cartes, unités et stratégies',
      about: 'À propos d’OpenFront Intel : sources, données et méthode',
      contact: 'Contacter OpenFront Intel : corrections et contributions',
      privacy: 'Confidentialité OpenFront Intel : analytics et cookies',
      'editorial-policy': 'Politique éditoriale : sources et vérification OpenFront.io',
      'whats-new': 'Nouveautés OpenFront.io : releases, changements et développement',
    },
    specialPaths: {
      'guides/doomsday-clock': 'Doomsday Clock OpenFront : règles, vagues et survie',
      'guides/building-timing': 'Bâtiments OpenFront : quand construire City, Port et Factory',
      'guides/hotkeys': 'Raccourcis OpenFront : entraînement clavier et souris',
      'guides/map-size-compact-mode': 'Tailles de cartes OpenFront : mode Compact et joueurs',
      'guides/population-growth': 'Population OpenFront : croissance, plafond et timing',
      'guides/water-nukes': 'Water Nukes OpenFront : règles, portée et défense',
      'guides/four-islands-team-coordination': 'Coordination Four Islands : rôles et routes OpenFront',
      'guides/threat-assessment': 'Évaluer les menaces OpenFront : cibles et limites',
      'guides/warship-veterancy': 'Vétéran Warship OpenFront : réparation et retraite',
      'mechanics/economy': 'Économie OpenFront : troupes, City, Port et trains',
      'mechanics/modes': 'Modes OpenFront : salons privés, équipes et spectateurs',
      'strategies/ffa-opening': 'Ouverture FFA OpenFront : spawn, expansion et frontières',
      'strategies/nuclear-deterrence': 'Dissuasion nucléaire OpenFront : défense SAM et riposte',
    },
  },
  nl: {
    home: 'OpenFront.io-gids: kaarten, eenheden, mechanieken en strategie',
    mechanics: (title) => `OpenFront.io ${title}: regels, cijfers en voorbeelden`,
    database: (title) => `OpenFront.io ${title}: stats, kosten en formules`,
    strategies: (title) => `${title}: OpenFront.io tactiek, timing en counters`,
    guides: (title) => `${title}: stapsgewijze OpenFront.io-gids`,
    changelog: (title) => `${title}: OpenFront.io patch notes en meta`,
    fallback: (title) => `${title} | OpenFront.io-gids`,
    special: {
      glossary: 'OpenFront.io-woordenlijst: eenheden, modi en strategietermen',
      shortcuts: 'OpenFront.io-sneltoetsen: toetsenbord- en muisbediening',
      faq: 'OpenFront.io-FAQ: gameplay, kaarten, eenheden en strategie',
      about: 'Over OpenFront Intel: bronnen, data en redactionele methode',
      contact: 'Contact OpenFront Intel: correcties en bijdragen',
      privacy: 'Privacy OpenFront Intel: analytics en cookiekeuzes',
      'editorial-policy': 'Redactioneel beleid: OpenFront.io-bronnen en controle',
      'whats-new': 'OpenFront.io Wat is er nieuw: releases, wijzigingen en ontwikkeling',
    },
    specialPaths: {
      'guides/doomsday-clock': 'OpenFront Doomsday Clock: regels, golven & overleven',
      'guides/population-growth': 'OpenFront bevolkingsgroei: troepen, steden en timing',
      'mechanics/economy': 'OpenFront economie: troepen, steden, havens en treinen',
      'mechanics/modes': "OpenFront spelmodi: privélobby's, teams en spectators",
      'guides/threat-assessment': 'OpenFront bedreigingsanalyse: doelkeuze en stopgrens',
      'strategies/nuclear-deterrence': 'OpenFront nucleaire afschrikking: SAM-verdediging en counters',
    },
  },
  de: {
    home: 'OpenFront.io Guide: Karten, Einheiten, Mechaniken & Strategie',
    mechanics: (title) => `OpenFront.io ${title}: Regeln, Werte und Beispiele`,
    database: (title) => `OpenFront.io ${title}: Werte, Kosten und Formeln`,
    strategies: (title) => `${title}: OpenFront.io Taktik, Timing und Konter`,
    guides: (title) => `${title}: OpenFront.io Schritt-für-Schritt-Guide`,
    changelog: (title) => `${title}: OpenFront.io Patch Notes und Meta`,
    fallback: (title) => `${title} | OpenFront.io Guide`,
    special: {
      glossary: 'OpenFront.io Glossar: Einheiten, Modi und Strategiebegriffe',
      shortcuts: 'OpenFront.io Tastenkürzel: Tastatur- und Maussteuerung',
      faq: 'OpenFront.io FAQ: Gameplay, Karten, Einheiten und Strategie',
      about: 'Über OpenFront Intel: Quellen, Daten und redaktionelle Methode',
      contact: 'OpenFront Intel kontaktieren: Korrekturen und Beiträge',
      privacy: 'OpenFront Intel Datenschutz: Analytics und Cookie-Auswahl',
      'editorial-policy': 'Redaktionsrichtlinie: OpenFront.io Quellen und Prüfung',
      'whats-new': 'OpenFront.io Neuigkeiten: Releases, Änderungen und Entwicklung',
    },
    specialPaths: {
      'guides/doomsday-clock': 'OpenFront Doomsday Clock: Regeln, Wellen & Überleben',
      'guides/building-timing': 'OpenFront Gebäude-Timing: City, Hafen, Fabrik und Abwehr',
      'guides/hotkeys': 'OpenFront Hotkey-Training: Tastatur und Maus schneller nutzen',
      'guides/map-size-compact-mode': 'OpenFront Kartengrößen: Compact-Modus und Spielerzahl',
      'guides/population-growth': 'OpenFront Truppenwachstum: Limit, Städte und Timing',
      'guides/threat-assessment': 'OpenFront Bedrohungsanalyse: Zielwahl und Stopplinie',
      'mechanics/economy': 'OpenFront Wirtschaft: Truppen, Städte, Häfen und Züge',
      'mechanics/modes': 'OpenFront Spielmodi: Private Lobbys, Teams und Zuschauer',
      'strategies/nuclear-deterrence': 'OpenFront Nuklearabschreckung: SAM-Abwehr und Konter',
    },
  },
  zh: {
    home: 'OpenFront.io 攻略站：地图、单位、机制与实战策略',
    mechanics: (title) => `OpenFront.io ${title}详解：规则、数值与实战例子`,
    database: (title) => `OpenFront.io ${title}：单位数值、成本与公式`,
    strategies: (title) => `${title}：OpenFront.io 实战打法、节奏与反制`,
    guides: (title) => `${title}：OpenFront.io 分步教程与避坑指南`,
    changelog: (title) => `${title}：OpenFront.io 更新内容与版本环境`,
    fallback: (title) => `${title}｜OpenFront.io 攻略`,
    special: {
      glossary: 'OpenFront.io 术语词典：单位、模式与策略概念',
      shortcuts: 'OpenFront.io 快捷键大全：键盘、鼠标与高效操作',
      faq: 'OpenFront.io 常见问题：玩法、地图、单位与策略解答',
      about: '关于 OpenFront 情报站：资料来源、数据与核验方法',
      contact: '联系 OpenFront 情报站：纠错、建议与内容贡献',
      privacy: 'OpenFront 情报站隐私说明：统计与 Cookie 选择',
      'editorial-policy': 'OpenFront 情报站编辑规范：来源、验证与更正',
      'whats-new': 'OpenFront.io 最新动态：已上线、已合并与开发中',
    },
    specialPaths: {
      'guides/doomsday-clock': 'OpenFront 末日时钟：规则、波次与生存攻略',
      'guides/map-size-compact-mode': 'OpenFront 地图尺寸：Compact 模式、规模与人数',
      'guides/population-growth': 'OpenFront 人口增长：兵力上限、City 与扩张时机',
      'mechanics/nations': 'OpenFront Nation AI：扩张、外交与反制',
    },
  },
};

const shortSeoCopy: Record<Lang, Record<SeoSection, (title: string) => string>> = {
  en: {
    mechanics: (title) => `${title}: Rules & Examples | OpenFront.io`,
    database: (title) => `${title}: Stats & Costs | OpenFront.io`,
    strategies: (title) => `${title}: Tactics & Counters | OpenFront.io`,
    guides: (title) => `${title}: OpenFront.io Step-by-Step Guide`,
    changelog: (title) => `${title}: OpenFront.io Patch Notes`,
  },
  fr: {
    mechanics: (title) => `${title} : règles et exemples OpenFront.io`,
    database: (title) => `${title} : stats et coûts OpenFront.io`,
    strategies: (title) => `${title} : tactiques et contres OpenFront.io`,
    guides: (title) => `${title} : guide pas à pas OpenFront.io`,
    changelog: (title) => `${title} : notes de version OpenFront.io`,
  },
  nl: {
    mechanics: (title) => `${title}: regels & voorbeelden | OpenFront.io`,
    database: (title) => `${title}: stats & kosten | OpenFront.io`,
    strategies: (title) => `${title}: tactiek & counters | OpenFront.io`,
    guides: (title) => `${title}: OpenFront.io-stappengids`,
    changelog: (title) => `${title}: OpenFront.io patch notes`,
  },
  de: {
    mechanics: (title) => `${title}: Regeln & Beispiele | OpenFront.io`,
    database: (title) => `${title}: Werte & Kosten | OpenFront.io`,
    strategies: (title) => `${title}: Taktik & Konter | OpenFront.io`,
    guides: (title) => `${title}: OpenFront.io Schritt-für-Schritt`,
    changelog: (title) => `${title}: OpenFront.io Patch Notes`,
  },
  zh: {
    mechanics: (title) => `${title}：OpenFront.io 规则与实例`,
    database: (title) => `${title}：OpenFront.io 数值与成本`,
    strategies: (title) => `${title}：OpenFront.io 打法与反制`,
    guides: (title) => `${title}：OpenFront.io 分步指南`,
    changelog: (title) => `${title}：OpenFront.io 版本说明`,
  },
};

const seoDescriptionSuffixes: Record<Lang, string[]> = {
  en: [
    ' Checked against the current release.',
    ' Use this source-checked current-version reference to compare rules, timing, costs, and practical OpenFront.io decisions.',
    ' This current-version OpenFront.io reference checks rules, numbers, timing, and edge cases against official releases and source data so you can compare options, avoid outdated advice, and make a clear plan before your next match.',
  ],
  fr: [
    ' Vérifié sur la version actuelle.',
    ' Utilisez cette référence de version vérifiée pour comparer règles, timing, coûts et décisions pratiques dans OpenFront.io.',
    ' Cette référence OpenFront.io vérifie règles, chiffres, timing et cas limites avec les releases officielles et les données source afin de comparer les options, éviter les conseils périmés et préparer un plan clair avant la prochaine partie.',
  ],
  nl: [
    ' Gecontroleerd voor de huidige versie.',
    ' Gebruik deze brongecontroleerde versiereferentie om regels, timing, kosten en praktische keuzes in OpenFront.io te vergelijken.',
    ' Deze OpenFront.io-referentie controleert regels, cijfers, timing en uitzonderingen aan officiële releases en brondata, zodat je opties kunt vergelijken, verouderd advies vermijdt en met een helder plan aan je volgende partij begint.',
  ],
  de: [
    ' Für die aktuelle Version geprüft.',
    ' Nutze diese quellengestützte Versionsreferenz, um Regeln, Timing, Kosten und praktische Entscheidungen in OpenFront.io zu vergleichen.',
    ' Diese OpenFront.io-Referenz prüft Regeln, Zahlen, Timing und Grenzfälle anhand offizieller Releases und Quelldaten, damit du Optionen vergleichen, veraltete Ratschläge vermeiden und die nächste Partie mit einem klaren Plan beginnen kannst.',
  ],
  zh: [
    ' 内容已按当前正式版本核验。',
    ' 本文按当前正式版本核验规则、数值与操作边界，帮助你比较时机、成本和实战选择。',
    ' 本文按当前正式版本核验规则、数值、时机与操作边界，并结合正式发布说明和源码数据交叉检查，帮助你比较开局扩张、经济投入、战斗节奏、地图路线与反制选择，避开已经过时的说法，在下一局开始前快速找到可执行的结论和相关资料。',
  ],
};

function clipDescription(description: string, maximum: number, lang: Lang) {
  const characters = [...description];
  if (characters.length <= maximum) return description;

  const budget = maximum - 1;
  let clipped = characters.slice(0, budget).join('').trim();
  const sentenceMarks = lang === 'zh' ? ['。', '！', '？', '；'] : ['. ', '! ', '? ', '; '];
  const sentenceBoundary = Math.max(...sentenceMarks.map((mark) => clipped.lastIndexOf(mark)));
  if (sentenceBoundary >= 109) {
    clipped = clipped.slice(0, sentenceBoundary + 1).trim();
  } else if (lang !== 'zh') {
    const wordBoundary = clipped.lastIndexOf(' ');
    if (wordBoundary >= 109) clipped = clipped.slice(0, wordBoundary).trim();
  }

  return `${clipped.replace(/[\s,，、;；:：-]+$/u, '')}…`;
}

export function getSeoDescription(lang: Lang, description: string) {
  const normalized = description.replace(/\s+/g, ' ').trim();
  const length = [...normalized].length;
  if (length > 160) return clipDescription(normalized, 160, lang);
  if (length >= 110) return normalized;

  for (const suffix of seoDescriptionSuffixes[lang]) {
    const candidate = `${normalized}${suffix}`;
    const candidateLength = [...candidate].length;
    if (candidateLength >= 110 && candidateLength <= 160) return candidate;
  }

  return clipDescription(`${normalized}${seoDescriptionSuffixes[lang].at(-1)}`, 160, lang);
}

function trimLanguagePrefix(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] && segments[0] in seoCopy) segments.shift();
  return segments;
}

function compactTitle(title: string) {
  const separators = [' — ', ' – ', '（', '(', '：', ': '];
  let compact = title;
  for (const separator of separators) {
    if (compact.includes(separator)) compact = compact.split(separator)[0];
  }
  return compact.trim();
}

function clipTitle(title: string, maximum: number, lang: Lang) {
  const characters = [...title];
  if (characters.length <= maximum) return title;

  const budget = Math.max(maximum - 1, 1);
  let clipped = characters.slice(0, budget).join('').trim();
  if (lang !== 'zh') {
    const boundary = Math.max(clipped.lastIndexOf(' '), clipped.lastIndexOf('-'));
    if (boundary >= Math.floor(budget * 0.6)) clipped = clipped.slice(0, boundary);
  }
  clipped = clipped.replace(/[\s:：—–|,，、-]+$/u, '').trim();
  return `${clipped}…`;
}

function fitTitle(
  candidate: string,
  original: string,
  lang: Lang,
  formatter: (title: string) => string,
  shortFormatter: (title: string) => string,
) {
  const limit = lang === 'zh' ? 40 : 68;
  if ([...candidate].length <= limit) return candidate;
  const compact = compactTitle(original);
  const compactCandidate = formatter(compact);
  if ([...compactCandidate].length <= limit) return compactCandidate;

  const shortCandidate = shortFormatter(compact);
  if ([...shortCandidate].length <= limit) return shortCandidate;

  const marker = '__OPENFRONT_TITLE__';
  const template = shortFormatter(marker);
  const markerIndex = template.indexOf(marker);
  if (markerIndex >= 0) {
    const prefix = template.slice(0, markerIndex);
    const suffix = template.slice(markerIndex + marker.length);
    const available = limit - [...prefix].length - [...suffix].length;
    if (available > 1) {
      const clippedCandidate = shortFormatter(clipTitle(compact, available, lang));
      if ([...clippedCandidate].length <= limit) return clippedCandidate;
    }
  }

  const fallback = seoCopy[lang].fallback(compact);
  return [...fallback].length <= limit ? fallback : compact;
}

export function getSeoTitle(lang: Lang, pathname: string, title: string) {
  const segments = trimLanguagePrefix(pathname);
  const section = segments[0] ?? 'home';
  const copy = seoCopy[lang];
  const pathKey = segments.join('/');

  if (section === 'home') return copy.home;
  if (section === '404') return title;
  if (copy.specialPaths[pathKey]) return copy.specialPaths[pathKey];
  if (copy.special[section]) return copy.special[section];

  const formatter = section === 'mechanics'
    ? copy.mechanics
    : section === 'database'
      ? copy.database
      : section === 'strategies'
        ? copy.strategies
        : section === 'guides'
          ? copy.guides
          : section === 'changelog'
            ? copy.changelog
            : copy.fallback;

  const shortFormatter = section === 'mechanics'
    ? shortSeoCopy[lang].mechanics
    : section === 'database'
      ? shortSeoCopy[lang].database
      : section === 'strategies'
        ? shortSeoCopy[lang].strategies
        : section === 'guides'
          ? shortSeoCopy[lang].guides
          : section === 'changelog'
            ? shortSeoCopy[lang].changelog
            : copy.fallback;

  return fitTitle(formatter(title), title, lang, formatter, shortFormatter);
}
