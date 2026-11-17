export type BlogLang = 'fr' | 'en' | 'de' | 'es' | 'pl' | 'nl';

export interface BlogPost {
  slug: string;
  lang: BlogLang;
  category: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  image: string;
  imageAlt: string;
  readingTime: number;
  featured: boolean;
  published: boolean;
  body: string;
}
