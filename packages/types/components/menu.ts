import type { IconName } from './icons';

export interface Menu {
  icon?: IconName;
  title: string;
  pathname: string;
}
