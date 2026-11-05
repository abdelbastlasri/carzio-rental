import type { ReactNode } from 'react';
import LangLink from './LangLink';

interface ImageCategoryCardProps {
  to: string;
  image: string;
  alt: string;
  title: string;
  description: string;
  badge?: ReactNode;
  className?: string;
}

export default function ImageCategoryCard({
  to,
  image,
  alt,
  title,
  description,
  badge,
  className = '',
}: ImageCategoryCardProps) {
  return (
    <LangLink
      to={to}
      className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${className}`}
    >
      <img
        src={image}
        alt={alt}
        width={800}
        height={500}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/10 transition duration-700 group-hover:from-zinc-950 group-hover:via-zinc-950/35"
      />
      <div className="relative z-10 flex min-h-[16rem] flex-col justify-end p-5">
        <div className="flex items-end justify-between gap-3">
          <h3 className="font-heading text-lg font-semibold leading-snug text-white drop-shadow">
            {title}
          </h3>
          {badge ? (
            <span className="inline-flex shrink-0 items-center rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
              {badge}
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-white/80">{description}</p>
      </div>
    </LangLink>
  );
}
