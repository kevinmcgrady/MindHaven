import { currentUser,User as AuthUser } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';

import { searchUsers } from './searchUsers';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      user: {
        findMany: vi.fn(),
      },
    },
  };
});

describe('searchUsers', () => {
  it('should return undefined if user not logged in', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const findManyMock = vi.mocked(db.user.findMany);

    const actual = await searchUsers('searchTerm');

    expect(findManyMock).toBeCalledTimes(0);
    expect(actual).toBeUndefined();
  });

  it('should return users if found', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
      firstName: 'Kevin',
      lastName: 'McGrady',
    } as AuthUser);

    const findManyMock = vi.mocked(db.user.findMany).mockResolvedValue([
      {
        emailAddress: 'email.com',
        firstName: 'Kevin',
        lastName: 'McGrady',
      },
    ] as User[]);

    const actual = await searchUsers('searchTerm');

    expect(findManyMock).toBeCalledTimes(1);
    expect(actual).toStrictEqual([
      {
        emailAddress: 'email.com',
        firstName: 'Kevin',
        lastName: 'McGrady',
      },
    ]);
  });

  it('should return empty array if no users found', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
      firstName: 'Kevin',
      lastName: 'McGrady',
    } as AuthUser);

    const findManyMock = vi.mocked(db.user.findMany).mockResolvedValue([]);

    const actual = await searchUsers('searchTerm');

    expect(findManyMock).toBeCalledTimes(1);
    expect(actual).toStrictEqual([]);
  });
});
