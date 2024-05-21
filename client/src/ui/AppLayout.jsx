import { Outlet } from 'react-router-dom';
import MainHeader from './WithoutProtected/Header/MainHeader';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <>
      <div className="mt-[4.5rem] flex ">
        <div className="md:w-1/5 md:overflow-hidden">
          <Sidebar />
        </div>
        <div className="md:w-4/5 ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AppLayout;
