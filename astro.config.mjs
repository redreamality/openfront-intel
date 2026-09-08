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
      changefreq: 'weekly',
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
        const isGuideRoute = /(?:^|\/)guides(?:\/|$)/.test(pathname);

        return {
          ...item,
          changefreq: isGuideRoute ? ChangeFreqEnum.DAILY : item.changefreq,
          priority: pathname === '/' ? 1.0 : 0.7,
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
