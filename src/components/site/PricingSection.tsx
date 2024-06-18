import { BadgeCheck } from 'lucide-react';
import Link from 'next/link';

import { urls } from '@/constants/urls';

import CardSection from '../layout/CardSection';
import { buttonVariants } from '../ui/button';
import { Separator } from '../ui/separator';

const PricingSection = () => {
  return (
    <section className='my-12'>
      <h2 className='font-bold text-3xl text-center'>
        Ready to <span className='text-[#F77334]'>start tracking?</span>
      </h2>
      <p className='text-center text-muted-foreground mt-4'>
        Choose the plan that best suits you
      </p>
      <div className='flex flex-col sm:flex-row gap-8 justify-center mt-12'>
        <CardSection noSpacing className='p-8 shadow'>
          <h3 className='font-semibold text-2xl mb-4'>Free Plan</h3>
          <Separator />
          <p className='my-4 font-semibold text-3xl'>FREE</p>
          <h4 className='text-sm text-muted-foreground font-semibold mb-4'>
            What&apos;s included:
          </h4>
          <ul className='text-sm space-y-4'>
            <li className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>1</strong> journal a day
            </li>
            <li className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>2,000</strong> chars per journal
            </li>
            <li className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>2</strong> unique voices
            </li>
            <li className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>5</strong> moods to choose from
            </li>
            <li className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>Full</strong> tracking over all months
            </li>
          </ul>
        </CardSection>
        <CardSection noSpacing className='p-8 shadow'>
          <h3 className='font-semibold text-2xl mb-4'>Pro Plan</h3>
          <Separator />
          <p className='my-4 font-semibold text-3xl'>
            &pound;10.00
            <span className='text-sm font-light text-muted-foreground'>
              /month
            </span>
          </p>
          <h4 className='text-sm text-muted-foreground font-semibold mb-4'>
            What&apos;s included:
          </h4>
          <ul className='text-sm space-y-4'>
            <li className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>3</strong> journal a day
            </li>
            <li className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>10,000</strong> chars per journal
            </li>
            <li className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>6</strong> unique voices
            </li>
            <li className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>5</strong> moods to choose from
            </li>
            <li className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <strong>Full</strong> tracking over all months
            </li>
          </ul>
        </CardSection>
      </div>
      <div className='mt-12 mx-auto text-center'>
        <Link
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
