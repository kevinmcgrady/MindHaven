import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import { AudioPlayer } from '@/components/AudioPlayer';
import CardSection from '@/components/layout/CardSection';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { urls } from '@/constants/urls';

export default function Home() {
  return (
    <Fragment>
      <section className='mt-8 mb-12'>
        <h1 className='text-4xl md:text-5xl font-black text-center md:leading-normal'>
          Keep Track of{' '}
          <span className='text-[#F77334]'>Your Mental Health</span> <br />
          with MindHaven
        </h1>
        <p className='mt-8 text-light text-muted-foreground text-center max-w-2xl mx-auto'>
          Our goal is to empower our users to take charge of their mental
          well-being, foster meaningful connections, and promote a culture of
          understanding and compassion. Together, we strive to build a haven of
          hope and healing for everyone navigating their mental health journey.
        </p>
        <div className='mt-8 mx-auto text-center'>
          <Link
            className={buttonVariants({ size: 'lg' })}
            href={urls.auth.signIn}
          >
            Get Started
          </Link>
        </div>
        <div className='mt-8'>
          <CardSection className='w-fit mx-auto shadow' noSpacing>
            <Image
              src='/images/dashboard.png'
              alt='User dashboard'
              width={900}
              height={350}
            />
          </CardSection>
        </div>
      </section>
      <CardSection>
        <div className='gap-8 flex justify-center mt-20'>
          <div>
            <h2 className='font-bold text-3xl'>
              <span className='text-[#F77334]'>Track</span> your mental health
            </h2>
            <p className='text-muted-foreground mt-2'>
              Track your moods based on your daily journals
            </p>
            <ul className='space-y-2 mt-4'>
              <li className='flex items-center gap-2'>
                <BadgeCheck className='text-green-600' size={20} />
                <strong>Track</strong> your overall mood
              </li>
              <li className='flex items-center gap-2'>
                <BadgeCheck className='text-green-600' size={20} />
                Check in with <strong>friends</strong> when they are feeling
                down
              </li>
              <li className='flex items-center gap-2'>
                <BadgeCheck className='text-green-600' size={20} />
                <strong>View</strong> your montly mood
              </li>
            </ul>
          </div>

          <div className='flex gap-4'>
            <CardSection
              noSpacing
              className='w-[400px] h-[200px] shadow -mt-10 -mr-20'
            >
              k
            </CardSection>
            <CardSection noSpacing className='w-[400px] h-[200px] shadow'>
              j
            </CardSection>
          </div>
        </div>

        <div className='mt-32 gap-8 flex justify-center mb-12'>
          <div className='flex gap-4'>
            <CardSection
              noSpacing
              className='w-[400px] h-[200px] shadow -mt-10 -mr-20'
            >
              k
            </CardSection>
            <CardSection noSpacing className='w-[400px] h-[200px] shadow'>
              j
            </CardSection>
          </div>
          <div>
            <h2 className='font-bold text-3xl'>
              <span className='text-[#F77334]'>Write</span> daily journals
            </h2>
            <p className='text-muted-foreground mt-2'>
              Write daily journals and keep track of your overall mood for the
              day
            </p>

            <ul className='space-y-2 mt-4'>
              <li className='flex items-center gap-2'>
                <BadgeCheck className='text-green-600' size={20} />{' '}
                <strong>6</strong> moods to choose from
              </li>
              <li className='flex items-center gap-2'>
                <BadgeCheck className='text-green-600' size={20} /> Unique
                voices to <strong>personalise</strong> your entry
              </li>
              <li className='flex items-center gap-2'>
                <BadgeCheck className='text-green-600' size={20} />{' '}
                <strong>Listen</strong> to old journals entries anytime
              </li>
            </ul>
          </div>
        </div>
      </CardSection>

      <section className='my-12'>
        <h2 className='font-bold text-3xl text-center'>
          Ready to <span className='text-[#F77334]'>start tracking?</span>
        </h2>
        <p className='text-center text-muted-foreground mt-4'>
          Choose the plan that best suits you
        </p>
        <div className='flex gap-8 justify-center mt-12'>
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
            Start Tracking
          </Link>
        </div>
      </section>
    </Fragment>
  );
}
