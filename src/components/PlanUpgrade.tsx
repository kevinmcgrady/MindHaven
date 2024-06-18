import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import CardSection from '@/components/layout/CardSection';
import { urls } from '@/constants/urls';

export const PlanUpgrade = () => {
  return (
    <CardSection>
      <Link href={urls.dashboard.billing}>
        <p className='font-semibold flex items-center justify-between'>
          Let&apos;s upgrade your plan! <ChevronRight size={20} />
        </p>
      </Link>
    </CardSection>
  );
};
