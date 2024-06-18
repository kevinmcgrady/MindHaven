import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import { AudioPlayer } from '@/components/AudioPlayer';
import CardSection from '@/components/layout/CardSection';
import { Button, buttonVariants } from '@/components/ui/button';
import { urls } from '@/constants/urls';

export default function Home() {
  return (
    <section className='px-4'>
      <h1 className='text-4xl md:text-5xl font-black text-center mt-8 md:leading-normal'>
        Keep Track of <span className='text-[#F77334]'>Your Mental Health</span>{' '}
        <br />
        with MindHaven
      </h1>
      <p className='mt-8 text-light text-muted-foreground text-center max-w-2xl mx-auto'>
        Our goal is to empower our users to take charge of their mental
        well-being, foster meaningful connections, and promote a culture of
        understanding and compassion. Together, we strive to build a haven of
        hope and healing for everyone navigating their mental health journey.
      </p>
      <div className='mt-8 mx-auto text-center'>
        <Link className={buttonVariants()} href={urls.auth.signIn}>
          Get Started
        </Link>
      </div>
      <div className='mt-8'>
        <CardSection className='w-fit mx-auto shadow' noSpacing>
          <Image
            src='/images/dashboard.png'
            alt='User dashboard'
            width={1080}
            height={350}
          />
        </CardSection>
      </div>

      <div className='mt-8'>
        <h2 className='font-bold text-3xl'>
          <span className='text-[#F77334]'>Track</span> your mental health
        </h2>
        <p className='text-muted-foreground mt-2'>
          Track your moods based on your daily journals
        </p>
      </div>
    </section>
  );
}
