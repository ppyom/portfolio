import {
  FiBell,
  FiCheckSquare,
  FiChevronRight,
  FiLayers,
  FiMenu,
  FiMonitor,
  FiServer,
  FiUser,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';

export const IconTypes = [
  'test',
  'dashboard',
  'notice',
  'my',
  'skills',
  'projects',
  'menu',
  'right',
] as const;

export type IconName = (typeof IconTypes)[number];

export const IconObject: Record<IconName, IconType> = {
  test: FiCheckSquare,
  dashboard: FiMonitor,
  notice: FiBell,
  my: FiUser,
  skills: FiLayers,
  projects: FiServer,
  menu: FiMenu,
  right: FiChevronRight,
};
