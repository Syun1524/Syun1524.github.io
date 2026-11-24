import { getCollection, type CollectionEntry } from 'astro:content';

export const sideContentTypes = ['广播剧', '小说', '短篇', '漫画', '动画', '舞台剧', '设定集', '访谈', '资料书', '原声带', '歌曲', '广播节目', '其他'] as const;
export const linkKinds = ['官方信息', '购买', '补丁', '攻略', '授权阅读/收听', '译者发布', '其他'] as const;

export async function publishedSideContent(): Promise<CollectionEntry<'sideContent'>[]> {
  const entries = await getCollection('sideContent', ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.updated.localeCompare(a.data.updated) || a.data.title.localeCompare(b.data.title, 'zh-CN'));
}

export function sideContentUrl(id: string) {
  return `/side-content/${id.split('/').map(encodeURIComponent).join('/')}/`;
}

export function sideContentSeriesUrl(name: string) {
  return `/side-content/?series=${encodeURIComponent(name)}`;
}
