import CreateJornalDialog from '@/components/CreateJornalDialog';
import ListenButton from '@/components/ListenButton';
import PageHeader from '@/components/PageHeader';
import PreviousJournals from '@/components/PreviousJournals';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/formatDate';
import { getAllJournals, getJournalByDate } from '@/queries/journal';

const page = async () => {
  const usersTodayJornal = await getJournalByDate(new Date());
  const usersJournals = await getAllJournals();

  return (
    <>
      <section className='bg-white p-4 rounded-xl'>
        <PageHeader
          title='My Journal'
          description=' You can create a new journal entry and listen to all your previous
        entries.'
        />
      </section>

      <section className='bg-white rounded-xl p-4 mt-4'>
        {!usersTodayJornal && (
          <>
            <h2 className='font-light text-muted-foreground mb-2'>
              You don&apos;t have an entry for today!
            </h2>
            <CreateJornalDialog />
          </>
        )}

        {usersTodayJornal && (
          <>
            <h2 className='font-light text-muted-foreground mb-2'>Today</h2>
            <h3 className='font-semibold mb-2 text-lg'>
              {usersTodayJornal.title}
            </h3>
            <p className='mb-4 text-muted-foreground'>
              &quot;{usersTodayJornal.entry}&quot;
            </p>

            <div className='flex items-center justify-between'>
              <p className='text-xs'>
                {formatDate(usersTodayJornal.createdAt)}
              </p>
              <Badge variant='outline'>{usersTodayJornal.mood}</Badge>
            </div>

            <ListenButton journal={usersTodayJornal} />
          </>
        )}
      </section>

      <section className='bg-white rounded-xl p-4 mt-4'>
        <h2 className='font-light text-muted-foreground mb-2'>Previous</h2>
        {!usersJournals || usersJournals.length === 0 ? (
          <p>You don&apos;t have any journals to display</p>
        ) : (
          <PreviousJournals journals={usersJournals} />
        )}
      </section>
    </>
  );
};

export default page;
