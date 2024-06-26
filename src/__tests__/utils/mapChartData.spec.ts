import { Journal } from '@prisma/client';
import { describe, expect, it } from 'vitest';

import { mapChartData, mapChartDataResponse } from '@/utils/mapChartData';

const journals: Journal[] = [
  {
    id: 'id',
    audioUrl: '',
    createdAt: new Date(),
    createdAtMonth: '',
    createdAtYear: '',
    entry: '',
    mood: 'happy',
    title: '',
    updatedAt: new Date(),
    userId: '',
    voice: 'alloy',
  },
  {
    id: 'id',
    audioUrl: '',
    createdAt: new Date(),
    createdAtMonth: '',
    createdAtYear: '',
    entry: '',
    mood: 'happy',
    title: '',
    updatedAt: new Date(),
    userId: '',
    voice: 'alloy',
  },
  {
    id: 'id',
    audioUrl: '',
    createdAt: new Date(),
    createdAtMonth: '',
    createdAtYear: '',
    entry: '',
    mood: 'sad',
    title: '',
    updatedAt: new Date(),
    userId: '',
    voice: 'alloy',
  },
  {
    id: 'id',
    audioUrl: '',
    createdAt: new Date(),
    createdAtMonth: '',
    createdAtYear: '',
    entry: '',
    mood: 'exited',
    title: '',
    updatedAt: new Date(),
    userId: '',
    voice: 'alloy',
  },
  {
    id: 'id',
    audioUrl: '',
    createdAt: new Date(),
    createdAtMonth: '',
    createdAtYear: '',
    entry: '',
    mood: 'anxious',
    title: '',
    updatedAt: new Date(),
    userId: '',
    voice: 'alloy',
  },
  {
    id: 'id',
    audioUrl: '',
    createdAt: new Date(),
    createdAtMonth: '',
    createdAtYear: '',
    entry: '',
    mood: 'depressed',
    title: '',
    updatedAt: new Date(),
    userId: '',
    voice: 'alloy',
  },
];

describe('mapChartData', () => {
  it('should map journals to correct format for the chart', () => {
    const actual = mapChartData(journals);

    const expected: mapChartDataResponse[] = [
      { mood: 'happy', noOfDays: 2 },
      { mood: 'sad', noOfDays: 1 },
      { mood: 'anxious', noOfDays: 1 },
      { mood: 'exited', noOfDays: 1 },
      { mood: 'depressed', noOfDays: 1 },
    ];

    expect(actual).toEqual(expected);
  });

  it('should return 0 for moods with no days', () => {
    const actual = mapChartData([]);

    const expected: mapChartDataResponse[] = [
      { mood: 'happy', noOfDays: 0 },
      { mood: 'sad', noOfDays: 0 },
      { mood: 'anxious', noOfDays: 0 },
      { mood: 'exited', noOfDays: 0 },
      { mood: 'depressed', noOfDays: 0 },
    ];

    expect(actual).toEqual(expected);
  });
});
