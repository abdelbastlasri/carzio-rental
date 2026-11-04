import type { BlogLang, BlogPost } from './types';

const files = import.meta.glob(['./fr/*.md', './en/*.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error('Blog article is missing frontmatter.');
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

function toPost(path: string, raw: string): BlogPost {
  const { data, body } = parseFrontmatter(raw);
  const pathLang = path.includes('/en/') ? 'en' : 'fr';

  return {
    slug: data.slug,
    lang: (data.lang as BlogLang) || pathLang,
    category: data.category,
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated || undefined,
    image: data.image,
    imageAlt: data.imageAlt,
    readingTime: Number(data.readingTime) || 6,
    featured: data.featured === 'true',
    published: data.published === 'true',
    body,
  };
}

export const allPosts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post) => Boolean(post.slug && post.title && post.body));

export function getPosts(lang: BlogLang): BlogPost[] {
  return allPosts
    .filter((post) => post.published && post.lang === lang)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostsByCategory(category: string, lang: BlogLang): BlogPost[] {
  return getPosts(lang).filter((post) => post.category === category);
}

export function findPost(slug: string, lang: BlogLang): BlogPost | undefined {
  const localized = allPosts.find(
    (post) => post.published && post.slug === slug && post.lang === lang,
  );
  if (localized) return localized;
  return allPosts.find((post) => post.published && post.slug === slug && post.lang === 'fr');
}

export function getRelatedPosts(post: BlogPost, lang: BlogLang, limit = 2): BlogPost[] {
  const posts = getPosts(lang).filter((entry) => entry.slug !== post.slug);
  const sameCategory = posts.filter((entry) => entry.category === post.category);
  const others = posts.filter((entry) => entry.category !== post.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function getAvailableLanguages(slug: string): BlogLang[] {
  return (['fr', 'en'] as BlogLang[]).filter((lang) =>
    allPosts.some((post) => post.slug === slug && post.lang === lang && post.published),
  );
}
