// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
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
      serialize: (item) => ({
        ...item,
        priority: new URL(item.url).pathname === '/' ? 1.0 : 0.7,
      }),
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
