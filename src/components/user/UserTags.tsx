import { Fragment } from 'react';

import { Button } from '../ui/button';

type UserTagsProps = {
  tags: string[];
};

const UserTags = ({ tags = [] }: UserTagsProps) => {
  return (
    <Fragment>
      <h3 className='font-semibold text-lg mb-4'>Tags</h3>
      <div className='space-x-2'>
        {tags.map((tag) => (
          <Button key={tag} size='sm' variant='outline'>
            {tag}
          </Button>
        ))}
      </div>
    </Fragment>
  );
};

export default UserTags;
