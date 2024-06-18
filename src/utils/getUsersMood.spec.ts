import { Journal } from '@prisma/client';
import { describe, expect, it } from 'vitest';

import { getUsersMood } from '@/utils/getUsersMood';

describe('getUsersMood', () => {
  it('should return one mood if only one element in array', () => {
    const journal: Journal[] = [
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
    ];

    const actual = getUsersMood(journal);

    const expected = {
      message: 'You are happy today',
      overallMood: 'happy',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('should return both moods if both moods are different', () => {
    const journals: Journal[] = [
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'shimmer',
      },
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'sad',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
    ];

    const actual = getUsersMood(journals);

    const expected = {
      message: 'You are happy and sad today',
      overallMood: 'mixed',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('should return one mood if both moods are the same', () => {
    const journals: Journal[] = [
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
    ];

    const actual = getUsersMood(journals);

    const expected = {
      message: 'You are happy today',
      overallMood: 'happy',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('should return all three of all three are different', () => {
    const journals: Journal[] = [
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'sad',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'exited',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
    ];

    const actual = getUsersMood(journals);

    const expected = {
      message: 'You are happy, sad and exited today',
      overallMood: 'mixed',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('should return one if all three are the same', () => {
    const journals: Journal[] = [
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
    ];

    const actual = getUsersMood(journals);

    const expected = {
      message: 'You are happy today',
      overallMood: 'happy',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('should return the first mood if one and two are the same', () => {
    const journals: Journal[] = [
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'sad',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
    ];

    const actual = getUsersMood(journals);

    const expected = {
      message: 'You are happy overall today and sad',
      overallMood: 'happy',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('should return the second mood if two and three are the same', () => {
    const journals: Journal[] = [
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'sad',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'sad',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
    ];

    const actual = getUsersMood(journals);

    const expected = {
      message: 'You are sad overall today and happy',
      overallMood: 'sad',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('should return the third mood if three and one are the same', () => {
    const journals: Journal[] = [
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'sad',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
      {
        id: 'id',
        audioUrl: 'url',
        createdAt: new Date(),
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: new Date(),
        userId: 'userId',
        voice: 'alloy',
      },
    ];

    const actual = getUsersMood(journals);

    const expected = {
      message: 'You are happy overall today and sad',
      overallMood: 'happy',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('should return null if no journals', () => {
    const journals: Journal[] = [];
    const actual = getUsersMood(journals);

    expect(actual).toBeFalsy();
  });
});
