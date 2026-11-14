import dayjs from '@/lib/dayjs';

/**
 * YYYY-MM-DD(dd) HH:mm:ss 형식으로 날짜 형식을 표현하는 함수
 *
 * (e.g. `2025-12-24(수) 14:01:23`)
 * @param date
 */
export const fullDateString = (date: dayjs.ConfigType) => {
  const day = dayjs(date);
  if (!day.isValid()) {
    return '올바르지 않은 날짜';
  }

  return day.format('YYYY-MM-DD(dd) HH:mm:ss');
};

/**
 * 현재 시간을 기준으로 상대적인 시간 문자열을 반환하는 함수
 *
 * (e.g. `4시간 전`)
 * @param date
 */
export const relativeDateString = (date: dayjs.ConfigType) => {
  const day = dayjs(date);
  if (!day.isValid()) {
    return '올바르지 않은 날짜';
  }

  return day.fromNow();
};

/**
 * DB 타임스탬프 문자열을 ISO 8601(W3C Datetime) 형식으로 바꾸는 함수
 * sitemap의 lastmod처럼 표준 형식이 필요한 곳에 쓴다.
 * dayjs 기본 파서는 `+00` 같은 시간대를 무시하고 로컬 시간으로 해석하므로 Date로 파싱한다.
 * @param date DB 타임스탬프 (e.g. `2026-06-22 08:59:51.428388+00`)
 * @returns ISO 문자열 (e.g. `2026-06-22T08:59:51.428Z`), 값이 없거나 올바르지 않으면 undefined
 */
export const toIsoDateString = (date: string | null | undefined) => {
  if (!date) return undefined;

  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
};
