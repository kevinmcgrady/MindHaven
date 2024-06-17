import type React from 'react';

import { cn } from '@/lib/utils';

type CardSectionProps = {
  children: React.ReactNode;
  noSpacing?: boolean;
  className?: string;
};

const CardSection = ({ children, noSpacing, className }: CardSectionProps) => {
  return (
    <div
      className={cn('md:rounded-xl p-4 bg-white', className, {
        'mt-4': !noSpacing,
      })}
    >
      {children}
    </div>
  );
};

export default CardSection;
