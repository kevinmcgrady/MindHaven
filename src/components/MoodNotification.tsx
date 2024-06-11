import CardSection from './layout/CardSection';

const MoodNotification = () => {
  return (
    <CardSection className='flex gap-4'>
      <p className='text-5xl'>😀</p>
      <div>
        <h2 className='font-semibold mb-2'>Your mood is good</h2>
        <p className='text-sm font-light'>
          We are pleased you are having a good day!
        </p>
      </div>
    </CardSection>
  );
};

export default MoodNotification;
