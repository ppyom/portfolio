import {
  BookIcon,
  HistoryIcon,
  HomeIcon,
  MailIcon,
  StarIcon,
  UserIcon,
} from 'lucide-react';

export const sections = [
  { id: 'intro', labelKey: 'intro', link: '/#intro', icon: HomeIcon },
  { id: 'about', labelKey: 'about', link: '/#about', icon: UserIcon },
  { id: 'skills', labelKey: 'skills', link: '/#skills', icon: StarIcon },
  { id: 'projects', labelKey: 'projects', link: '/#projects', icon: BookIcon },
  { id: 'history', labelKey: 'history', link: '/#history', icon: HistoryIcon },
  { id: 'contact', labelKey: 'contact', link: '/#contact', icon: MailIcon },
] as const;
