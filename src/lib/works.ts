import { getCollection, type CollectionEntry } from 'astro:content';

export async function publishedWorks(): Promise<CollectionEntry<'works'>[]> {
  const works = await getCollection('works', ({ data }) => !data.draft);
  return works.sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

export function workUrl(id: string) {
  return `/works/${id.split('/').map(encodeURIComponent).join('/')}/`;
}

export async function mainWorks(): Promise<CollectionEntry<'works'>[]> {
  return (await publishedWorks()).filter(work => !work.data.parent);
}

export async function publishedGames(): Promise<CollectionEntry<'games'>[]> {
  const articles = await publishedWorks();
  const works = await mainWorks();
  const games = await getCollection('games', ({ data }) => !data.draft);
  for (const game of games) {
    if (!works.some(work => work.id === game.data.series.id)) {
      throw new Error(`游戏 ${game.id} 的所属作品必须是已公开的主作品`);
    }
    if (!articles.some(article => article.id === game.id)) {
      throw new Error(`游戏 ${game.id} 必须有同 ID 的已公开作品页面`);
    }
  }
  return games.sort((a, b) => a.data.released.localeCompare(b.data.released) || a.data.name.localeCompare(b.data.name));
}
