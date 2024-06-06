import { Chart } from '@/components/Chart';
import PageHeader from '@/components/PageHeader';

const page = () => {
  return (
    <section>
      <PageHeader
        title='My Progress'
        description='You can track your monthly progress, based from your journals.'
      />

      <div className='h-full'>
        <Chart />
      </div>
    </section>
  );
};

export default page;
