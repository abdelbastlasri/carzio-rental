import LangLink from './LangLink';
import { useTranslation } from 'react-i18next';
import type { NewsPost } from '../content/news/types';
import { getNewsCategoryCopy } from '../content/news/categories';
import { formatBlogDate } from '../content/blog/format';

interface NewsCardProps {
  post: NewsPost;
  contentLang: 'fr' | 'en';
}

export default function NewsCard({ post, contentLang }: NewsCardProps) {
  const { t } = useTranslation();
  const category = getNewsCategoryCopy(post.category, contentLang);

  return (
    <LangLink
      to={`/news/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 transition hover:border-gold/40 focus-visible:border-gold"
    >
      <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
        <img
          src={post.image}
          alt={post.imageAlt}
          width={640}
          height={400}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
          <span className="rounded-full border border-gold/30 px-2.5 py-1 text-gold">
            {category.name}
          </span>
          <span>{t('blog.minRead', { count: post.readingTime })}</span>
        </div>
        <h3 className="mt-3 font-heading text-lg font-semibold leading-snug text-white transition group-hover:text-gold">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{post.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <time dateTime={post.date} className="text-xs text-white/50">
            {formatBlogDate(post.date, post.lang)}
          </time>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-gold">
            {t('blog.readMore')}
            <svg
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </span>
        </div>
      </div>
    </LangLink>
  );
}
