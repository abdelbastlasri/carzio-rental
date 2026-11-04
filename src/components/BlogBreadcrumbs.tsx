import LangLink from './LangLink';
import { useTranslation } from 'react-i18next';

export interface BlogCrumb {
  label: string;
  to?: string;
}

export default function BlogBreadcrumbs({ items }: { items: BlogCrumb[] }) {
  const { t } = useTranslation();

  return (
    <nav aria-label={t('blog.breadcrumbLabel')} className="text-xs text-white/60">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-white/55">
                /
              </span>
            )}
            {item.to ? (
              <LangLink to={item.to} className="rounded transition hover:text-white focus-visible:text-white">
                {item.label}
              </LangLink>
            ) : (
              <span aria-current="page" className="text-white/80">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
