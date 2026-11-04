export const ALL_LANGS = ['en', 'fr', 'de', 'es', 'pl'] as const;
export type Lang = (typeof ALL_LANGS)[number];

const LANG_RE = /^\/(en|fr|de|es|pl)(?=\/|$)/;

export function detectLangFromPath(pathname: string): Lang | null {
  const match = pathname.match(LANG_RE);
  return match ? (match[1] as Lang) : null;
}

export function stripLangPrefix(pathname: string): string {
  const stripped = pathname.replace(LANG_RE, '') || '/';
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

export function withLangPrefix(pathname: string, lang: Lang): string {
  const base = stripLangPrefix(pathname);
  if (base === '/') return `/${lang}`;
  return `/${lang}${base}`;
}

export function xDefaultPath(pathname: string): string {
  return stripLangPrefix(pathname);
}
