import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { reviews } from '../data/reviews';

const INTERVAL = 7000;
const GOOGLE_REVIEW_URL = 'https://g.page/r/Ceh5utSp0ckqEBM/review';
const GOOGLE_LISTING_URL =
  'https://www.google.com/maps/place/CARZIO+Car+Rental+Agadir+Airport/@30.3316319,-9.4113071,18.5z/data=!4m16!1m9!3m8!1s0xafb78533426f6bf3:0x2ac9d1a9d4ba79e8!2sCARZIO+Car+Rental+Agadir+Airport!8m2!3d30.3315284!4d-9.4104744!9m1!1b1!16s%2Fg%2F11zbkvdfgj!3m5!1s0xafb78533426f6bf3:0x2ac9d1a9d4ba79e8!8m2!3d30.3315284!4d-9.4104744!16s%2Fg%2F11zbkvdfgj?entry=ttu';

function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`${className} ${i < Math.round(rating) ? 'text-gold' : 'text-white/15'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function initialsOf(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || '')
    .join('');
}

export default function Reviews() {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [draft, setDraft] = useState('');
  const [draftRating, setDraftRating] = useState(5);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const copyDraft = async () => {
    setCopyError('');
    if (!draft.trim()) {
      setCopyError(t('reviews.writeEmptyError'));
      return;
    }
    try {
      await navigator.clipboard.writeText(draft.trim());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(t('reviews.copyError'));
    }
  };

  // Only 4.5-star and 5-star reviews are displayed, as requested.
  const rated = useMemo(() => reviews.filter((review) => review.rating >= 4.5), []);
  const total = rated.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  const autoplayEnabled = !paused && !reduceMotion && total > 1;

  useEffect(() => {
    if (!autoplayEnabled) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [autoplayEnabled, next]);

  const relativeFormatter = useMemo(
    () =>
      new Intl.RelativeTimeFormat(i18n.language.split('-')[0], {
        numeric: 'auto',
        style: 'long',
      }),
    [i18n.language],
  );

  const visible = Array.from({ length: Math.min(3, total) }, (_, offset) => rated[(current + offset) % total]);

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-black to-zinc-900/20" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-burgundy/10 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-gold font-semibold text-xs md:text-sm uppercase tracking-[0.28em] mb-3">
            {t('reviews.trustTitle')}
          </p>
          <h2 className="text-white font-heading text-3xl md:text-4xl font-bold tracking-tight">
            {t('reviews.trustSubtitle')}
          </h2>
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <img
              src="/images/google-maps.svg"
              alt={t('reviews.googleLogoAlt')}
              className="h-7 w-auto"
              width={24}
              height={34}
              loading="lazy"
              decoding="async"
            />
            <Stars rating={rated[0]?.rating || 5} className="h-4 w-4" />
            <span className="text-white/60 text-sm">{t('reviews.googleVerified')}</span>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocusCapture={pause}
          onBlurCapture={(event) => {
            const target = event.relatedTarget as Node | null;
            if (!target || !containerRef.current?.contains(target)) resume();
          }}
          aria-roledescription="carousel"
          aria-label={t('reviews.trustSubtitle')}
        >
          <div className="grid gap-4 md:gap-5 md:grid-cols-3">
            {visible.map((review, offset) => {
              const relativeDate = review.date
                ? relativeFormatter.format(-review.date.count, review.date.unit)
                : null;
              const meta = [review.country, relativeDate].filter(Boolean).join(' · ');

              return (
                <motion.article
                  key={review.id}
                  layout
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: offset * 0.06 }}
                  className={`glass flex flex-col rounded-2xl p-6 md:p-7 ${
                    offset === 0 ? '' : 'hidden md:flex'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <Stars rating={review.rating} className="h-4 w-4" />
                    <img
                      src="/images/google-maps.svg"
                      alt=""
                      aria-hidden="true"
                      className="h-4 w-auto opacity-80"
                      width={14}
                      height={20}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="text-white/75 text-sm leading-relaxed mb-6 flex-1">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div
                      className="w-10 h-10 shrink-0 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold text-xs ring-2 ring-gold/30"
                      aria-hidden="true"
                    >
                      {initialsOf(review.name)}
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-white font-semibold text-sm truncate">{review.name}</p>
                      {meta && <p className="text-white/50 text-xs truncate">{meta}</p>}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {total > 1 && (
            <div className="flex items-center justify-center gap-4 mt-7">
              <button
                type="button"
                onClick={prev}
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label={t('reviews.previous')}
              >
                <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex items-center gap-1.5" role="tablist" aria-label={t('reviews.trustSubtitle')}>
                {rated.map((review, i) => (
                  <button
                    key={review.id}
                    type="button"
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`${review.name}`}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === current ? 'w-5 bg-gold' : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                {t('reviews.ofReviews', { current: current + 1, total })}
              </p>

              <button
                type="button"
                onClick={next}
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label={t('reviews.next')}
              >
                <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-7">
          <a
            href={GOOGLE_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-gold/40 hover:bg-white/[0.06] hover:text-white"
          >
            <img
              src="/images/google-maps.svg"
              alt=""
              aria-hidden="true"
              className="h-5 w-auto"
              width={18}
              height={26}
              loading="lazy"
              decoding="async"
            />
            {t('reviews.googleCta')}
            <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8m9 0v9" />
            </svg>
          </a>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-zinc-950/60 p-6 text-left md:p-8">
          <h3 className="font-heading text-lg font-semibold text-white md:text-xl">
            {t('reviews.writeTitle')}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{t('reviews.writeIntro')}</p>

          <div className="mt-5">
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">
              {t('reviews.writeRatingLabel')}
            </span>
            <div className="mt-2 flex items-center gap-1.5" role="group" aria-label={t('reviews.writeRatingLabel')}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setDraftRating(star)}
                  aria-label={t('reviews.writeStarLabel', { count: star })}
                  aria-pressed={draftRating === star}
                  className="rounded p-0.5 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <svg
                    className={`h-7 w-7 ${star <= draftRating ? 'text-gold' : 'text-white/20'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <label htmlFor="review-draft" className="sr-only">
            {t('reviews.writePlaceholder')}
          </label>
          <textarea
            id="review-draft"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setCopied(false);
            }}
            rows={4}
            maxLength={1200}
            placeholder={t('reviews.writePlaceholder')}
            className="mt-4 w-full resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={copyDraft}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-gold/40 hover:bg-white/[0.08]"
            >
              <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h9a2 2 0 012 2v9a2 2 0 01-2 2h-2M5 9h9a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9a2 2 0 012-2z" />
              </svg>
              {copied ? t('reviews.copiedButton') : t('reviews.copyButton')}
            </button>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gold-light"
            >
              {t('reviews.googleButton')}
              <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8m9 0v9" />
              </svg>
            </a>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-white/45">{t('reviews.writeHint')}</p>
          {copyError && (
            <p className="mt-2 text-xs text-red-400" role="alert">
              {copyError}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
