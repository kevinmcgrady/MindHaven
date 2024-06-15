import { Fragment } from 'react';

import CreateJornalDialog from '@/components/journal/CreateJornalDialog';
import JournalCard from '@/components/journal/JournalCard';
import PreviousJournals from '@/components/journal/PreviousJournals';
import CardSection from '@/components/layout/CardSection';
import PageHeader from '@/components/site/PageHeader';
import { Separator } from '@/components/ui/separator';
import { PLANS } from '@/config/plans';
import { moods } from '@/constants/moods';
import { getAllJournals, getJournalByDate } from '@/queries/journal';
import { getUserSubscriptionPlan } from '@/queries/stripe';

const page = async () => {
  const usersTodayJornals = await getJournalByDate(new Date());
  const usersJournals = await getAllJournals();
  const subscriptionPlan = await getUserSubscriptionPlan();

  const hasUsersJournals = usersJournals && usersJournals.length > 0;
  const hasTodayUsersJournals =
    usersTodayJornals && usersTodayJornals.length > 0;

  const isUserWithinQuota =
    subscriptionPlan?.isSubscribed &&
    usersTodayJornals &&
    usersTodayJornals.length < PLANS.pro.features.noOfEntriesPerDay;

  return (
    <Fragment>
      <CardSection noSpacing>
        <PageHeader
          title='My Journal'
          description=' You can create a new journal entry and listen to all your previous
        entries.'
        />
      </CardSection>

      <CardSection>
        <h2 className='font-light text-muted-foreground mb-2'>Today</h2>

        {!hasTodayUsersJournals && (
          <CreateJornalDialog isProPlan={subscriptionPlan?.isSubscribed!} />
        )}

        {hasTodayUsersJournals && (
          <div className='space-y-4'>
            {usersTodayJornals.map((journal, index) => {
              const badgeColor = moods.find(
                (mood) => mood.name === journal.mood.toLowerCase(),
              )?.color;
              return (
                <Fragment key={journal.id}>
                  <JournalCard
                    badgeColor={badgeColor!}
                    dense={usersTodayJornals.length > 1}
                    journal={journal}
                  />
                  {index !== usersTodayJornals.length - 1 && <Separator />}
                </Fragment>
              );
            })}
          </div>
        )}

        {isUserWithinQuota && hasTodayUsersJournals && (
          <div className='mt-4'>
            <CreateJornalDialog
              buttonText='Create another journal'
              isProPlan={subscriptionPlan.isSubscribed}
            />
          </div>
        )}
      </CardSection>

      <CardSection>
        <h2 className='font-light text-muted-foreground mb-2'>Previous</h2>
        {!hasUsersJournals ? (
          <p className='text-muted-foreground text-sm'>
            You don&apos;t have any journals to display
          </p>
        ) : (
          <PreviousJournals journals={usersJournals} />
        )}
      </CardSection>
    </Fragment>
  );
};

export default page;
