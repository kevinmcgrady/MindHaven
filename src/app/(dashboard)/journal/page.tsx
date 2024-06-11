import CreateJornalDialog from '@/components/journal/CreateJornalDialog';
import JournalCard from '@/components/journal/JournalCard';
import CardSection from '@/components/layout/CardSection';
import PageHeader from '@/components/PageHeader';
import PreviousJournals from '@/components/PreviousJournals';
import { getAllJournals, getJournalByDate } from '@/queries/journal';

const page = async () => {
  const usersTodayJornal = await getJournalByDate(new Date());
  const usersJournals = await getAllJournals();
  const hasUsersJournals = usersJournals && usersJournals.length > 0;

  return (
    <>
      <CardSection noSpacing>
        <PageHeader
          title='My Journal'
          description=' You can create a new journal entry and listen to all your previous
        entries.'
        />
      </CardSection>

      <CardSection>
        {!usersTodayJornal && (
          <>
            <h2 className='font-light text-muted-foreground mb-2'>
              You don&apos;t have an entry for today!
            </h2>
            <CreateJornalDialog />
          </>
        )}

        {usersTodayJornal && (
          <JournalCard title='Today' journal={usersTodayJornal} />
        )}
      </CardSection>

      <CardSection>
        <h2 className='font-light text-muted-foreground mb-2'>Previous</h2>
        {!hasUsersJournals ? (
          <p>You don&apos;t have any journals to display</p>
        ) : (
          <PreviousJournals journals={usersJournals} />
        )}
      </CardSection>
    </>
  );
};

export default page;
