import { BarChart, Home, Notebook, UserCircle, Wallet } from 'lucide-react';

import { urls } from '@/constants/urls';

export const menuItems = [
  {
    label: 'My Dashboard',
    path: urls.dashboard.root,
    Icon: Home,
  },
  {
    label: 'My profile',
    path: urls.dashboard.profile,
    Icon: UserCircle,
  },
  {
    label: 'Progress tracking',
    path: urls.dashboard.tracking,
    Icon: BarChart,
  },
  {
    label: 'Journal',
    path: urls.dashboard.journal,
    Icon: Notebook,
  },
  {
    label: 'Billing',
    path: urls.dashboard.billing,
    Icon: Wallet,
  },
] as const;
