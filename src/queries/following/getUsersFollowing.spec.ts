import { currentUser, User as AuthUser } from '@clerk/nextjs/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';

import { getUsersFollowing } from './getUsersFollowing';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      follows: {
        findMany: vi.fn(),
      },
    },
  };
});

describe('getUserFollowing', () => {
  it('should return undefined if user not logged in', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const findManyMock = vi.mocked(db.follows.findMany);

    const actual = await getUsersFollowing();

    expect(findManyMock).toHaveBeenCalledTimes(0);
    expect(actual).toBeUndefined();
  });

  it('should return the users and their avg mood', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
      firstName: 'Kevin',
      lastName: 'McGrady',
    } as AuthUser);

    const findManyMock = vi.mocked(db.follows.findMany).mockResolvedValue([]);

    const actual = await getUsersFollowing();

    expect(findManyMock).toHaveBeenCalledTimes(1);
    expect(actual).toStrictEqual([]);
  });

  it('should return empty array if the user is not following anyone', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const findManyMock = vi.mocked(db.follows.findMany);

    const actual = await getUsersFollowing();

    expect(findManyMock).toHaveBeenCalledTimes(0);
    expect(actual).toBeUndefined();
  });

  it('should return the users and their avg mood', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
      firstName: 'Kevin',
      lastName: 'McGrady',
    } as AuthUser);

    const findManyMock = vi.mocked(db.follows.findMany).mockResolvedValue([
      {
        following: {
          firstName: 'Kevin',
          lastName: 'McGrady',
          imageUrl: 'url',
          country: 'country',
          username: 'username',
          journal: [
            {
              mood: 'happy',
            },
          ],
        },
      },
    ] as any);

    const actual = await getUsersFollowing();

    expect(findManyMock).toHaveBeenCalledTimes(1);
    expect(actual).toStrictEqual([
      {
        avgMood: 'happy',
        following: {
          country: 'country',
          firstName: 'Kevin',
          imageUrl: 'url',
          journal: [
            {
              mood: 'happy',
            },
          ],
          lastName: 'McGrady',
          username: 'username',
        },
      },
    ]);
  });

  it('should return the users and their avg mood as null', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
      firstName: 'Kevin',
      lastName: 'McGrady',
    } as AuthUser);

    const findManyMock = vi.mocked(db.follows.findMany).mockResolvedValue([
      {
        following: {
          firstName: 'Kevin',
          lastName: 'McGrady',
          imageUrl: 'url',
          country: 'country',
          username: 'username',
          journal: [],
        },
      },
    ] as any);

    const actual = await getUsersFollowing();

    expect(findManyMock).toHaveBeenCalledTimes(1);
    expect(actual).toStrictEqual([
      {
        avgMood: null,
        following: {
          country: 'country',
          firstName: 'Kevin',
          imageUrl: 'url',
          journal: [],
          lastName: 'McGrady',
          username: 'username',
        },
      },
    ]);
  });
});
