import type { ReactNode } from 'react';
import BlogBreadcrumbs, { type BlogCrumb } from './BlogBreadcrumbs';

interface JournalCategoryHeroProps {
  image: string;
  imageAlt: string;
  language: string;
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: BlogCrumb[];
  meta?: ReactNode;
}

export default function JournalCategoryHero({
  image,
  imageAlt,
  language,
  eyebrow,
  title,
  description,
  breadcrumbs,
  meta,
}: JournalCategoryHeroProps) {
  return (
    <section className="relative z-0 min-h-[26rem] overflow-hidden sm:min-h-[30rem] md:min-h-[34rem]">
      <img
        src={image}
        alt={imageAlt}
        width={1600}
        height={1066}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/55 to-zinc-950/5" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/15 to-transparent" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-8 pt-28 md:pb-12 md:pt-24">
        <BlogBreadcrumbs items={breadcrumbs} />
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.4em] text-gold">{eyebrow}</p>
        <h1
          lang={language}
          className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl"
        >
          {title}
        </h1>
        <p lang={language} className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          {description}
        </p>
        {meta ? <div className="mt-4">{meta}</div> : null}
      </div>
    </section>
  );
}
