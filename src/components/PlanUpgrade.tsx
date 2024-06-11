import { ChevronRight } from 'lucide-react';

import CardSection from './layout/CardSection';

export const PlanUpgrade = () => {
  return (
    <CardSection>
      <p className='font-semibold flex items-center justify-between'>
        Let&apos;s upgrade your plan! <ChevronRight size={20} />
      </p>
    </CardSection>
  );
};
