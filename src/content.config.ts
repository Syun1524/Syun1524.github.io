import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';
import { gameKinds, linkKinds, resourceStatuses, sideContentTypes } from './lib/catalog';

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日期格式应为 YYYY-MM-DD');
const coverPath = z.string().regex(/^\/(?!\/)/, '封面应为 public 下的根路径，如 /images/example.jpg');
const entryCover = coverPath.or(z.literal('')).default('');
const resourceStatus = z.enum(['', ...resourceStatuses]).default('');
const resourceLink = z.object({
  label: z.string().min(1),
  url: z.url().refine(value => /^https?:\/\//.test(value), '链接必须使用 http 或 https'),
  kind: z.enum(linkKinds),
  note: z.string().optional(),
});

const wiki = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wiki' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(['作品', '人物', '术语', '指南']),
    series: z.string().min(1),
    tags: z.array(z.string()).default([]),
    updated: date,
    spoiler: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    name: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    order: z.number().int().nonnegative().default(999),
    parent: reference('works').optional(),
    cover: coverPath.optional(),
    platforms: z.array(z.string().min(1)).default([]),
    languages: z.array(z.string().min(1)).default([]),
    links: z.array(resourceLink).default([]),
    updated: date,
    draft: z.boolean().default(true),
  }),
});

const sideContent = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/side-content' }),
  schema: z.object({
    title: z.string().min(1),
    originalTitle: z.string().optional(),
    description: z.string().min(1),
    series: z.array(z.string().min(1)).min(1),
    type: z.enum(sideContentTypes),
    resourceStatus,
    cover: entryCover,
    authors: z.array(z.string().min(1)).default([]),
    scriptwriters: z.array(z.string().min(1)).default([]),
    released: z.string().regex(/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/, '发行日期应为 YYYY、YYYY-MM 或 YYYY-MM-DD').optional(),
    prerequisites: z.array(z.string().min(1)).default([]),
    chineseStatus: z.enum(['待核实', '官方中文', '有民间译本', '暂无已知中文']).default('待核实'),
    sources: z.array(resourceLink).default([]),
    links: z.array(resourceLink).default([]),
    tags: z.array(z.string()).default([]),
    updated: date,
    spoiler: z.boolean().default(false),
    draft: z.boolean().default(true),
  }),
});

const games = defineCollection({
  loader: file('src/content/games.json'),
  schema: z.object({
    name: z.string().min(1),
    series: reference('works'),
    kind: z.enum(gameKinds),
    resourceStatus,
    cover: entryCover,
    released: date,
    source: z.url().refine(value => /^https?:\/\//.test(value), '来源必须使用 http 或 https'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { wiki, works, sideContent, games };
