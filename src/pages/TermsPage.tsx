import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  const { t } = useTranslation();

  const sections = Array.from({ length: 14 }, (_, i) => ({
    title: t(`termsPage.section${i + 1}Title`),
    content: t(`termsPage.section${i + 1}Content`),
  }));

  return (
    <div className="pt-28 md:pt-32 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 to-black" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-medium mb-6 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('termsPage.backToHome')}
          </Link>
          <h1 className="text-white font-heading text-3xl md:text-5xl font-bold tracking-tight">
            {t('termsPage.title')}
          </h1>
          <p className="text-gold text-sm mt-2">
            {t('termsPage.lastUpdated')}
          </p>
          <p className="text-white/50 text-sm mt-4 max-w-2xl mx-auto">
            {t('termsPage.intro')}
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="glass rounded-2xl p-6 md:p-8 border border-white/5 hover:border-gold/20 transition"
            >
              <h2 className="text-white font-heading font-bold text-lg md:text-xl mb-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-sm font-bold shrink-0">
                  {section.title.split('.')[0]}
                </span>
                {section.title.split('. ').slice(1).join('. ') || section.title}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-semibold px-8 py-3 rounded-lg transition text-sm"
          >
            {t('termsPage.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
