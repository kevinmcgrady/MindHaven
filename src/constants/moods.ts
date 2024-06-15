import { Mood } from '@prisma/client';

type MoodType = {
  name: Mood;
  color: string;
};

export const moods: MoodType[] = [
  { name: 'happy', color: '#FFB3BA' },
  { name: 'sad', color: '#BAE1FF' },
  { name: 'anxious', color: '#FFFFBA' },
  { name: 'exited', color: '#FFDFB9' },
  { name: 'depressed', color: '#BAFFC8' },
];
