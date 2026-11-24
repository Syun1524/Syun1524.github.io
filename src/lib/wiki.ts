import { getCollection } from 'astro:content';

export const categories = ['作品', '人物', '术语', '指南'] as const;

export async function publishedEntries() {
  const entries = await getCollection('wiki', ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.updated.localeCompare(a.data.updated) || a.data.title.localeCompare(b.data.title, 'zh-CN'));
}

export function entryUrl(id: string) {
  return `/wiki/${id.split('/').map(encodeURIComponent).join('/')}/`;
}
