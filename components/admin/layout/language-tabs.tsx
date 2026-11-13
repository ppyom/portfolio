import Link from 'next/link';

import { cn } from '@/lib/utils';
import { type Locale, routing } from '@/i18n/routing';

interface Props extends React.HTMLAttributes<HTMLElement> {
  basePath: string;
  current: Locale;
}

const languageNames = new Intl.DisplayNames(['ko'], { type: 'language' });

// 기본 언어는 쿼리 없이 basePath 그대로 써서 기존 관리자 URL을 유지한다
const createHref = (basePath: string, locale: Locale) =>
  locale === routing.defaultLocale ? basePath : `${basePath}?lang=${locale}`;

export function LanguageTabs({
  basePath,
  current,
  className,
  ...props
}: Props) {
  return (
    <nav
      aria-label="편집 언어"
      className={cn('flex gap-1 border-b border-border', className)}
      {...props}
    >
      {routing.locales.map((locale) => {
        const active = locale === current;

        return (
          <Link
            key={locale}
            href={createHref(basePath, locale)}
            aria-current={active ? 'page' : undefined}
            className={cn(
              '-mb-px border-b-2 border-transparent px-4 py-2 text-sm text-text-secondary transition-colors',
              'hover:text-text-primary',
              active && 'border-brand-primary font-medium text-text-primary',
            )}
          >
            {languageNames.of(locale) ?? locale}
          </Link>
        );
      })}
    </nav>
  );
}
