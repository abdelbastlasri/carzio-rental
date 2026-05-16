import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import pl from './locales/pl.json';
import de from './locales/de.json';

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('carzioLang') : null;

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, fr: { translation: fr }, es: { translation: es }, pl: { translation: pl }, de: { translation: de } },
  lng: savedLang || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') localStorage.setItem('carzioLang', lng);
});

export default i18n;
