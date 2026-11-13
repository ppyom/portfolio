'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { CheckIcon, LanguagesIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@/components/ui/dropdown-menu';
import { getPathname, usePathname } from '@/i18n/navigation';
import { type Locale, routing } from '@/i18n/routing';

// 언어 이름은 그 언어로 표기한다 (한국어, English). 언어를 추가해도 따로 적을 필요가 없다
const getLocaleName = (locale: Locale) =>
  new Intl.DisplayNames([locale], { type: 'language' }).of(locale) ?? locale;

export function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  // 언어 접두어를 뺀 실제 경로(/projects/123)라 동적 세그먼트도 그대로 유지된다
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isPending, setIsPending] = useState(false);

  const handleChange = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    setIsPending(true);
    // 언어마다 루트 레이아웃이 달라 어차피 전체 새로고침되므로 처음부터 문서 이동을 한다.
    // 클라이언트 이동(router.replace)을 쓰면 /projects/[id]에서 방문자 모달 intercepting 라우트에 가로채진다.
    // 검색어(?q=) 같은 쿼리는 유지하고, useSearchParams는 정적 렌더링 시 Suspense가 필요해 클릭 시점에 직접 읽는다
    window.location.replace(
      getPathname({ href: pathname, locale: nextLocale }) +
        window.location.search,
    );
  };

  return (
    <DropdownMenu>
      <DropdownTrigger>
        <Button
          variant="ghost"
          size="sm"
          aria-label={t('label')}
          title={t('label')}
          disabled={isPending}
        >
          <LanguagesIcon size={14} aria-hidden="true" />
        </Button>
      </DropdownTrigger>
      <DropdownContent
        className="min-w-32"
        side="bottom"
        align={isMobile ? 'start' : 'end'}
      >
        {routing.locales.map((item) => (
          <DropdownItem
            key={item}
            className={cn(item === locale && 'font-semibold')}
            aria-current={item === locale || undefined}
            onClick={() => handleChange(item)}
          >
            <span lang={item} className="flex-1 text-left">
              {getLocaleName(item)}
            </span>
            {item === locale && <CheckIcon size={14} aria-hidden="true" />}
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownMenu>
  );
}
