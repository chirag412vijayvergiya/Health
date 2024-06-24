import DefaultSpinner from '../../ui/DefaultSpinner';
import { useDoctors } from '../DoctorPage/useDoctors';
import Userprofile from './Userprofile';

function DoctorsSideDrawer({ onUserClick }) {
  const { isPending, doctors } = useDoctors();

  if (isPending) return <DefaultSpinner />;

  return (
    <div className="sticky top-0 m-1 mt-0 h-[74vh] w-full flex-col overflow-y-scroll rounded-xl border border-gray-200 bg-gray-300 font-mono dark:border-gray-800 dark:bg-slate-900 sm:w-4/12 lg:flex">
      <div className="rounded-md p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
        <div className="mb-0 flex flex-col items-center justify-between">
          {doctors.map((doctor) => (
            <Userprofile
              key={doctor._id}
              user={doctor}
              onUserClick={onUserClick}
              // setSelectedChat={setSelectedChat} // Uncomment and use if needed
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorsSideDrawer;
