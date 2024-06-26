import { describe, expect, it } from 'vitest';

import { formatDate } from '@/utils/formatDate';

describe('formatDate', () => {
  it('should return the correct date formatted', () => {
    const actual = formatDate(new Date('11-11-2024'));
    const expected = '11th Nov 2024';

    expect(actual).toBe(expected);
  });
});
