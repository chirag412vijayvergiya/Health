import Button from './Button';
import { MdSpaceDashboard } from 'react-icons/md';
import { GiTechnoHeart } from 'react-icons/gi';
import { FaUserDoctor } from 'react-icons/fa6';
import { FaPersonCane } from 'react-icons/fa6';
import { MdOutlinePayments } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi2';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import { useUser } from '../features/authentication/Patients/useUser';

function MobileBottombar() {
  const {
    user: {
      data: {
        data: { role: currentRole },
      },
    },
  } = useUser();
  return (
    <div className="mx-auto flex w-11/12 max-w-lg items-center justify-between py-4">
      <NavLink
        to="/dashboard"
        className="relative flex flex-1 flex-col items-center text-grey-800 dark:text-grey-500"
      >
        <MdSpaceDashboard className="" />
        {/* <span className="text-xs">Dashboard</span> */}
      </NavLink>
      <NavLink
        to="/appointments"
        className="text-main-06 hover:text-main-06 relative flex flex-1 flex-col items-center"
      >
        <GiTechnoHeart />
        {/* <span className="text-xs">Appointments</span> */}
      </NavLink>

      <NavLink
        to="/patients"
        className="relative flex flex-1 flex-col items-center text-grey-600 hover:text-indigo-600 aria-[current=page]:bg-gray-300 aria-[current=page]:text-indigo-800 dark:text-gray-400 dark:hover:text-indigo-400 dark:aria-[current=page]:bg-slate-700 dark:aria-[current=page]:text-indigo-400"
      >
        <FaPersonCane />
        {/* <span className="text-xs">Patients</span> */}
      </NavLink>

      <NavLink
        to="/doctors"
        className="relative flex flex-1 flex-col items-center text-grey-600 hover:text-indigo-600 aria-[current=page]:bg-gray-300 aria-[current=page]:text-indigo-800 dark:text-gray-400 dark:hover:text-indigo-400 dark:aria-[current=page]:bg-slate-700 dark:aria-[current=page]:text-indigo-400"
      >
        <FaUserDoctor />
        {/* <span className="text-xs">Doctors</span> */}
      </NavLink>

      <NavLink
        to="/payments"
        className="relative flex flex-1 flex-col items-center text-grey-600 hover:text-indigo-600 aria-[current=page]:bg-gray-300 aria-[current=page]:text-indigo-800 dark:text-gray-400 dark:hover:text-indigo-400 dark:aria-[current=page]:bg-slate-700 dark:aria-[current=page]:text-indigo-400"
      >
        <MdOutlinePayments />
        {/* <span className="text-xs">Payments</span> */}
      </NavLink>
      {currentRole === 'patient' && (
        <NavLink
          to="/reviews"
          className="relative flex flex-1 flex-col items-center text-grey-600 hover:text-indigo-600 aria-[current=page]:bg-gray-300 aria-[current=page]:text-indigo-800 dark:text-gray-400 dark:hover:text-indigo-400 dark:aria-[current=page]:bg-slate-700 dark:aria-[current=page]:text-indigo-400"
        >
          <HiOutlineUsers />
          {/* <span className="text-xs">Reviews</span> */}
        </NavLink>
      )}

      <NavLink
        to="/settings"
        className="relative flex flex-1 flex-col items-center text-grey-600 hover:text-indigo-600 aria-[current=page]:bg-gray-300 aria-[current=page]:text-indigo-800 dark:text-gray-400 dark:hover:text-indigo-400 dark:aria-[current=page]:bg-slate-700 dark:aria-[current=page]:text-indigo-400"
      >
        <HiOutlineCog6Tooth />
        {/* <span className="text-xs">Settings</span> */}
      </NavLink>
    </div>
  );
}

export default MobileBottombar;
