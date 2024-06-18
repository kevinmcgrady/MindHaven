import { Fragment } from 'react';

import { Badge } from '@/components/ui/badge';

type UserTagsProps = {
  tags: string[];
};

const UserTags = ({ tags = [] }: UserTagsProps) => {
  return (
    <Fragment>
      <h3 className='font-semibold text-lg mb-4'>Tags</h3>
      <div className='space-x-2'>
        {tags.map((tag) => (
          <Badge key={tag} variant='outline' className='p-2 rounded-md'>
            {tag}
          </Badge>
        ))}
      </div>
    </Fragment>
  );
};

export default UserTags;
