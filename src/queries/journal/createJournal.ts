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
