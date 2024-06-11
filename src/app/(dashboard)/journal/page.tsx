import { AudioPlayer } from '@/components/AudioPlayer';
import CreateJornalDialog from '@/components/CreateJornalDialog';
import PageHeader from '@/components/PageHeader';
import PreviousJournals from '@/components/PreviousJournals';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDate } from '@/lib/formatDate';
import { getAllJournals, getUsersTodayJornal } from '@/queries/journal';

const page = async () => {
  const usersTodayJornal = await getUsersTodayJornal();
  const usersJournals = await getAllJournals();

  return (
    <section>
      <PageHeader
        title='My Journal'
        description=' You can create a new journal entry and listen to all your previous
        entries.'
      />

      <Tabs defaultValue='today' className='w-full'>
        <TabsList className='w-full justify-start'>
          <TabsTrigger value='today'>Todays Entry</TabsTrigger>
          <TabsTrigger value='previous'>Previous Entries</TabsTrigger>
        </TabsList>
        <TabsContent className='pt-4' value='today'>
          {!usersTodayJornal && <CreateJornalDialog />}

          {usersTodayJornal && (
            <>
              <h2 className='mb-8 font-semibold text-xl'>
                {usersTodayJornal.title} -
                <span className='font-light'>
                  {formatDate(usersTodayJornal.createdAt)}
                </span>
              </h2>

              <AudioPlayer journal={usersTodayJornal} />
              <h3 className='mt-8 font-semibold'>Transcript</h3>
              <p className='mt-2 font-light leading-7'>
                {usersTodayJornal.entry}
              </p>
            </>
          )}
        </TabsContent>
        <TabsContent className='pt-4' value='previous'>
          {!usersJournals || usersJournals.length === 0 ? (
            <p>You don&apos;t have any journals to display</p>
          ) : (
            <PreviousJournals journals={usersJournals} />
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default page;
