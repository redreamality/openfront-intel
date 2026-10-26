import type { Lang } from './ui';

// Explicit titles retain the task when the generic collection template shortens a heading.
export const recoveryTitles: Record<Lang, Record<string, string>> = {
  en: {
    'guides/how-many-factories': 'How Many Factories in OpenFront? Build, Upgrade or Wait',
    guides: 'OpenFront Guides: How to Play, Controls & First Match',
    strategies: 'OpenFront Strategy & Meta: Opening, Economy and Endgame',
    'guides/what-do-factories-do': 'What Do Factories Do in OpenFront? Trains & Gold Explained',
    'guides/seekable-replay-viewer': 'OpenFront Replays: Find a Game, Watch & Use the Timeline',
    'guides/replay-review': 'OpenFront Replay Review: Learn From Your Last Match',
  },
  fr: {
    'guides/how-many-factories': 'Combien d’usines dans OpenFront ? Construire ou améliorer',
    guides: 'Guide OpenFront : tuto, commandes et première partie',
    strategies: 'Stratégie et méta OpenFront : début, économie et fin de partie',
    'guides/what-do-factories-do': 'À quoi servent les usines OpenFront ? Trains et or',
    'guides/seekable-replay-viewer': 'Replays OpenFront : trouver une partie et lire la chronologie',
    'guides/replay-review': 'Analyser un replay OpenFront : progresser après une partie',
  },
  de: {
    'guides/how-many-factories': 'Wie viele Fabriken in OpenFront? Bauen oder ausbauen',
    guides: 'OpenFront-Guide: Tutorial, Steuerung und erste Partie',
    strategies: 'OpenFront Strategie & Meta: Start, Wirtschaft und Endspiel',
    'guides/what-do-factories-do': 'Was machen Fabriken in OpenFront? Züge und Gold erklärt',
    'guides/seekable-replay-viewer': 'OpenFront Replays: Partie finden, ansehen und vorspulen',
    'guides/replay-review': 'OpenFront Replay-Analyse: Aus der letzten Partie lernen',
  },
  nl: {
    'guides/how-many-factories': 'Hoeveel fabrieken in OpenFront? Bouwen of upgraden',
    guides: 'OpenFront-gids: tutorial, bediening en eerste partij',
    strategies: 'OpenFront strategie & meta: opening, economie en eindspel',
    'guides/what-do-factories-do': 'Wat doen fabrieken in OpenFront? Treinen en goud uitgelegd',
    'guides/seekable-replay-viewer': 'OpenFront replays: partij vinden, bekijken en doorspoelen',
    'guides/replay-review': 'OpenFront replay-analyse: leren van je laatste partij',
  },
  zh: {
    'guides/how-many-factories': 'OpenFront 该造多少工厂：新建、升级与停手条件',
    guides: 'OpenFront 新手攻略：怎么玩、操作与第一局教程',
    strategies: 'OpenFront 策略与当前打法：开局、经济和终局',
    'guides/what-do-factories-do': 'OpenFront 工厂有什么用：火车、铁路与金币收入',
    'guides/seekable-replay-viewer': 'OpenFront 录像：查找对局、播放与时间轴跳转',
    'guides/replay-review': 'OpenFront 录像复盘：从上一局找到改进方法',
  },
};
