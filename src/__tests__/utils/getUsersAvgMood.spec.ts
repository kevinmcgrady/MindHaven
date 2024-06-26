import { Journal } from '@prisma/client';
import { describe, expect, it } from 'vitest';

import { getUsersAvgMood } from '@/utils/getUsersAvgMood';

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
];

describe('getUsersAvgMood', () => {
  it('should return the users avg mood over the month', () => {
    const actual = getUsersAvgMood(journals);
    const expected = 'happy';
    expect(actual).toBe(expected);
  });
});
