import { Nav } from './Nav';
import { PlanUpgrade } from './PlanUpgrade';

export const LeftSidebar = () => {
  return (
    <aside className='w-[210px] mr-4  relative hidden md:flex'>
      <div className='sticky top-0'>
        <Nav />
        <PlanUpgrade />
      </div>
    </aside>
  );
};
