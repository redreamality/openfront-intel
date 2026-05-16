// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

const SITE = process.env.SITE_URL || 'https://USER.github.io';
const BASE = process.env.BASE_PATH ?? '/openfront-intel';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: true }),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      serialize: (item) => ({
        ...item,
        priority: new URL(item.url).pathname === BASE + '/' ? 1.0 : 0.7,
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
