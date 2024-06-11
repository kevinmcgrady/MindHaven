import { Mood } from '@/types';

type MoodType = {
  name: Mood;
};

export const moods: MoodType[] = [
  { name: 'sad' },
  { name: 'happy' },
  { name: 'anxious' },
  { name: 'exited' },
  { name: 'depressed' },
];
