'use server';

import { currentUser } from '@clerk/nextjs/server';
import { format } from 'date-fns';
import _ from 'underscore';

import { getUsersAvgMood } from '@/utils/getUsersAvgMood';
import { getUsersMood } from '@/utils/getUsersMood';

import { getJournalByDate, getJournalsByMonthAndYear } from './journal';

type getUserMoodForTodayResponse = {
  message: string;
  overallMood: string | undefined;
};

export const getUserMoodForToday =
  async (): Promise<getUserMoodForTodayResponse | null> => {
    const user = currentUser();

    if (!user) return null;

    const usersTodayJournals = await getJournalByDate(new Date());

    if (!usersTodayJournals || usersTodayJournals.length === 0) return null;

    const usersMood = getUsersMood(usersTodayJournals);

    if (usersMood) return usersMood;

    return null;
  };

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
