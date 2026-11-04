import LangLink from './LangLink';
import { useTranslation } from 'react-i18next';
import { getHomeFaq } from '../data/homeFaq';

export default function HomeFaq() {
  const { t, i18n } = useTranslation();
  const items = getHomeFaq(i18n.language);

  return (
    <section id="faq" aria-labelledby="home-faq-title" className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 via-black to-zinc-900/20" />
      <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-gold/5 rounded-full blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Aside */}
        <div className="lg:sticky lg:top-28 self-start">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">{t('homeFaq.eyebrow')}</p>
          <h2 id="home-faq-title" className="mt-4 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t('homeFaq.title')}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">{t('homeFaq.intro')}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {[t('blog.trustDeposit'), t('blog.trustCancellation'), t('blog.trustInsurance')].map((chip) => (
              <li key={chip} className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold">
                <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                </svg>
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <LangLink
              to="/faq"
              className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gold-light"
            >
              {t('homeFaq.seeAll')}
            </LangLink>
            <a
              href="https://wa.me/212680318003"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/70 underline underline-offset-4 transition hover:text-gold"
            >
              {t('blog.whatsapp')}
            </a>
          </div>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur">
          {items.map((item, index) => (
            <details key={index} className="group" name="home-faq-item">
              <summary className="flex min-h-[56px] w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium text-white/90 transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:px-6 md:text-base">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition-transform duration-200 group-open:rotate-45"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 md:px-6">
                <p className="max-w-prose text-sm leading-relaxed text-white/60">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
