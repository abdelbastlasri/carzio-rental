import LangLink from '../components/LangLink';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title={t('pages.notFoundTitle')}
        description={t('pages.notFoundDesc')}
        robots="noindex, follow"
      />
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <p className="font-heading text-6xl font-bold text-gold">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-white">{t('pages.notFound')}</h1>
        <p className="mt-2 max-w-md text-sm text-white/50">{t('pages.notFoundLead')}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <LangLink
            to="/"
            className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gold-light"
          >
            {t('common.backHome')}
          </LangLink>
          <LangLink
            to="/cars"
            className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-gold"
          >
            {t('common.viewCars')}
          </LangLink>
        </div>
      </div>
    </>
  );
}
