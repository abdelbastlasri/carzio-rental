import { useParams } from 'react-router-dom';
import LangLink from '../components/LangLink';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import Markdown from '../components/Markdown';
import NewsCard from '../components/NewsCard';
import JournalArticleHero from '../components/JournalArticleHero';
import { findNews, getRelatedNews } from '../content/news/loader';
import { formatBlogDate } from '../content/blog/format';
import { getNewsCategoryCopy } from '../content/news/categories';

export default function NewsArticle() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const contentLang = i18n.language.startsWith('fr') ? 'fr' : 'en';
  const post = findNews(slug || '', contentLang);

  if (!post) {
    return (
      <>
        <Seo alternateLangs={['en','fr']}
          title={t('news.notFound')}
          description={t('news.notFoundText')}
          robots="noindex, follow"
        />
        <div className="pt-32 text-center text-white">
          <h1 className="font-heading text-2xl font-semibold">{t('news.notFound')}</h1>
          <p className="mt-2 text-sm text-white/50">{t('news.notFoundText')}</p>
          <LangLink to="/news" className="mt-4 inline-block text-gold underline">
            {t('news.backToNews')}
          </LangLink>
        </div>
      </>
    );
  }

  const category = getNewsCategoryCopy(post.category, contentLang);
  const canonical = `https://www.carzio.ma/news/${post.slug}`;
  const imageUrl = `https://www.carzio.ma${post.image}`;
  const related = getRelatedNews(post, contentLang);
  const showLanguageNotice = !['fr', 'en'].includes(i18n.language.slice(0, 2));

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    inLanguage: post.lang,
    articleSection: category.name,
    keywords: [
      category.name,
      'location de voiture Agadir',
      'car rental Agadir',
      'Carzio',
    ].join(', '),
    wordCount: post.body.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    author: { '@type': 'Organization', name: 'Carzio', url: 'https://www.carzio.ma/' },
    publisher: {
      '@type': 'Organization',
      name: 'Carzio',
      logo: { '@type': 'ImageObject', url: 'https://www.carzio.ma/images/carzio-logo.png' },
    },
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('blog.breadcrumbHome'), item: 'https://www.carzio.ma/' },
      { '@type': 'ListItem', position: 2, name: t('news.breadcrumbNews'), item: 'https://www.carzio.ma/news' },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `https://www.carzio.ma/news/categorie/${post.category}`,
      },
      { '@type': 'ListItem', position: 4, name: post.title, item: canonical },
    ],
  };

  return (
    <>
      <Seo alternateLangs={['en','fr']}
        title={`${post.title} | ${t('news.title')}`}
        description={post.description}
        canonical={canonical}
        jsonLd={[articleLd, breadcrumbs]}
        image={imageUrl}
        type="article"
      />
      <JournalArticleHero
        image={post.image}
        imageAlt={post.imageAlt}
        imagePosition={post.slug === 'conduire-au-maroc-essentiel' || post.slug === 'securite-routiere-maroc-essentiel' ? 'center 35%' : 'center'}
        language={post.lang}
        categoryName={category.name}
        categoryHref={`/news/categorie/${post.category}`}
        readingTimeText={t('blog.minRead', { count: post.readingTime })}
        publishedText={t('blog.publishedOn', { date: formatBlogDate(post.date, post.lang) })}
        title={post.title}
        description={post.description}
        breadcrumbs={[
          { label: t('blog.breadcrumbHome'), to: '/' },
          { label: t('news.breadcrumbNews'), to: '/news' },
          { label: category.name, to: `/news/categorie/${post.category}` },
          { label: post.title },
        ]}
        notice={
          showLanguageNotice ? (
            <p className="inline-flex rounded-lg border border-white/15 bg-black/45 px-3 py-2 text-xs text-white/70 backdrop-blur-[2px]">
              {t('news.languageNotice')}
            </p>
          ) : undefined
        }
      />

      <div className="relative">
        <article lang={post.lang} className="mx-auto max-w-3xl px-4 pb-16 pt-12 md:pt-16">
          <Markdown content={post.body} />

          {post.updated && post.updated !== post.date && (
            <p className="mt-8 text-xs text-white/55">
              {t('blog.updatedOn', { date: formatBlogDate(post.updated, post.lang) })}
            </p>
          )}

          <div className="mt-10 rounded-2xl border border-gold/25 bg-gold/5 p-6">
            <h2 className="font-heading text-xl font-semibold text-white">{t('blog.ctaTitle')}</h2>
            <p className="mt-2 text-sm text-white/60">{t('blog.ctaText')}</p>
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
        </article>

        {related.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 pb-16">
            <h2 className="mb-5 font-heading text-xl font-semibold text-white">{t('blog.related')}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {related.map((entry) => (
                <NewsCard key={`${entry.lang}-${entry.slug}`} post={entry} contentLang={contentLang} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
