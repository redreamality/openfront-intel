import { ui, defaultLang, languages, type Lang } from './ui';

export { ui, defaultLang, languages, type Lang };

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: Lang, base: string): string {
  const cleanPath = path.replace(base, '').replace(/^\/+/, '');
  if (lang === defaultLang) {
    return `${base}${cleanPath}`;
  }
  return `${base}${lang}/${cleanPath}`;
}

export function getAlternateLanguages(currentPath: string, base: string): Array<{ lang: Lang; href: string }> {
  const cleanPath = currentPath.replace(base, '').replace(/^\/+/, '');

  let pathWithoutLang = cleanPath;
  for (const lang of Object.keys(languages)) {
    if (cleanPath.startsWith(`${lang}/`)) {
      pathWithoutLang = cleanPath.slice(lang.length + 1);
      break;
    }
  }

  return (Object.keys(languages) as Lang[]).map((lang) => ({
    lang,
    href: getLocalizedPath(pathWithoutLang, lang, base),
  }));
}

export function stripLangPrefix(slug: string): string {
  return slug.replace(/^(en|fr|nl|de|zh)\//, '');
}

export function byLang(lang: Lang) {
  return (entry: { slug: string }) => entry.slug.startsWith(`${lang}/`);
}

export function getHtmlLang(lang: Lang): string {
  const htmlLangMap: Record<Lang, string> = {
    en: 'en',
    fr: 'fr',
    nl: 'nl',
    de: 'de',
    zh: 'zh-CN',
  };
  return htmlLangMap[lang];
}

export function getIntlLocale(lang: Lang): string {
  const intlMap: Record<Lang, string> = {
    en: 'en-US',
    fr: 'fr-FR',
    nl: 'nl-NL',
    de: 'de-DE',
    zh: 'zh-CN',
  };
  return intlMap[lang];
}

export interface I18nBundle {
  name?: string;
  role?: string;
  costFormula?: string;
  notes?: string[];
  label?: string;
  desc?: string;
  expr?: string;
  [key: string]: unknown;
}

export function pickI18n<T extends I18nBundle = I18nBundle>(
  entry: { i18n?: Partial<Record<Lang, T>> } | undefined,
  lang: Lang
): T {
  if (!entry?.i18n) return {} as T;
  return (entry.i18n[lang] ?? entry.i18n[defaultLang] ?? ({} as T)) as T;
}
