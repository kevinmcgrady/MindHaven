'use server';

import { currentUser } from '@clerk/nextjs/server';
import { format } from 'date-fns';

import { getUsersAvgMood } from '@/utils/getUsersAvgMood';

import { getJournalsByMonthAndYear } from '../journal';

export const getUsersAvgMoodForTheMonth = async (): Promise<string | null> => {
  const user = await currentUser();

  if (!user) return null;

  const month = format(new Date(), 'MMM');
  const year = format(new Date(), 'yyyy');

  const journals = await getJournalsByMonthAndYear(month, year);

  if (!journals || journals.length === 0) return null;

  const mood = getUsersAvgMood(journals);

  return mood;
};
