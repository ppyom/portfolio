import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

/**
 * 현재 언어 기준 canonical URL과 언어별 hreflang 링크를 만드는 함수
 * 검색 엔진이 같은 페이지의 언어별 버전을 서로 연결해 인식하게 한다.
 * @param href 언어 접두어를 뺀 페이지 경로
 * @returns metadata의 alternates 값
 * @example
 * export async function generateMetadata() {
 *   return { alternates: await createAlternates('/about') };
 * }
 */
export const createAlternates = async (
  href: string,
): Promise<Metadata['alternates']> => {
  const locale = await getLocale();

  return {
    canonical: getPathname({ locale, href }),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((l) => [l, getPathname({ locale: l, href })]),
      ),
      'x-default': getPathname({ locale: routing.defaultLocale, href }),
    },
  };
};
