import { useEffect } from 'react';
import DashboardLayout from '../features/DashboardPage/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userRole = params.get('userRole');

    if (userRole) {
      Cookies.set('userRole', userRole, {
        expires: 90,
        sameSite: 'None',
        secure: process.env.NODE_ENV === 'production',
      });
      // Optionally, remove the query parameter from the URL
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);
  return (
    <div className="my-[2vh] ml-[0.4rem] mr-[0.4rem] mt-7 flex h-[86vh] overflow-scroll rounded-xl border-r border-r-grey-200 bg-slate-200 p-4 tracking-wider shadow-md shadow-blue-200 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900 md:m-[2vh]">
      <div className="items-center justify-between">
        <div className="flex items-center justify-between">
          <h1 className="m-5 text-lg font-semibold">Dashboard</h1>
        </div>
        <DashboardLayout />
      </div>
    </div>
  );
}

export default Dashboard;
