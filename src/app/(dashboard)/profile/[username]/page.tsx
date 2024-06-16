import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import CardSection from '@/components/layout/CardSection';
import UserBadges from '@/components/user/UserBadges';
import UserProfileHeader from '@/components/user/UserProfileHeader';
import UserTags from '@/components/user/UserTags';
import { getUserByUsername } from '@/queries/user';

type PageProps = {
  params: {
    username: string;
  };
};
const page = async ({ params }: PageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user) return notFound();
  return (
    <Fragment>
      <CardSection noSpacing>
        <UserProfileHeader user={user} />
      </CardSection>

      <CardSection>
        <h3 className='font-semibold text-lg mb-4'>Mental Health Goal</h3>
        <p className='text-muted-foreground'>{user.mentalHealthGoal}</p>
      </CardSection>

      <CardSection>
        <UserTags tags={user.tags} />
      </CardSection>

      <CardSection>
        <UserBadges />
      </CardSection>
    </Fragment>
  );
};

export default page;
