import { Outlet } from 'react-router-dom';
import MainHeader from './WithoutProtected/Header/MainHeader';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <>
      <MainHeader />
      <div className="mt-[4.5rem] flex ">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AppLayout;
