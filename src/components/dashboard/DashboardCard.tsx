import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

type Gradient = 'red-yellow' | 'teal-lime' | 'pink-orange' | 'green-blue';

type DashboardCardProps = {
  gradient: Gradient;
  description: string;
  cta?: {
    text: string;
    url: string;
  };
};

const gradientMap: Record<Gradient, string> = {
  'red-yellow': 'bg-gradient-to-r from-red-200 via-red-300 to-yellow-200',
  'pink-orange': 'bg-gradient-to-br from-pink-500 to-orange-400',
  'teal-lime': 'bg-gradient-to-r from-teal-200 to-lime-200',
  'green-blue': 'bg-gradient-to-br from-green-400 to-blue-600',
};

const DashboardCard = ({ gradient, description, cta }: DashboardCardProps) => {
  return (
    <div
      className={cn('h-auto max-w-full rounded-lg p-8', gradientMap[gradient])}
    >
      <p className='mb-4'>{description}</p>

      {cta && (
        <Link href={cta.url}>
          <Button>{cta.text}</Button>
        </Link>
      )}
    </div>
  );
};

export default DashboardCard;
