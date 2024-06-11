import { Button } from '../ui/button';

const UserTags = () => {
  return (
    <>
      <h3 className='font-semibold text-lg mb-4'>Tags</h3>
      <div className='space-x-2'>
        <Button size='sm' variant='outline'>
          social anxiety
        </Button>
        <Button size='sm' variant='outline'>
          anxiety
        </Button>
        <Button size='sm' variant='outline'>
          autism
        </Button>
      </div>
    </>
  );
};

export default UserTags;
