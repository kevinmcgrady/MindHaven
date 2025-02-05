import { Fragment } from 'react';

import CardSection from '@/components/layout/CardSection';
import UserProfileHeader from '@/components/user/UserProfileHeader';
import UserTags from '@/components/user/UserTags';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { getUserDetails } from '@/queries/auth';

const page = async () => {
  const user = await getUserDetails();

  if (!user?.hasCompletedProfile) {
    return <WelcomeScreen />;
  }

  return (
    <Fragment>
      <CardSection noSpacing>
        <UserProfileHeader
          user={user}
          isCurrentUser={true}
          noOfFollowers={user.followers.length}
          noOfFollowing={user.following.length}
        />
      </CardSection>

      <CardSection>
        <h3 className='font-semibold text-lg mb-4'>Mental Health Goal</h3>
        <p className='text-muted-foreground'>{user.mentalHealthGoal}</p>
      </CardSection>

      <CardSection>
        <UserTags tags={user.tags} />
      </CardSection>
    </Fragment>
  );
};

export default page;
