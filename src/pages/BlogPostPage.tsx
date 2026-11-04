import { useParams } from 'react-router-dom';
import LangLink from '../components/LangLink';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import Markdown from '../components/Markdown';
import BlogCard from '../components/BlogCard';
import BlogBreadcrumbs from '../components/BlogBreadcrumbs';
import RentalTrustChips from '../components/RentalTrustChips';
import { findPost, getRelatedPosts } from '../content/blog/loader';
import { formatBlogDate } from '../content/blog/format';
import { getCategoryCopy } from '../content/blog/categories';

export default function BlogPostPage() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const contentLang = i18n.language.startsWith('fr') ? 'fr' : 'en';
  const post = findPost(slug || '', contentLang);

  if (!post) {
    return (
      <>
        <Seo alternateLangs={['en','fr']}
          title={t('blog.notFound')}
          description={t('blog.notFoundText')}
          robots="noindex, follow"
        />
        <div className="pt-32 text-center text-white">
          <h1 className="font-heading text-2xl font-semibold">{t('blog.notFound')}</h1>
          <p className="mt-2 text-sm text-white/50">{t('blog.notFoundText')}</p>
          <LangLink to="/blog" className="mt-4 inline-block text-gold underline">
            {t('blog.backToBlog')}
          </LangLink>
        </div>
      </>
    );
  }

  const category = getCategoryCopy(post.category, contentLang);
  const canonical = `https://www.carzio.ma/blog/${post.slug}`;
  const imageUrl = `https://www.carzio.ma${post.image}`;
  const related = getRelatedPosts(post, contentLang);
  const showLanguageNotice = !['fr', 'en'].includes(i18n.language.slice(0, 2));

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
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
      { '@type': 'ListItem', position: 2, name: t('blog.breadcrumbBlog'), item: 'https://www.carzio.ma/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `https://www.carzio.ma/blog/categorie/${post.category}`,
      },
      { '@type': 'ListItem', position: 4, name: post.title, item: canonical },
    ],
  };

  return (
    <>
      <Seo alternateLangs={['en','fr']}
        title={`${post.title} | Carzio`}
        description={post.description}
        canonical={canonical}
        jsonLd={[articleLd, breadcrumbs]}
        image={imageUrl}
        type="article"
      />
      <div className="pt-28 md:pt-32">
        <section className="relative overflow-hidden py-12">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 to-black" />
          <div className="relative z-10 mx-auto max-w-3xl px-4">
            <BlogBreadcrumbs
              items={[
                { label: t('blog.breadcrumbHome'), to: '/' },
                { label: t('blog.breadcrumbBlog'), to: '/blog' },
                { label: category.name, to: `/blog/categorie/${post.category}` },
                { label: post.title },
              ]}
            />
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/55">
              <LangLink
                to={`/blog/categorie/${post.category}`}
                className="rounded-full border border-gold/30 px-2.5 py-1 text-gold transition hover:bg-gold/10"
              >
                {category.name}
              </LangLink>
              <span>{t('blog.minRead', { count: post.readingTime })}</span>
              <span>·</span>
              <span>{t('blog.publishedOn', { date: formatBlogDate(post.date, post.lang) })}</span>
            </div>
            <h1
              lang={post.lang}
              className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl"
            >
              {post.title}
            </h1>
            <p lang={post.lang} className="mt-4 text-base leading-relaxed text-white/60">
              {post.description}
            </p>
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
                {t('blog.languageNotice')}
              </p>
            )}
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60">
            <img
              src={post.image}
              alt={post.imageAlt}
              width={1200}
              height={675}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </div>

        <article lang={post.lang} className="mx-auto max-w-3xl px-4 py-10">
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
                <BlogCard key={`${entry.lang}-${entry.slug}`} post={entry} contentLang={contentLang} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
