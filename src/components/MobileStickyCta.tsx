import { useTranslation } from 'react-i18next';

const WHATSAPP_URL =
  'https://wa.me/212680318003?text=' +
  encodeURIComponent('Hello Carzio, I would like to book a car in Agadir.');

interface MobileStickyCtaProps {
  onBook: () => void;
}

export default function MobileStickyCta({ onBook }: MobileStickyCtaProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-zinc-950/95 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-2xl backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onBook}
          className="rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-black transition hover:bg-gold-light"
        >
          {t('mobileBar.book', 'Book a car')}
        </button>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-3 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/20"
        >
          <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
          </svg>
          {t('mobileBar.whatsapp', 'WhatsApp')}
        </a>
      </div>
    </div>
  );
}
