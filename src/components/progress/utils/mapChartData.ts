import { Journal } from '@prisma/client';
import _ from 'underscore';

export const mapChartData = (data: Journal[]) => {
  const groupedJournals = _.groupBy(data, 'mood');
  return [
    { mood: 'HAPPY', noOfDays: groupedJournals.HAPPY?.length || 0 },
    { mood: 'SAD', noOfDays: groupedJournals.SAD?.length || 0 },
    { mood: 'ANXIOUS', noOfDays: groupedJournals.ANXIOUS?.length || 0 },
    { mood: 'EXITED', noOfDays: groupedJournals.EXITED?.length || 0 },
    { mood: 'DEPRESSED', noOfDays: groupedJournals.DEPRESSED?.length || 0 },
  ];
};
