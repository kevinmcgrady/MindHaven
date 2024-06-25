import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import CardSection from '@/components/layout/CardSection';
import { buttonVariants } from '@/components/ui/button';
import { urls } from '@/constants/urls';

const Hero = () => {
  return (
    <section className='mt-8 mb-12 p-4'>
      <h1 className='text-4xl md:text-5xl font-black text-center md:leading-normal'>
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
        <Link
          role='link'
          className={buttonVariants({ size: 'lg' })}
          href={urls.auth.signIn}
        >
          Get Started
        </Link>
      </div>
      <div className='mt-8'>
        <CardSection className='w-fit mx-auto shadow-2xl' noSpacing>
          <Image
            role='img'
            src='/images/dashboard.png'
            alt='User dashboard'
            width={900}
            height={350}
          />
        </CardSection>
      </div>
    </section>
  );
};

export default Hero;
