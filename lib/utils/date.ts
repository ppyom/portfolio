import dayjs from '@/lib/dayjs';

export const fullDateString = (date: dayjs.ConfigType) => {
  const day = dayjs(date);
  if (!day.isValid()) {
    return '올바르지 않은 날짜';
  }

  return day.format('YYYY-MM-DD(dd) HH:mm:ss');
};
