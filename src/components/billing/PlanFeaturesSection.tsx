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
      <div className='space-y-2 text-sm '>
        <p>
          <strong>Voices:</strong> {noOfVoices}
        </p>
        <p>
          <strong>Journals per day:</strong> {noOfEntriesPerDay}
        </p>
        <p>
          <strong>Length of journals:</strong> {lengthOfJournals}
        </p>
      </div>
    </CardSection>
  );
};

export default PlanFeaturesSection;
