import { getCollection, type CollectionEntry } from 'astro:content';

export const sideContentTypes = ['广播剧', '小说', '漫画', '动画', '舞台剧', '公式书'] as const;
export const gameKinds = ['主游戏', '其他'] as const;
export const resourceStatuses = ['有汉化', '有原版', '暂无资源'] as const;
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
