import { currentUser, User as AuthUser } from '@clerk/nextjs/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';
import { followUnfollowUser } from '@/queries/following/followUnfollowUser';
import { isUserFollowing } from '@/queries/following/isUserFollowing';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/queries/following/isUserFollowing');
vi.mock('@/lib/db', () => {
  return {
    db: {
      follows: {
        delete: vi.fn(),
        create: vi.fn(),
      },
    },
  };
});

describe('followunfollowUser', () => {
  it('should return undefined if user is not logged in', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const actual = await followUnfollowUser('targetUserId');

    expect(actual).toBeUndefined();
  });

  it('should call the delete method if the user is already following', async () => {
    const deleteMock = vi.mocked(db.follows.delete);
    const createMock = vi.mocked(db.follows.create);

    vi.mocked(currentUser).mockResolvedValue({
      id: 'id',
      emailAddresses: [{ emailAddress: 'email.com' }],
      firstName: 'Kevin',
      lastName: 'McGrady',
    } as AuthUser);

    vi.mocked(isUserFollowing).mockResolvedValue({
      followerId: 'followerId',
      followingId: 'followingId',
    });

    await followUnfollowUser('targetUserId');

    expect(deleteMock).toBeCalledTimes(1);
    expect(deleteMock).toBeCalledWith({
      where: {
        followerId_followingId: {
          followerId: 'id',
          followingId: 'targetUserId',
        },
      },
    });
    expect(createMock).toBeCalledTimes(0);
  });

  it('should call the create method if the user is not already following', async () => {
    const deleteMock = vi.mocked(db.follows.delete);
    const createMock = vi.mocked(db.follows.create);

    vi.mocked(currentUser).mockResolvedValue({
      id: 'id',
      emailAddresses: [{ emailAddress: 'email.com' }],
      firstName: 'Kevin',
      lastName: 'McGrady',
    } as AuthUser);

    vi.mocked(isUserFollowing).mockResolvedValue(null);

    await followUnfollowUser('targetUserId');

    expect(deleteMock).toHaveBeenCalledTimes(0);
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledWith({
      data: {
        followerId: 'id',
        followingId: 'targetUserId',
      },
    });
  });
});
