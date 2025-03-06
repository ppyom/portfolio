import type { Dayjs } from 'dayjs';

export const timestamp = (day: Dayjs) => {
  return day.format('YYYY-MM-DD HH:mm:ss.SSS[Z]');
};
