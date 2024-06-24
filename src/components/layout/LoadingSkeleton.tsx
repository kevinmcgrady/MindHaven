import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton = () => {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-[176px] rounded-xl bg-card' />
      <Skeleton className='h-[84px] rounded-xl bg-card' />
      <Skeleton className='h-[382px] rounded-xl bg-card' />
    </div>
  );
};

export default LoadingSkeleton;
