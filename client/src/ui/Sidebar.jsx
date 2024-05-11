import Button from './Button';
import { MdSpaceDashboard } from 'react-icons/md';
import { GiTechnoHeart } from 'react-icons/gi';
import { FaUserDoctor } from 'react-icons/fa6';
import { FaPersonCane } from 'react-icons/fa6';
import { MdOutlinePayments } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi2';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sticky m-[2vh] hidden h-[86vh] flex-col rounded-xl border-r border-r-grey-200 bg-gray-200 dark:border-r-grey-800 dark:bg-slate-800 lg:flex">
      <div className="mb-20 mt-6 space-y-6 border-b border-b-grey-100 pb-8 dark:border-b-grey-800">
        <h1 className="ml-[2vw] font-semibold uppercase text-grey-500">
          medicine
        </h1>
        <div className="ml-[4vw] mt-3 flex max-w-max flex-col space-y-5 pb-12 pr-8">
          <NavLink
            to="/dashboard"
            className="text-grey-600 hover:text-indigo-600 aria-[current=page]:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 dark:aria-[current=page]:text-indigo-400 "
          >
            <Button type="sidebar">
              <MdSpaceDashboard />
              <span>Dashboard</span>
            </Button>
          </NavLink>
          <NavLink
            to="/appointments"
            className="text-grey-600 hover:text-indigo-600 aria-[current=page]:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 dark:aria-[current=page]:text-indigo-400 "
          >
            <Button type="sidebar">
              <GiTechnoHeart />
              <span>Appointments</span>
            </Button>
          </NavLink>

          <NavLink
            to="/patients"
            className="text-grey-600 hover:text-indigo-600 aria-[current=page]:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 dark:aria-[current=page]:text-indigo-400 "
          >
            <Button type="sidebar">
              <FaPersonCane />
              <span>Patients</span>
            </Button>
          </NavLink>

          <NavLink
            to="/doctors"
            className="text-grey-600 hover:text-indigo-600 aria-[current=page]:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 dark:aria-[current=page]:text-indigo-400 "
          >
            <Button type="sidebar">
              <FaUserDoctor />
              <span>Doctors</span>
            </Button>
          </NavLink>

          <NavLink
            to="/payments"
            className="text-grey-600 hover:text-indigo-600 aria-[current=page]:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 dark:aria-[current=page]:text-indigo-400 "
          >
            <Button type="sidebar">
              <MdOutlinePayments />
              <span>Payments</span>
            </Button>
          </NavLink>

          <NavLink
            to="/reviews"
            className="text-grey-600 hover:text-indigo-600 aria-[current=page]:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 dark:aria-[current=page]:text-indigo-400 "
          >
            <Button type="sidebar">
              <HiOutlineUsers />
              <span>Reviews</span>
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="mt-19 ml-[4vw] flex max-w-max flex-col space-y-5 pr-8 pt-5">
        <NavLink
          to="/settings"
          className="text-grey-600 hover:text-indigo-600 aria-[current=page]:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 dark:aria-[current=page]:text-indigo-400 "
        >
          <Button type="sidebar">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </Button>
        </NavLink>

        <Button type="sidebar">
          <HiArrowRightOnRectangle className="h-5 w-5 text-red-500" />
          <span className="font-semibold text-red-500">Logout</span>
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
