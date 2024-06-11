type PageHeaderProps = {
  title: string;
  description: string;
};

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div>
      <h2 className='font-semibold text-2xl mb-4'>{title}</h2>
      <p className='text-sm font-light text-muted-foreground'>{description}</p>
    </div>
  );
};

export default PageHeader;
