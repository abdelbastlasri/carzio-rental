import LangLink from '../components/LangLink';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { getFaqCategories } from '../data/faq';

export default function FaqHub() {
  const { t, i18n } = useTranslation();
  const categories = getFaqCategories(i18n.language);

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: 'https://www.carzio.ma/' },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://www.carzio.ma/faq' },
    ],
  };

  return (
    <>
      <Seo
        title={t('faq.metaTitle')}
        description={t('faq.metaDescription')}
        canonical="https://www.carzio.ma/faq"
        jsonLd={[breadcrumbs]}
      />
      <div className="pt-28 md:pt-32">
        <section className="relative overflow-hidden py-12">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 to-black" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-gold">{t('faq.eyebrow')}</p>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white md:text-5xl">
              {t('faq.heading')}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/60">
              {t('faq.intro')}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16">
          <div className="grid gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <LangLink
                key={category.slug}
                to={`/faq/${category.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-zinc-950/60 p-6 transition hover:border-gold/40"
              >
                <h2 className="font-heading text-lg font-semibold text-white">{category.title}</h2>
                <p className="mt-2 flex-1 text-sm text-white/50">{category.short}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-gold">
                  {t('faq.seeAnswers')}
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-5-5l5 5-5 5" />
                  </svg>
                </span>
              </LangLink>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-950/60 p-6">
            <h2 className="font-heading text-lg font-semibold text-white">{t('blog.guidesTitle')}</h2>
            <p className="mt-2 text-sm text-white/60">
              {t('blog.guidesIntro')}
            </p>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                { to: '/blog/reserver-voiture-agadir-guide', label: t('faq.guideBooking') },
                { to: '/blog/assurance-location-voiture-maroc', label: t('faq.guideInsurance') },
                { to: '/blog/age-permis-conducteurs-location-maroc', label: t('faq.guideAge') },
              ].map((guide) => (
                <li key={guide.to}>
                  <LangLink
                    to={guide.to}
                    className="flex h-full items-center rounded-lg border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:border-gold hover:text-white"
                  >
                    {guide.label}
                  </LangLink>
                </li>
              ))}
            </ul>
            <LangLink to="/blog" className="mt-4 inline-block text-sm text-gold underline underline-offset-4">
              {t('faq.allGuides')}
            </LangLink>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-950/60 p-6 text-center">
            <p className="text-white">{t('faq.notFoundQuestion')}</p>
            <p className="mt-1 text-sm text-white/50">{t('faq.whatsappLine')}</p>
            <a
              href="https://wa.me/212680318003"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-gold-light"
            >
              {t('faq.whatsappCta')}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
