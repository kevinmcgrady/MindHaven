import { describe, expect, it } from 'vitest';

import { formatTime } from '@/utils/formatTime';

describe('formatTime', () => {
  it('should return the time formatted', () => {
    const actual = formatTime(1200);
    const exprected = '20:00';

    expect(actual).toBe(exprected);
  });
});
