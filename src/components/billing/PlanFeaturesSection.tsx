import { AudioLines, BookHeart, CaseSensitive } from 'lucide-react';

import { formatNumber } from '@/utils/formatNumber';

import CardSection from '../layout/CardSection';

type PlanFeaturesSectionProps = {
  title: string;
  noOfVoices: number;
  noOfEntriesPerDay: number;
  lengthOfJournals: number;
};

const PlanFeaturesSection = ({
  lengthOfJournals,
  noOfEntriesPerDay,
  noOfVoices,
  title,
}: PlanFeaturesSectionProps) => {
  return (
    <CardSection>
      <h2 className='font-semibold text-lg mb-2'>{title}</h2>
      <div className='space-y-2 text-sm'>
        <div className='flex space-x-4'>
          <AudioLines className='text-muted-foreground' />
          <p>
            <strong>{noOfVoices} </strong> unique voices
          </p>
        </div>

        <div className='flex space-x-4'>
          <BookHeart className='text-muted-foreground' />
          <p>
            <strong>{noOfEntriesPerDay}</strong> journals per day
          </p>
        </div>

        <div className='flex space-x-4'>
          <CaseSensitive className='text-muted-foreground' />
          <p>
            <strong>{formatNumber(lengthOfJournals)}</strong> characters per
            journal
          </p>
        </div>
      </div>
    </CardSection>
  );
};

export default PlanFeaturesSection;
