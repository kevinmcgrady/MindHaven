'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const getJournalsByMonthAndYear = async (
  month: string,
  year: string,
) => {
  const user = await currentUser();

  if (!user) return;

  const journals = await db.journal.findMany({
    where: {
      userId: user.id,
      createdAtMonth: month,
      createdAtYear: year,
    },
  });

  return journals;
};
