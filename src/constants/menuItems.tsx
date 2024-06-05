import { BarChart, Home, Notebook, UserCircle } from 'lucide-react';

export const menuItems = [
  {
    label: 'My Dashboard',
    path: '/dashboard',
    Icon: Home,
  },
  {
    label: 'My profile',
    path: '/profile',
    Icon: UserCircle,
  },
  {
    label: 'Progress tracking',
    path: '/tracking',
    Icon: BarChart,
  },
  {
    label: 'Journal',
    path: '/journal',
    Icon: Notebook,
  },
] as const;
