import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import LangLink from '../components/LangLink';
import { getComparePage, marketingLanguages } from '../content/marketing';
import { withLangPrefix, type Lang } from '../lib/i18nRouting';

export default function ComparePage() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language.slice(0, 2) || 'en') as Lang;
  const page = getComparePage(i18n.language);
  const path = withLangPrefix('/compare', lang);
  const canonical = `https://www.carzio.ma${path}`;
  const alternates = Object.fromEntries(
    marketingLanguages().map((alt) => [alt, withLangPrefix('/compare', alt)]),
  );

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
      description: page.description,
      url: canonical,
      inLanguage: lang,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('nav.home'), item: `https://www.carzio.ma${withLangPrefix('/', lang)}` },
        { '@type': 'ListItem', position: 2, name: page.h1, item: canonical },
      ],
    },
  ];

  return (
    <>
      <Seo
        title={page.title}
        description={page.description}
        canonical={canonical}
        alternateLangs={marketingLanguages()}
        alternatePaths={alternates}
        jsonLd={jsonLd}
      />
      <div className="pt-28 md:pt-32">
        <section className="mx-auto max-w-5xl px-4 pb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Carzio vs platforms</p>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white md:text-5xl">{page.h1}</h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/65 md:text-base">{page.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LangLink
              to="/cars"
              className="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-gold-light"
            >
              {t('common.browseFleet')}
            </LangLink>
            <LangLink
              to="/offers"
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold/60 hover:text-gold"
            >
              {t('offers.teaserCta', 'See the seasonal offers')}
            </LangLink>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16">
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-white/[0.04] text-white">
                  <th className="px-4 py-3 font-semibold">{t('compare.criterion', 'Criterion')}</th>
                  <th className="px-4 py-3 font-semibold text-gold">Carzio</th>
                  <th className="px-4 py-3 font-semibold text-white/70">{t('compare.platform', 'International platform')}</th>
                </tr>
              </thead>
              <tbody>
                {page.rows.map((row) => (
                  <tr key={row.label} className="border-t border-white/10 align-top">
                    <th scope="row" className="px-4 py-4 font-medium text-white/80">{row.label}</th>
                    <td className="px-4 py-4 text-white/75">{row.carzio}</td>
                    <td className="px-4 py-4 text-white/55">{row.platform}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/40">
            {t(
              'compare.disclaimer',
              'Platform conditions vary by provider and rate. Compare the total price, deposit and cancellation terms before booking.',
            )}
          </p>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-20">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">{t('faq.heading')}</h2>
          <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-950/60">
            {page.faqs.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white/90 transition hover:text-gold md:text-base">
                  <span>{faq.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition-transform duration-200 group-open:rotate-45">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm leading-relaxed text-white/60">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
