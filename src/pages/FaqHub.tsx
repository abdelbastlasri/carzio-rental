import LangLink from '../components/LangLink';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import ImageCategoryCard from '../components/ImageCategoryCard';
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
        <section className="relative min-h-[28rem] overflow-hidden md:min-h-[32rem]">
          <img
            src="/images/journal/carzio-car-4.jpg"
            alt={t('faq.heroAlt')}
            width={1600}
            height={1200}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/65 to-zinc-950/5" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/15 to-transparent" />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-10 md:pb-14">
            <p className="text-xs uppercase tracking-[0.4em] text-gold">{t('faq.eyebrow')}</p>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white md:text-5xl">
              {t('faq.heading')}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/65">
              {t('faq.intro')}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16">
          <div className="grid gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <ImageCategoryCard
                key={category.slug}
                to={`/faq/${category.slug}`}
                image={category.image ?? '/images/journal/car-keys.jpg'}
                alt={category.imageAlt ?? category.title}
                title={category.title}
                description={category.short}
                badge={category.entries.length}
                className="h-full"
              />
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
