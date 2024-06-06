import CalendarInput from '@/components/CalendarInput';
import CreateJornalDialog from '@/components/CreateJornalDialog';
import PageHeader from '@/components/PageHeader';
import { Separator } from '@/components/ui/separator';

const page = () => {
  return (
    <section>
      <PageHeader
        title='My Journal'
        description=' You can create a new journal entry and listen to all your previous
        entries.'
      />
      <h3 className='text-lg font-semibold mb-4'>Create a new entry</h3>
      <CreateJornalDialog />
      <Separator className='my-8' />
      <h3 className='text-lg font-semibold mb-4'>Previous entries</h3>
      <CalendarInput />
    </section>
  );
};

export default page;
