import { useParams } from 'react-router-dom';
import LangLink from '../components/LangLink';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import BlogCard from '../components/BlogCard';
import BlogBreadcrumbs from '../components/BlogBreadcrumbs';
import RentalTrustChips from '../components/RentalTrustChips';
import { getPostsByCategory } from '../content/blog/loader';
import { findBlogCategory } from '../content/blog/categories';

export default function BlogCategory() {
  const { t, i18n } = useTranslation();
  const { category: categorySlug } = useParams<{ category: string }>();
  const contentLang = i18n.language.startsWith('fr') ? 'fr' : 'en';
  const category = findBlogCategory(categorySlug || '');

  if (!category) {
    return (
      <div className="pt-32 text-center text-white">
        <p>{t('blog.notFound')}</p>
        <LangLink to="/blog" className="mt-3 inline-block text-gold underline">
          {t('blog.backToBlog')}
        </LangLink>
      </div>
    );
  }

  const copy = category[contentLang];
  const posts = getPostsByCategory(category.slug, contentLang);
  const canonical = `https://www.carzio.ma/blog/categorie/${category.slug}`;
  const showLanguageNotice = !['fr', 'en'].includes(i18n.language.slice(0, 2));

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('blog.breadcrumbHome'), item: 'https://www.carzio.ma/' },
      { '@type': 'ListItem', position: 2, name: t('blog.breadcrumbBlog'), item: 'https://www.carzio.ma/blog' },
      { '@type': 'ListItem', position: 3, name: copy.name, item: canonical },
    ],
  };

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${copy.name} | Blog Carzio`,
    description: copy.description,
    url: canonical,
    inLanguage: contentLang,
    isPartOf: {
      '@type': 'Blog',
      name: 'Blog Carzio',
      url: 'https://www.carzio.ma/blog',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        url: `https://www.carzio.ma/blog/${post.slug}`,
      })),
    },
  };

  return (
    <>
      <Seo alternateLangs={['en','fr']}
        title={`${copy.name} | Blog Carzio`}
        description={copy.description}
        canonical={canonical}
        jsonLd={[breadcrumbs, collectionLd]}
      />
      <div className="pt-28 md:pt-32">
        <section className="relative overflow-hidden py-12">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 to-black" />
          <div className="relative z-10 mx-auto max-w-6xl px-4">
            <BlogBreadcrumbs
              items={[
                { label: t('blog.breadcrumbHome'), to: '/' },
                { label: t('blog.breadcrumbBlog'), to: '/blog' },
                { label: copy.name },
              ]}
            />
            <p className="mt-5 text-xs uppercase tracking-[0.4em] text-gold">{t('blog.categoryLabel')}</p>
            <h1
              lang={contentLang}
              className="mt-4 font-heading text-3xl font-bold tracking-tight text-white md:text-5xl"
            >
              {copy.name}
            </h1>
            <p lang={contentLang} className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
              {copy.description}
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

        <section className="mx-auto max-w-6xl px-4 pb-16">
          {posts.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={`${post.lang}-${post.slug}`} post={post} contentLang={contentLang} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-8 text-center">
              <p className="text-white/60">{t('blog.empty')}</p>
              <LangLink to="/blog" className="mt-4 inline-block text-gold underline">
                {t('blog.allArticles')}
              </LangLink>
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
