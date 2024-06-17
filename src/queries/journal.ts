'use server';

import { currentUser } from '@clerk/nextjs/server';
import { Mood, Voice } from '@prisma/client';
import { format } from 'date-fns';

import { db } from '@/lib/db';

export const createJornal = async (jornal: {
  title: string;
  entry: string;
  mood: Mood;
  voice: Voice;
  audioUrl: string;
}) => {
  const user = await currentUser();

  if (!user) return;

  const month = format(new Date(), 'MMM');
  const year = format(new Date(), 'yyyy');

  await db.journal.create({
    data: {
      title: jornal.title,
      entry: jornal.entry,
      mood: jornal.mood,
      voice: jornal.voice,
      userId: user.id,
      audioUrl: jornal.audioUrl,
      createdAtMonth: month,
      createdAtYear: year,
    },
  });
};

export const getJournalByDate = async (date: string) => {
  const user = await currentUser();
  console.log(date);
  if (!user) return;

  const selectedDate = date.split('T')[0] + 'T00:00:00.000Z';

  console.log(selectedDate);

  const journals = await db.journal.findMany({
    where: {
      userId: user.id,
      createdAt: {
        equals: selectedDate,
      },
    },
  });

  return journals;
};

export const getAllJournals = async () => {
  const user = await currentUser();

  if (!user) return;

  const journals = await db.journal.findMany({
    where: {
      userId: user.id,
    },
  });

  return journals;
};

export const getAllJournalCount = async () => {
  const user = await currentUser();

  if (!user) return;

  const count = db.journal.aggregate({
    where: {
      userId: user.id,
    },
    _count: true,
  });

  return count;
};

export const getLastJournalDate = async () => {
  const user = await currentUser();

  if (!user) return;

  const journal = await db.journal.findFirst({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return journal?.createdAt;
};

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
