import type { NavItem } from '@/types/nav-item';

export const headerNavItems: NavItem[] = [
  { label: 'About', href: '#about', type: 'anchor' },
  { label: 'Projects', href: '/projects', type: 'page' },
  { label: 'Contact', href: '/contact', type: 'page' },
];
