import { Chart } from '@/components/Chart';
import PageHeader from '@/components/PageHeader';

const page = () => {
  return (
    <section className='h-full flex flex-col'>
      <PageHeader
        title='My Progress'
        description='You can track your monthly progress, based from your journals.'
      />
      <Chart />
    </section>
  );
};

export default page;
