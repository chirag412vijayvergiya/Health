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
import { IoChatboxEllipses } from 'react-icons/io5';

function MobileBottombar() {
  const {
    user: {
      data: {
        data: { role: currentRole },
      },
    },
  } = useUser();
  return (
    <div className="mx-auto flex w-11/12 max-w-lg items-center justify-between py-3">
      <NavLink
        to="/dashboard"
        className="relative flex flex-1 flex-col items-center text-grey-800  aria-[current=page]:text-indigo-500 dark:text-gray-400  dark:aria-[current=page]:text-indigo-400"
      >
        <MdSpaceDashboard size={22} />

        {/* <span className="text-xs font-thin tracking-tight">Dashboard</span> */}
      </NavLink>
      <NavLink
        to="/appointments"
        className="relative flex flex-1 flex-col items-center text-grey-800  aria-[current=page]:text-indigo-500 dark:text-gray-400  dark:aria-[current=page]:text-indigo-400"
      >
        <GiTechnoHeart size={22} />
        {/* <span className="text-xs font-thin tracking-tighter">Appointments</span> */}
      </NavLink>
      <NavLink
        to="/chat"
        className="relative flex flex-1 flex-col items-center text-grey-800  aria-[current=page]:text-indigo-500 dark:text-gray-400  dark:aria-[current=page]:text-indigo-400"
      >
        <IoChatboxEllipses size={22} />
      </NavLink>
      <NavLink
        to="/patients"
        className="relative flex flex-1 flex-col items-center text-grey-800  aria-[current=page]:text-indigo-500 dark:text-gray-400  dark:aria-[current=page]:text-indigo-400"
      >
        <FaPersonCane size={22} />
        {/* <span className="text-xs font-thin tracking-tighter">Patients</span> */}
      </NavLink>

      <NavLink
        to="/doctors"
        className="relative flex flex-1 flex-col items-center text-grey-800  aria-[current=page]:text-indigo-500 dark:text-gray-400  dark:aria-[current=page]:text-indigo-400"
      >
        <FaUserDoctor size={22} />
        {/* <span className="text-xs font-thin tracking-tighter">Doctors</span> */}
      </NavLink>

      <NavLink
        to="/payments"
        className="relative flex flex-1 flex-col items-center text-grey-800  aria-[current=page]:text-indigo-500 dark:text-gray-400  dark:aria-[current=page]:text-indigo-400"
      >
        <MdOutlinePayments size={22} />
      </NavLink>

      {currentRole === 'patient' && (
        <NavLink
          to="/reviews"
          className="relative flex flex-1 flex-col items-center text-grey-800  aria-[current=page]:text-indigo-500 dark:text-gray-400  dark:aria-[current=page]:text-indigo-400"
        >
          <HiOutlineUsers size={22} />
        </NavLink>
      )}

      <NavLink
        to="/settings"
        className="relative flex flex-1 flex-col items-center text-grey-800  aria-[current=page]:text-indigo-500 dark:text-gray-400  dark:aria-[current=page]:text-indigo-400"
      >
        <HiOutlineCog6Tooth size={22} />
        {/* <span className="text-xs font-thin tracking-tighter">Settings</span> */}
      </NavLink>
    </div>
  );
}

export default MobileBottombar;
