import { currentUser,User as AuthUser } from '@clerk/nextjs/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';

import { isUserFollowing } from './isUserFollowing';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      follows: {
        findFirst: vi.fn(),
      },
    },
  };
});

describe('isUserFollowing', () => {
  it('should return undefined if user is not logged in', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);

    const findMock = vi.mocked(db.follows.findFirst);
    const actual = await isUserFollowing('targetUserId');

    expect(findMock).toBeCalledTimes(0);
    expect(actual).toBeUndefined();
  });

  it('should return truthy is the user is following', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      id: 'id',
      emailAddresses: [{ emailAddress: 'email.com' }],
      firstName: 'Kevin',
      lastName: 'McGrady',
    } as AuthUser);

    const findMock = vi.mocked(db.follows.findFirst).mockResolvedValue({
      followerId: 'followId',
      followingId: 'followingId',
    });

    const actual = await isUserFollowing('targetUserId');

    expect(findMock).toBeCalledTimes(1);
    expect(findMock).toBeCalledWith({
      where: {
        followerId: 'id',
        followingId: 'targetUserId',
      },
    });

    expect(actual).toStrictEqual({
      followerId: 'followId',
      followingId: 'followingId',
    });
  });

  it('should return nullish if user is not following', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      id: 'id',
      emailAddresses: [{ emailAddress: 'email.com' }],
      firstName: 'Kevin',
      lastName: 'McGrady',
    } as AuthUser);

    const findMock = vi.mocked(db.follows.findFirst).mockResolvedValue(null);

    const actual = await isUserFollowing('targetUserId');

    expect(findMock).toHaveBeenCalledTimes(1);
    expect(findMock).toBeCalledWith({
      where: {
        followerId: 'id',
        followingId: 'targetUserId',
      },
    });

    expect(actual).toBeNull();
  });
});
