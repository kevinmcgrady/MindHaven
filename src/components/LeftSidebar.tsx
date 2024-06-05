import { Nav } from './Nav';
import { PlanUpgrade } from './PlanUpgrade';

export const LeftSidebar = () => {
  return (
    <aside className='w-[210px] mr-4 flex flex-col justify-between'>
      <Nav />
      <PlanUpgrade />
    </aside>
  );
};
