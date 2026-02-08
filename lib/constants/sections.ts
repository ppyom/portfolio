import {
  BookIcon,
  HistoryIcon,
  HomeIcon,
  MailIcon,
  StarIcon,
  UserIcon,
} from 'lucide-react';

export const sections = [
  { id: 'intro', name: 'Intro', link: '/#intro', icon: HomeIcon },
  { id: 'about', name: 'About', link: '/#about', icon: UserIcon },
  { id: 'skills', name: 'Skills', link: '/#skills', icon: StarIcon },
  { id: 'projects', name: 'Projects', link: '/#projects', icon: BookIcon },
  { id: 'history', name: 'History', link: '/#history', icon: HistoryIcon },
  { id: 'contact', name: 'Contact', link: '/#contact', icon: MailIcon },
];
