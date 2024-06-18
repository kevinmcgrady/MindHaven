export const Footer = () => {
  return (
    <footer className='bg-[#292829] md:rounded-xl mt-8 text-white'>
      <div className='w-full mx-auto p-4'>
        <span className='block text-sm sm:text-center'>
          © {new Date().getFullYear()} MindHaven . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
