const LOCALES: Record<string, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  de: 'de-DE',
  es: 'es-ES',
  pl: 'pl-PL',
  nl: 'nl-NL',
};

export function formatBlogDate(date: string, lang: string): string {
  return new Intl.DateTimeFormat(LOCALES[lang.slice(0, 2)] || 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`));
}
