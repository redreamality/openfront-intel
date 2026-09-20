// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://openfront.fyi',
  base: '/',
  trailingSlash: 'always',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'nl', 'de', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    tailwind({ applyBaseStyles: true }),
    mdx(),
    sitemap({
      changefreq: ChangeFreqEnum.MONTHLY,
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          fr: 'fr',
          nl: 'nl',
          de: 'de',
          zh: 'zh-CN',
        },
      },
      serialize: (item) => {
        const pathname = new URL(item.url).pathname;
        const isHomepage = /^\/(?:zh|fr|de|nl)?\/?$/.test(pathname);
        const isCollectionIndex =
          /^\/(?:zh\/|fr\/|de\/|nl\/)?(?:guides|strategies|maps|mechanics|whats-new|changelog|database)\/$/.test(
            pathname,
          );
        const isContentArticle = /\/(?:guides|strategies|maps|changelog)\/.+\/$/.test(pathname);

        return {
          ...item,
          changefreq: isHomepage || isCollectionIndex
            ? ChangeFreqEnum.DAILY
            : isContentArticle
              ? ChangeFreqEnum.MONTHLY
              : item.changefreq,
          priority: isHomepage ? 1.0 : 0.7,
        };
      },
    }),
    robotsTxt({
      policy: [{ userAgent: '*', allow: '/', crawlDelay: 10 }],
      sitemap: true,
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
