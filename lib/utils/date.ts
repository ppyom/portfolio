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
