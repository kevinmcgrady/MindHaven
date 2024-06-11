import { PlanUpgrade } from '../PlanUpgrade';
import { Nav } from './Nav';

export const LeftSidebar = () => {
  return (
    <aside className='w-[310px] relative hidden md:flex md:flex-col rounded-xl '>
      <Nav />
      <PlanUpgrade />
    </aside>
  );
};
