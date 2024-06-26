import { BadgeCheck } from 'lucide-react';
import Link from 'next/link';

import CardSection from '@/components/layout/CardSection';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { urls } from '@/constants/urls';

const PricingSection = () => {
  return (
    <section className='my-12'>
      <h2 className='font-bold text-4xl text-center'>
        Ready to <span className='text-[#F77334]'>start tracking?</span>
      </h2>
      <h3 role='heading' className='text-center text-muted-foreground mt-4'>
        Choose the plan that best suits you
      </h3>
      <div className='flex flex-col sm:flex-row gap-8 justify-center mt-12'>
        <CardSection noSpacing className='p-8 shadow'>
          <h4 className='font-semibold text-2xl mb-4'>Free Plan</h4>
          <Separator />
          <p className='my-4 font-semibold text-3xl'>FREE</p>
          <h4 className='text-sm text-muted-foreground font-semibold mb-4'>
            What&apos;s included in the free plan:
          </h4>
          <ul className='text-sm space-y-4'>
            <li data-testid='free-journal' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>1</strong> journal a day
            </li>
            <li data-testid='free-chars' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>2,000</strong> chars per journal
            </li>
            <li data-testid='free-voices' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>2</strong> unique voices
            </li>
            <li data-testid='free-moods' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>5</strong> moods to choose from
            </li>
            <li data-testid='free-tracking' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>Full</strong> tracking over all months
            </li>
          </ul>
        </CardSection>
        <CardSection noSpacing className='p-8 shadow'>
          <h4 className='font-semibold text-2xl mb-4'>Pro Plan</h4>
          <Separator />
          <p data-testid='pro-price' className='my-4 font-semibold text-3xl'>
            &pound;10.00
            <span className='text-sm font-light text-muted-foreground'>
              /month
            </span>
          </p>
          <h5 className='text-sm text-muted-foreground font-semibold mb-4'>
            What&apos;s included in the pro plan:
          </h5>
          <ul className='text-sm space-y-4'>
            <li data-testid='pro-journal' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>3</strong> journal a day
            </li>
            <li data-testid='pro-chars' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>10,000</strong> chars per journal
            </li>
            <li data-testid='pro-voices' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>6</strong> unique voices
            </li>
            <li data-testid='pro-moods' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>5</strong> moods to choose from
            </li>
            <li data-testid='pro-tracking' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>Full</strong> tracking over all months
            </li>
          </ul>
        </CardSection>
      </div>
      <div className='mt-12 mx-auto text-center'>
        <Link
          role='link'
          href={urls.auth.signIn}
          className={buttonVariants({ size: 'lg' })}
        >
          Start Tracking Now
        </Link>
      </div>
    </section>
  );
};

export default PricingSection;
