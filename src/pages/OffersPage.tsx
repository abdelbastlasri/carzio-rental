import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import LangLink from '../components/LangLink';
import { getOffersPage, marketingLanguages } from '../content/marketing';
import { withLangPrefix, type Lang } from '../lib/i18nRouting';

const WHATSAPP_URL = 'https://wa.me/212680318003?text=Bonjour%2C%20je%20souhaite%20b%C3%A9n%C3%A9ficier%20d%27une%20offre%20saisonni%C3%A8re%20Carzio';

export default function OffersPage() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language.slice(0, 2) || 'en') as Lang;
  const page = getOffersPage(i18n.language);
  const path = withLangPrefix('/offers', lang);
  const canonical = `https://www.carzio.ma${path}`;
  const alternates = Object.fromEntries(
    marketingLanguages().map((alt) => [alt, withLangPrefix('/offers', alt)]),
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
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Carzio Offers</p>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white md:text-5xl">{page.h1}</h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/65 md:text-base">{page.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-gold-light"
            >
              WhatsApp
            </a>
            <LangLink
              to="/cars"
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold/60 hover:text-gold"
            >
              {t('common.browseFleet')}
            </LangLink>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-16 md:grid-cols-3">
          {page.offers.map((offer) => (
            <article key={offer.id} className="flex flex-col rounded-2xl border border-white/10 bg-zinc-950/60 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-gold">{offer.period}</p>
              <h2 className="mt-3 font-heading text-xl font-bold text-white">{offer.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{offer.description}</p>
              <ul className="mt-5 space-y-2 text-xs text-white/50">
                {offer.conditions.map((condition) => (
                  <li key={condition} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {condition}
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-xl border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold/20"
              >
                {t('offers.requestCta', 'Request this offer')}
              </a>
            </article>
          ))}
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
