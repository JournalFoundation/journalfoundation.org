import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('John Benac'),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const podcast = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    episode: z.number(),
    date: z.coerce.date(),
    duration: z.string(),
    audioFile: z.string(),
    description: z.string(),
    transcript: z.string().optional(),
  }),
});

const specs = defineCollection({
  type: 'content',
  schema: z.object({
    rfc: z.number(),
    title: z.string(),
    status: z.enum(['Draft', 'Stable', 'Deprecated']),
    date: z.coerce.date(),
    authors: z.array(z.string()),
    abstract: z.string(),
    tags: z.array(z.string()).optional(),
    version: z.string().default('1.0'),
  }),
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    kind: z.enum(['tutorial', 'how-to', 'explanation', 'reference']),
    spec_ref: z.array(z.string()).default([]),
    summary: z.string().optional(),
    date: z.coerce.date().default(new Date()),
    tags: z.array(z.string()).default([]),
    version: z.string().default('current'),
    weight: z.number().default(0),
  }),
});

const whitepapers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    authors: z.array(z.string()),
    pdfFile: z.string(),
    abstract: z.string(),
    version: z.string().default('1.0'),
  }),
});

export const collections = {
  blog,
  podcast,
  specs,
  docs,
  whitepapers,
};