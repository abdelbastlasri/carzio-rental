import { useParams } from 'react-router-dom';
import LangLink from '../components/LangLink';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { findFaqCategory } from '../data/faq';

export default function FaqPage() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const category = findFaqCategory(slug || '', i18n.language);

  if (!category) {
    return (
      <div className="pt-32 text-center text-white">
        <p>{t('faq.notFound')}</p>
        <LangLink to="/faq" className="mt-3 inline-block text-gold underline">
          {t('faq.backToFaq')}
        </LangLink>
      </div>
    );
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: category.entries.map((entry) => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.a,
      },
    })),
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: 'https://www.carzio.ma/' },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://www.carzio.ma/faq' },
      { '@type': 'ListItem', position: 3, name: category.title, item: `https://www.carzio.ma/faq/${category.slug}` },
    ],
  };

  return (
    <>
      <Seo
        title={`${category.title} | FAQ Carzio`}
        description={category.description}
        canonical={`https://www.carzio.ma/faq/${category.slug}`}
        jsonLd={[faqLd, breadcrumbs]}
      />
      <div className="pt-28 md:pt-32">
        <section className="relative overflow-hidden py-12">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 to-black" />
          <div className="relative z-10 mx-auto max-w-4xl px-4">
            <LangLink to="/faq" className="text-xs text-white/55 hover:text-white">
              ← {t('faq.allFaq')}
            </LangLink>
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-gold">FAQ</p>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">{category.title}</h1>
            <p className="mt-3 text-sm text-white/60">{category.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-16">
          <div className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60">
            {category.entries.map((entry) => (
              <details key={entry.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-white">
                  <span className="font-medium">{entry.q}</span>
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-white/55 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{entry.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 p-5">
            <h2 className="font-heading text-lg font-semibold text-white">{t('faq.furtherReading')}</h2>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <LangLink
                to="/blog/reserver-voiture-agadir-guide"
                className="text-gold underline underline-offset-4"
              >
                {t('faq.guideBooking')}
              </LangLink>
              <LangLink
                to="/blog/assurance-location-voiture-maroc"
                className="text-gold underline underline-offset-4"
              >
                {t('faq.guideInsurance')}
              </LangLink>
              <LangLink
                to="/blog/age-permis-conducteurs-location-maroc"
                className="text-gold underline underline-offset-4"
              >
                {t('faq.guideAge')}
              </LangLink>
              <LangLink
                to="/location-voiture-agadir"
                className="text-gold underline underline-offset-4"
              >
                {t('faq.guideAgadir')}
              </LangLink>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 p-5">
            <div>
              <p className="text-white">{t('faq.stillQuestions')}</p>
              <p className="text-sm text-white/50">{t('faq.weAnswerFast')}</p>
            </div>
            <a
              href="https://wa.me/212680318003"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-gold-light"
            >
              +212 680 318003
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
