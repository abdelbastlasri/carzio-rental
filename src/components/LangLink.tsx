import { Link, type LinkProps, useLocation } from 'react-router-dom';
import { detectLangFromPath, withLangPrefix } from '../lib/i18nRouting';

/**
 * Drop-in <Link> that keeps the language prefix of the current URL, so an
 * /de/... visitor stays in German when navigating the site. External links
 * and non-prefixed admin/unprefixed paths pass through untouched.
 */
export default function LangLink({ to, ...props }: LinkProps) {
  const location = useLocation();
  const lang = detectLangFromPath(location.pathname);
  if (lang && typeof to === 'string' && to.startsWith('/')) {
    return <Link to={withLangPrefix(to, lang)} {...props} />;
  }
  return <Link to={to} {...props} />;
}
