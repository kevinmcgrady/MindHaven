import { Journal, Mood } from '@prisma/client';
import _ from 'underscore';

import { moods } from '../constants/moods';

export type mapChartDataResponse = {
  mood: Mood;
  noOfDays: number;
};

export const mapChartData = (data: Journal[]): mapChartDataResponse[] => {
  const groupedJournals = _.groupBy(data, 'mood');

  return moods.map((mood) => {
    return {
      mood: mood.name,
      noOfDays: groupedJournals[mood.name]?.length || 0,
    };
  });
};
