import { Journal } from '@prisma/client';
import { BadgeCheck } from 'lucide-react';
import React from 'react';

import JournalCard from '@/components/journal/JournalCard';
import CardSection from '@/components/layout/CardSection';

const JournalFeatureSection = () => {
  const journal: Journal = {
    audioUrl:
      'https://h1rfvvvullyacaoc.public.blob.vercel-storage.com/user_2hSZvhY0lts5eSBGESenj4yIrFX/5-2024-pLWdFKcx3ZU6fAHRB0jJta69vTeiL8',
    createdAt: new Date(),
    createdAtMonth: 'Jun',
    createdAtYear: '2024',
    entry:
      'Welcome to your new sanctuary for mental wellness! We are thrilled to have you here as part of our supportive and compassionate community. MindHaven is designed to be a safe space where you can connect with others and share your journey. At MindHaven, we believe that mental wellness is a journey best taken together.',
    id: 'id',
    mood: 'exited',
    title: 'Welcome to MindHaven',
    updatedAt: new Date(),
    userId: 'id',
    voice: 'shimmer',
  };

  return (
    <CardSection>
      <div className='mt-8 md:mt-32 gap-12 grid grid-cols-1 md:grid-cols-2 md:mb-32 mb-12'>
        <div className='justify-self-end'>
          <h2 data-testid='title' className='font-bold text-3xl mt-8'>
            <span className='text-[#F77334]'>Write</span> daily journals
          </h2>
          <p data-testid='subtitle' className='text-muted-foreground mt-2'>
            Write daily journals and keep track of your overall mood for the day
          </p>

          <ul className='space-y-2 mt-4'>
            <li data-testid='moods' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />{' '}
              <p>
                <strong>6</strong> moods to choose from
              </p>
            </li>
            <li data-testid='voices' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />
              <p>
                Unique voices to <strong>personalise</strong> your entry
              </p>
            </li>
            <li data-testid='journals' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />{' '}
              <p>
                <strong>Listen</strong> to old journals entries anytime
              </p>
            </li>
            <li data-testid='track' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />{' '}
              <p>
                <strong>Track</strong> your mental state over the month with
                charts
              </p>
            </li>
            <li data-testid='category' className='flex items-center gap-2'>
              <BadgeCheck className='text-green-600' size={20} />{' '}
              <p>
                Choose from <strong>5</strong> moods to categorize your journal
                entries
              </p>
            </li>
          </ul>
        </div>

        <JournalCard
          className='shadow-2xl rounded-lg p-8 max-w-full md:max-w-xl '
          badgeColor='#FFDFB9'
          journal={journal}
        />
      </div>
    </CardSection>
  );
};

export default JournalFeatureSection;
