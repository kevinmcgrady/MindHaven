import { describe, expect,it } from 'vitest';

import { formatNumber } from '@/utils/formatNumber';

describe('formatNumber', () => {
  it('should return the number formatted', () => {
    const actual = formatNumber(1000);
    const expected = '1,000';

    expect(actual).toEqual(expected);
  });
});
