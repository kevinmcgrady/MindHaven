import { ChevronRight } from 'lucide-react';

export const PlanUpgrade = () => {
  return (
    <div className='border rounded-lg p-8 mt-8 bg-white'>
      <p className='font-semibold flex items-center justify-between'>
        Let&apos;s upgrade your plan! <ChevronRight size={20} />
      </p>
    </div>
  );
};
