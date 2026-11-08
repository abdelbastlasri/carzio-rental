import LangLink from './LangLink';
import { useTranslation } from 'react-i18next';
import type { BlogPost } from '../content/blog/types';
import { getCategoryCopy } from '../content/blog/categories';
import { formatBlogDate } from '../content/blog/format';

interface BlogCardProps {
  post: BlogPost;
  contentLang: 'fr' | 'en';
}

export default function BlogCard({ post, contentLang }: BlogCardProps) {
  const { t } = useTranslation();
  const category = getCategoryCopy(post.category, contentLang);

  return (
    <LangLink
      to={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 transition hover:border-gold/40 focus-visible:border-gold"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900">
        <img
          src={post.image}
          alt={post.imageAlt}
          width={1600}
          height={900}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/10 to-zinc-950/45" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/65 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur-[2px]">
          {category.name}
        </span>
        <time dateTime={post.date} className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/65 px-3 py-1 text-[11px] text-white/80 backdrop-blur-[2px]">
          {formatBlogDate(post.date, post.lang)}
        </time>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-heading text-lg font-semibold leading-snug text-white transition group-hover:text-gold">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{post.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs text-white/50">
            {t('blog.minRead', { count: post.readingTime })}
          </span>
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
