import LangLink from '../components/LangLink';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import NewsCard from '../components/NewsCard';
import ImageCategoryCard from '../components/ImageCategoryCard';
import BlogBreadcrumbs from '../components/BlogBreadcrumbs';
import RentalTrustChips from '../components/RentalTrustChips';
import BookingFacts from '../components/BookingFacts';
import { getNews, countNewsByCategory } from '../content/news/loader';
import { newsCategories } from '../content/news/categories';
import { formatBlogDate } from '../content/blog/format';

export default function NewsHub() {
  const { t, i18n } = useTranslation();
  const contentLang = i18n.language.startsWith('fr') ? 'fr' : 'en';
  const posts = getNews(contentLang);
  const counts = countNewsByCategory(contentLang);
  const featured = posts.find((post) => post.featured) || posts[0];
  const rest = posts.filter((post) => post.slug !== featured?.slug);
  const showLanguageNotice = !['fr', 'en'].includes(i18n.language.slice(0, 2));

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('blog.breadcrumbHome'), item: 'https://www.carzio.ma/' },
      { '@type': 'ListItem', position: 2, name: t('news.breadcrumbNews'), item: 'https://www.carzio.ma/news' },
    ],
  };

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('news.heading'),
    description: t('news.metaDescription'),
    url: 'https://www.carzio.ma/news',
    inLanguage: contentLang,
    isPartOf: { '@type': 'WebSite', name: 'Carzio', url: 'https://www.carzio.ma/' },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        url: `https://www.carzio.ma/news/${post.slug}`,
      })),
    },
  };

  return (
    <>
      <Seo alternateLangs={['en','fr']}
        title={t('news.metaTitle')}
        description={t('news.metaDescription')}
        canonical="https://www.carzio.ma/news"
        jsonLd={[breadcrumbs, collectionLd]}
      />
      <div className="pt-28 md:pt-32">
        <section className="relative min-h-[30rem] overflow-hidden md:min-h-[34rem]">
          <img
            src="/images/journal/agadir-corniche.jpg"
            alt={t('news.heroAlt')}
            width={1600}
            height={777}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/60 to-zinc-950/5" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/15 to-transparent" />
          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10 pt-8 md:pb-14">
            <BlogBreadcrumbs
              items={[
                { label: t('blog.breadcrumbHome'), to: '/' },
                { label: t('news.breadcrumbNews') },
              ]}
            />
            <p className="mt-5 text-xs uppercase tracking-[0.4em] text-gold">{t('news.label')}</p>
            <h1 className="mt-4 max-w-3xl font-heading text-3xl font-bold tracking-tight text-white md:text-5xl">
              {t('news.heading')}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">{t('news.intro')}</p>
            <p className="mt-3 text-xs text-white/50">{t('news.cadence')}</p>
            <RentalTrustChips className="mt-5" />
            <div className="mt-6 flex flex-wrap gap-3">
              <LangLink
                to="/cars"
                className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gold-light"
              >
                {t('blog.heroCta')}
              </LangLink>
              <a
                href="https://wa.me/212680318003"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-gold"
              >
                {t('blog.heroWhatsapp')}
              </a>
            </div>
            {showLanguageNotice && (
              <p className="mt-4 inline-flex rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/50">
                {t('news.languageNotice')}
              </p>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-10" aria-labelledby="news-topics">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="news-topics" className="font-heading text-xl font-semibold text-white">
                {t('news.categories')}
              </h2>
              <p className="mt-1 text-sm text-white/50">{t('news.categoriesIntro')}</p>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-white/40">
              {newsCategories.length} {t('news.topics')}
            </span>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newsCategories.map((category) => {
              const count = counts[category.slug] || 0;
              const copy = category[contentLang];
              return (
                <li key={category.slug}>
                  <ImageCategoryCard
                    to={`/news/categorie/${category.slug}`}
                    image={category.image}
                    alt={category.imageAlt[contentLang]}
                    title={copy.name}
                    description={copy.description}
                    badge={count}
                  />
                </li>
              );
            })}
          </ul>
        </section>

        <BookingFacts />

        {featured && (
          <section className="mx-auto max-w-6xl px-4 pb-10">
            <LangLink
              to={`/news/${featured.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 transition hover:border-gold/40 md:grid-cols-2"
            >
              <div className="aspect-[16/10] overflow-hidden bg-zinc-900 md:aspect-auto">
                <img
                  src={featured.image}
                  alt={featured.imageAlt}
                  width={800}
                  height={500}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
                  <span className="uppercase tracking-[0.3em] text-gold">{t('news.latest')}</span>
                  <span>{t('blog.minRead', { count: featured.readingTime })}</span>
                  <time dateTime={featured.date}>{formatBlogDate(featured.date, featured.lang)}</time>
                </div>
                <h2 className="mt-4 font-heading text-2xl font-bold leading-tight text-white transition group-hover:text-gold md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{featured.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold">
                  {t('blog.readMore')}
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-5-5l5 5-5 5" />
                  </svg>
                </span>
              </div>
            </LangLink>
          </section>
        )}

        <section className="mx-auto max-w-6xl px-4 pb-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-heading text-xl font-semibold text-white">{t('news.allNews')}</h2>
            <span className="text-sm text-white/50">
              {t('news.articlesCount', { count: posts.length })}
            </span>
          </div>
          {posts.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6 text-sm text-white/60">
              {t('news.empty')}
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {(rest.length > 0 ? rest : posts).map((post) => (
                <NewsCard key={`${post.lang}-${post.slug}`} post={post} contentLang={contentLang} />
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl border border-gold/25 bg-gold/5 p-6 md:p-8">
            <h2 className="font-heading text-xl font-semibold text-white">{t('blog.ctaTitle')}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">{t('blog.ctaText')}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <LangLink
                to="/cars"
                className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gold-light"
              >
                {t('blog.ctaButton')}
              </LangLink>
              <a
                href="https://wa.me/212680318003"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-gold"
              >
                {t('blog.whatsapp')}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
