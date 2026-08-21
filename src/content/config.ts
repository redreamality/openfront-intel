import { defineCollection, z } from 'astro:content';

const docSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  difficulty: z.string().optional(),
  version: z.string().optional(),
  releaseStatus: z.enum(['released', 'not-released']).default('released'),
  freshnessSummary: z.string().optional(),
  draft: z.boolean().optional(),
});

const guides = defineCollection({ type: 'content', schema: docSchema });
const strategies = defineCollection({ type: 'content', schema: docSchema });
const changelog = defineCollection({
  type: 'content',
  schema: docSchema.extend({
    version: z.string(),
  }),
});

const whatsNewLocaleSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
});

const whatsNewSourceSchema = z.object({
  type: z.enum(['pull', 'issue', 'release', 'commit']),
  number: z.number().int().positive().optional(),
  label: z.string().optional(),
  url: z.string().url(),
});

const whatsNew = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    status: z.enum(['released', 'merged', 'in-development', 'watching']),
    impact: z.enum(['gameplay', 'quality-of-life', 'accessibility', 'strategy', 'economy']),
    firstSeenAt: z.coerce.date(),
    verifiedAt: z.coerce.date(),
    reviewBy: z.coerce.date().optional(),
    releaseTag: z.string().optional(),
    releaseUrl: z.string().url().optional(),
    relatedPath: z.string().regex(/^[a-z0-9][a-z0-9/-]*\/$/),
    sources: z.array(whatsNewSourceSchema).min(1),
    locales: z.object({
      en: whatsNewLocaleSchema,
      fr: whatsNewLocaleSchema,
      nl: whatsNewLocaleSchema,
      de: whatsNewLocaleSchema,
      zh: whatsNewLocaleSchema,
    }),
  }),
});

export const collections = { guides, strategies, changelog, whatsNew };
