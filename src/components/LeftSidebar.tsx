import { Nav } from './Nav';
import { PlanUpgrade } from './PlanUpgrade';

export const LeftSidebar = () => {
  return (
    <aside className='w-[310px] relative hidden md:flex md:flex-col rounded-xl '>
      <Nav />
      <PlanUpgrade />
    </aside>
  );
};
