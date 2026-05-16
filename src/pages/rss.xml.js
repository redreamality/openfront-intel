import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const [strategies, guides, changelog] = await Promise.all([
    getCollection('strategies', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('changelog', ({ data }) => !data.draft),
  ]);

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const all = [
    ...strategies.map((p) => ({ ...p, type: 'strategies' })),
    ...guides.map((p) => ({ ...p, type: 'guides' })),
    ...changelog.map((p) => ({ ...p, type: 'changelog' })),
  ].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'OpenFront 情报站',
    description: 'OpenFront.io 中文机制、数据库与攻略更新。',
    site: context.site,
    items: all.map((p) => ({
      title: p.data.title,
      pubDate: p.data.pubDate,
      description: p.data.description,
      link: `${base}/${p.type}/${p.slug}/`,
      categories: p.data.tags ?? [],
    })),
    customData: '<language>zh-CN</language>',
  });
}
