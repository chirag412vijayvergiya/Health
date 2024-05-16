import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import {
  FaBriefcaseMedical,
  FaPersonCane,
  FaUserDoctor,
} from 'react-icons/fa6';
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  return (
    <>
      <Stat
        title="Patients"
        icon={
          <FaPersonCane className="h-[3rem] w-[3rem] text-blue-600 opacity-75" />
        }
        value={45}
      />
      <Stat
        title="Appointments"
        icon={
          <FaBriefcaseMedical className="h-[3rem] w-[3rem] text-blue-600 opacity-75" />
        }
        value={45}
      />
      <Stat
        title="Doctors"
        icon={
          <FaUserDoctor className="h-[3rem] w-[3rem] text-blue-600 opacity-75" />
        }
        value={45}
      />
      <Stat
        title="Emergency"
        icon={
          <HiOutlineBriefcase className="h-[3rem] w-[3rem] text-blue-600 opacity-75" />
        }
        value={45}
      />
    </>
  );
}

export default Stats;
