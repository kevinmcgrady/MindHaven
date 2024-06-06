type PageHeaderProps = {
  title: string;
  description: string;
};

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <>
      <h2 className='font-semibold text-2xl mb-4'>{title}</h2>
      <p className='text-sm font-light mb-8'>{description}</p>
    </>
  );
};

export default PageHeader;
