import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import LangLink from './LangLink';
import BlogBreadcrumbs, { type BlogCrumb } from './BlogBreadcrumbs';

interface JournalArticleHeroProps {
  image: string;
  imageAlt: string;
  imagePosition?: string;
  language: string;
  breadcrumbs: BlogCrumb[];
  categoryName: string;
  categoryHref: string;
  readingTimeText: string;
  publishedText: string;
  title: string;
  description: string;
  notice?: ReactNode;
}

export default function JournalArticleHero({
  image,
  imageAlt,
  imagePosition = 'center',
  language,
  breadcrumbs,
  categoryName,
  categoryHref,
  readingTimeText,
  publishedText,
  title,
  description,
  notice,
}: JournalArticleHeroProps) {
  const { t } = useTranslation();

  return (
    // Header is fixed; the hero extends beneath it and controls its own safe area.
    <section className="relative z-0 min-h-[28rem] overflow-hidden sm:min-h-[36rem] md:min-h-[42rem]">
      <img
        src={image}
        alt={imageAlt}
        width={1600}
        height={900}
        fetchPriority="high"
        style={{ objectPosition: imagePosition }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/60 to-zinc-950/5" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/25 to-zinc-950/20" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-6 pt-28 md:pb-12 md:pt-24">
        <BlogBreadcrumbs items={breadcrumbs} />
        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-white/75">
          <LangLink
            to={categoryHref}
            className="rounded-full border border-gold/40 bg-black/45 px-3 py-1.5 font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-[2px] transition hover:bg-gold hover:text-black"
          >
            {categoryName}
          </LangLink>
          <span>{readingTimeText}</span>
          <span aria-hidden="true">·</span>
          <span>{publishedText}</span>
        </div>
        <h1
          lang={language}
          className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl"
        >
          {title}
        </h1>
        <p lang={language} className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <LangLink
            to="/cars"
            className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black shadow-lg transition hover:bg-gold-light"
          >
            {t('blog.heroCta')}
          </LangLink>
          <a
            href="https://wa.me/212680318003"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/30 bg-black/35 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-[2px] transition hover:border-gold hover:text-gold"
          >
            {t('blog.heroWhatsapp')}
          </a>
        </div>
        {notice ? <div className="mt-4">{notice}</div> : null}
      </div>
    </section>
  );
}
