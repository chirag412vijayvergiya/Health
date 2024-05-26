import { Outlet } from 'react-router-dom';
import MainHeader from './WithoutProtected/Header/MainHeader';
import Sidebar from './Sidebar';
import MobileBottombar from './MobileBottombar';

function AppLayout() {
  return (
    <>
      <div className="mt-[4.5rem] flex ">
        <div className="hidden md:flex md:w-1/5 md:overflow-hidden">
          <Sidebar />
        </div>
        <div className="fixed inset-x-0 bottom-0 z-[10] border-t border-t-grey-100 bg-white dark:border-t-grey-800 dark:bg-grey-900 lg:hidden">
          <MobileBottombar />
        </div>
        <div className="w-full md:w-4/5">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AppLayout;
