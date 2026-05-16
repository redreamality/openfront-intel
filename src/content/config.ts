import { defineCollection, z } from 'astro:content';

const docSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  difficulty: z.enum(['入门', '进阶', '高玩']).optional(),
  version: z.string().optional(),
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

export const collections = { guides, strategies, changelog };
