import type { NewsLang, NewsPost } from './types';
import { newsPostMedia } from '../media';

const files = import.meta.glob(['./fr/*.md', './en/*.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error('News article is missing frontmatter.');
  }

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  return { data, body: match[2].trim() };
}

function toPost(path: string, raw: string): NewsPost {
  const { data, body } = parseFrontmatter(raw);
  const pathLang = path.includes('/en/') ? 'en' : 'fr';
  const lang = (data.lang as NewsLang) || pathLang;
  // Photography lives in one place (src/content/media.ts). The frontmatter is
  // kept as a fallback so an unpublished draft never loses its image.
  const media = newsPostMedia[data.slug];

  return {
    slug: data.slug,
    lang,
    category: data.category,
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated || undefined,
    image: media ? `/images/journal/${media.file}` : data.image,
    imageAlt: media ? media.alt[lang] || media.alt.en : data.imageAlt,
    readingTime: Number(data.readingTime) || 4,
    featured: data.featured === 'true',
    published: data.published === 'true',
    body,
  };
}

export const allNews: NewsPost[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post) => Boolean(post.slug && post.title && post.body));

export function getNews(lang: NewsLang): NewsPost[] {
  return allNews
    .filter((post) => post.published && post.lang === lang)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNewsByCategory(category: string, lang: NewsLang): NewsPost[] {
  return getNews(lang).filter((post) => post.category === category);
}

export function findNews(slug: string, lang: NewsLang): NewsPost | undefined {
  const localized = allNews.find(
    (post) => post.published && post.slug === slug && post.lang === lang,
  );
  if (localized) return localized;
  return allNews.find((post) => post.published && post.slug === slug && post.lang === 'fr');
}

export function getRelatedNews(post: NewsPost, lang: NewsLang, limit = 2): NewsPost[] {
  const posts = getNews(lang).filter((entry) => entry.slug !== post.slug);
  const sameCategory = posts.filter((entry) => entry.category === post.category);
  const others = posts.filter((entry) => entry.category !== post.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function countNewsByCategory(lang: NewsLang): Record<string, number> {
  return getNews(lang).reduce<Record<string, number>>((counts, post) => {
    counts[post.category] = (counts[post.category] || 0) + 1;
    return counts;
  }, {});
}
