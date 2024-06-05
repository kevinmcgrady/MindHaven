import { ChevronRight } from 'lucide-react';

export const PlanUpgrade = () => {
  return (
    <div className='border rounded-lg p-8'>
      <p className='font-semibold flex items-center'>
        Let&apos;s upgrade your plan! <ChevronRight size={30} />
      </p>
    </div>
  );
};
