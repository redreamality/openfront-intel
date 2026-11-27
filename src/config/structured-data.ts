import { socialLinks } from './social-links';
import { getHtmlLang, languages, type Lang } from '../i18n';

export interface ArticleMetadata {
  title: string;
  description?: string;
  pubDate?: Date;
  updatedDate?: Date;
  tags?: string[];
  category?: string;
}

interface StructuredDataOptions {
  site: URL;
  base: string;
  canonical: string;
  lang: Lang;
  title: string;
  description: string;
  image: string;
  article?: ArticleMetadata;
}

// Project accounts identify the publisher; creator profiles and game accounts do not.
const publisherProfileKeys = new Set([
  'reddit', 'youtube', 'medium', 'x', 'tumblr', 'linktree', 'twitch',
]);
const collectionSections = new Set([
  'guides', 'strategies', 'maps', 'mechanics', 'database', 'changelog', 'whats-new',
]);

export function buildStructuredData(options: StructuredDataOptions) {
  const { site, base, canonical, lang, title, description, image, article } = options;
  const root = new URL(`${base.replace(/\/$/, '')}/`, site).toString();
  const organizationId = `${root}#organization`;
  const websiteId = `${root}#website`;
  const pageId = `${canonical}#webpage`;
  const localeRoot = new URL(lang === 'en' ? './' : `${lang}/`, root).toString();
  const path = new URL(canonical).pathname.slice(new URL(localeRoot).pathname.length);
  const segments = path.split('/').filter(Boolean);
  const pageType = segments[0] === 'about' ? 'AboutPage'
    : segments[0] === 'contact' ? 'ContactPage'
    : segments.length === 1 && collectionSections.has(segments[0]) ? 'CollectionPage'
    : 'WebPage';
  const organization = {
    '@type': 'Organization',
    '@id': organizationId,
    name: 'OpenFront Intel',
    url: root,
    sameAs: socialLinks
      .filter(({ key }) => publisherProfileKeys.has(key))
      .map(({ href }) => {
        const profile = new URL(href);
        profile.search = '';
        return profile.toString();
      }),
  };
  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: root,
    name: 'OpenFront Intel',
    publisher: { '@id': organizationId },
    inLanguage: Object.keys(languages).map((language) => getHtmlLang(language as Lang)),
  };
  const page = {
    '@type': pageType,
    '@id': pageId,
    url: canonical,
    name: title,
    description,
    inLanguage: getHtmlLang(lang),
    isPartOf: { '@id': websiteId },
    publisher: { '@id': organizationId },
    primaryImageOfPage: { '@type': 'ImageObject', url: image },
    ...(article ? { mainEntity: { '@id': `${canonical}#article` } } : {}),
  };
  const articleNode = article ? {
    '@type': 'Article',
    '@id': `${canonical}#article`,
    url: canonical,
    headline: article.title,
    description: article.description ?? description,
    inLanguage: getHtmlLang(lang),
    mainEntityOfPage: { '@id': pageId },
    isPartOf: { '@id': websiteId },
    author: { '@id': organizationId },
    publisher: { '@id': organizationId },
    image: [image],
    datePublished: article.pubDate?.toISOString(),
    dateModified: (article.updatedDate ?? article.pubDate)?.toISOString(),
    articleSection: article.category,
    keywords: article.tags?.length ? article.tags : undefined,
  } : undefined;

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website, page, ...(articleNode ? [articleNode] : [])],
  };
}

export function serializeJsonLd(value: unknown): string {
  // A literal closing script tag in content must not terminate the JSON-LD element.
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
