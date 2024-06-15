import { Journal } from '@prisma/client';
import _ from 'underscore';

export const getUsersAvgMood = (journals: Journal[]) => {
  const grouped = _.countBy(journals, 'mood');

  const mood = Object.keys(grouped).reduce((previous, current) =>
    grouped[previous] > grouped[current] ? previous : current,
  );

  if (!mood) return null;

  return mood;
};
