'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { followUnfollowUser } from '@/queries/following';

import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

type FollowAndSupportButtonsProps = {
  targetUserId: string;
  isUserFollowing: boolean;
};

const FollowAndSupportButtons = ({
  targetUserId,
  isUserFollowing,
}: FollowAndSupportButtonsProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isSupporting, setIsSupporting] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const followButtonText = isUserFollowing ? 'Unfollow' : 'Follow';

  const handleFollow = async () => {
    try {
      setIsFollowing(true);
      await followUnfollowUser(targetUserId);
      router.refresh();
    } catch (error) {
      toast({
        title: 'Oops',
        description: 'There was a problem, please try again',
        variant: 'destructive',
      });
    } finally {
      setIsFollowing(false);
    }
  };

  const handleShowSupport = () => {
    try {
      setIsSupporting(true);
    } catch (error) {
      toast({
        title: 'Oops',
        description: 'There was a problem, please try again',
        variant: 'destructive',
      });
    } finally {
      setIsSupporting(false);
    }
  };

  return (
    <div className='flex justify-center gap-2 mt-4'>
      <Button onClick={handleFollow} size='sm'>
        {isFollowing ? (
          <Loader2 size={15} className='animate-spin' />
        ) : (
          followButtonText
        )}
      </Button>
      <Button onClick={handleShowSupport} size='sm' variant='outline'>
        {isSupporting ? (
          <Loader2 size={15} className='animate-spin' />
        ) : (
          'Show Support 🙏'
        )}
      </Button>
    </div>
  );
};

export default FollowAndSupportButtons;
