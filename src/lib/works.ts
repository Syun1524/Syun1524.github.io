import { getCollection, type CollectionEntry } from 'astro:content';

export async function publishedWorks(): Promise<CollectionEntry<'works'>[]> {
  const works = await getCollection('works', ({ data }) => !data.draft);
  return works.sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

export function workUrl(id: string) {
  return `/works/${id.split('/').map(encodeURIComponent).join('/')}/`;
}
