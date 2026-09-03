import type { Lang } from '../i18n';

export interface SocialLink {
  key: string;
  href: string;
  footer: boolean;
  labels: Record<Lang, string>;
}

export const socialLinks: SocialLink[] = [
  {
    key: 'github',
    href: 'https://github.com/decuirgradley614-debug',
    footer: true,
    labels: {
      en: 'GitHub',
      fr: 'GitHub',
      nl: 'GitHub',
      de: 'GitHub',
      zh: 'GitHub',
    },
  },
  {
    key: 'cal',
    href: 'https://cal.com/gradley-decuir-9og5sl',
    footer: true,
    labels: {
      en: 'Schedule a conversation',
      fr: 'Planifier un échange',
      nl: 'Een gesprek plannen',
      de: 'Gespräch planen',
      zh: '预约沟通',
    },
  },
  {
    key: 'reddit',
    href: 'https://www.reddit.com/user/openfrontintel/',
    footer: true,
    labels: {
      en: 'Reddit',
      fr: 'Reddit',
      nl: 'Reddit',
      de: 'Reddit',
      zh: 'Reddit',
    },
  },
  {
    key: 'youtube',
    href: 'https://youtube.com/@openfrontintel?si=m7nESdTxZzfRhrwX',
    footer: true,
    labels: {
      en: 'YouTube',
      fr: 'YouTube',
      nl: 'YouTube',
      de: 'YouTube',
      zh: 'YouTube',
    },
  },
  {
    key: 'behance',
    href: 'https://www.behance.net/gradleydecuir',
    footer: false,
    labels: {
      en: 'Behance',
      fr: 'Behance',
      nl: 'Behance',
      de: 'Behance',
      zh: 'Behance',
    },
  },
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/%E5%BE%B7%E5%88%A9-%E6%A0%BC%E6%8B%89-04931442b/',
    footer: false,
    labels: {
      en: 'LinkedIn',
      fr: 'LinkedIn',
      nl: 'LinkedIn',
      de: 'LinkedIn',
      zh: 'LinkedIn',
    },
  },
  {
    key: 'medium',
    href: 'https://medium.com/@openfrontintel/about',
    footer: false,
    labels: {
      en: 'Medium',
      fr: 'Medium',
      nl: 'Medium',
      de: 'Medium',
      zh: 'Medium',
    },
  },
  {
    key: 'x',
    href: 'https://x.com/openfrontintel',
    footer: false,
    labels: {
      en: 'X',
      fr: 'X',
      nl: 'X',
      de: 'X',
      zh: 'X',
    },
  },
  {
    key: 'tumblr',
    href: 'https://www.tumblr.com/openfrontintel',
    footer: false,
    labels: {
      en: 'Tumblr',
      fr: 'Tumblr',
      nl: 'Tumblr',
      de: 'Tumblr',
      zh: 'Tumblr',
    },
  },
  {
    key: 'linktree',
    href: 'https://linktr.ee/openfrontintel',
    footer: false,
    labels: {
      en: 'Linktree',
      fr: 'Linktree',
      nl: 'Linktree',
      de: 'Linktree',
      zh: 'Linktree',
    },
  },
  {
    key: 'twitch',
    href: 'https://www.twitch.tv/openfrontintel/about',
    footer: false,
    labels: {
      en: 'Twitch',
      fr: 'Twitch',
      nl: 'Twitch',
      de: 'Twitch',
      zh: 'Twitch',
    },
  },
];

export const socialLinksCopy: Record<Lang, { title: string; lead: string }> = {
  en: {
    title: 'More community channels',
    lead: 'Follow the project and creator channels below for updates, writing, streams, and portfolio work.',
  },
  fr: {
    title: 'Autres canaux communautaires',
    lead: 'Retrouvez ci-dessous les canaux du projet et du créateur pour les actualités, les articles, les streams et le portfolio.',
  },
  nl: {
    title: 'Meer communitykanalen',
    lead: 'Volg de project- en makerskanalen hieronder voor nieuws, artikelen, streams en portfolio-werk.',
  },
  de: {
    title: 'Weitere Community-Kanäle',
    lead: 'Folgen Sie den Projekt- und Creator-Kanälen unten für Neuigkeiten, Texte, Streams und Portfolio-Arbeiten.',
  },
  zh: {
    title: '更多社区渠道',
    lead: '以下渠道用于发布项目动态、文章、直播和创作者作品集内容。',
  },
};
