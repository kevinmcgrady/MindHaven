'use server';

import { currentUser } from '@clerk/nextjs/server';

import { getUsersMood } from '@/utils/getUsersMood';

import { getJournalByDate } from '../journal';

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
