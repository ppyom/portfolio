import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { type Locale, routing } from '@/i18n/routing';

/**
 * URL의 locale을 검증해 next-intl 요청 locale로 지정하는 함수
 * 정적 렌더링에서는 레이아웃과 페이지가 따로 렌더링되므로 next-intl API를 쓰는 페이지·레이아웃·generateMetadata마다 호출해야 한다.
 * (호출하지 않으면 next-intl이 요청 헤더를 읽어 동적 렌더링으로 바뀐다)
 * @param params 라우트의 params (locale 포함)
 * @returns 지원 언어로 좁혀진 locale (지원하지 않는 값이면 기본 언어)
 * @example
 * export default async function Page({ params }: Props) {
 *   const locale = await resolveRequestLocale(params);
 * }
 */
export const resolveRequestLocale = async (
  params: Promise<{ locale: string }>,
): Promise<Locale> => {
  const { locale } = await params;
  const resolved = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  setRequestLocale(resolved);
  return resolved;
};
