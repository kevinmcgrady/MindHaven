type EmptyStateProps = {
  description: string;
};

const EmptyState = ({ description }: EmptyStateProps) => {
  return <p className='text-muted-foreground text-sm'>{description}</p>;
};

export default EmptyState;
