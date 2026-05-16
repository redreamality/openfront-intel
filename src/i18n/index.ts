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
