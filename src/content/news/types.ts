export type NewsLang = 'fr' | 'en';

export interface NewsPost {
  slug: string;
  lang: NewsLang;
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
