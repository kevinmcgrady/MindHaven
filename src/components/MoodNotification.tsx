const MoodNotification = () => {
  return (
    <section className='bg-white p-4 mt-4 rounded-xl flex gap-4'>
      <p className='text-5xl'>😀</p>
      <div>
        <h2 className='font-semibold mb-2'>Your mood is good</h2>
        <p className='text-sm font-light'>
          We are pleased you are having a good day!
        </p>
      </div>
    </section>
  );
};

export default MoodNotification;
