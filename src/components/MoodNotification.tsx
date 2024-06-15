import CardSection from './layout/CardSection';

type MoodNotificationProps = {
  message: string;
};

const MoodNotification = ({ message }: MoodNotificationProps) => {
  return (
    <CardSection className='flex gap-4'>
      <p className='text-5xl'>😀</p>
      <div>
        <h2 className='font-semibold mb-2'>{message}</h2>
        <p className='text-sm font-light'>This is based from your journals</p>
      </div>
    </CardSection>
  );
};

export default MoodNotification;
