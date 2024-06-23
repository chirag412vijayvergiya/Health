import { useState } from 'react';
import DefaultSpinner from '../../ui/DefaultSpinner';
import Userprofile from './Userprofile';
import { usePatients } from './usePatients';

function PatientSideDrawer({ onUserClick }) {
  const { isPending, patients } = usePatients();

  if (isPending) return <DefaultSpinner />;

  return (
    <div className="sticky top-0 m-0 mt-0 h-[74vh] w-full flex-col overflow-y-scroll rounded-xl border border-gray-200 bg-gray-300 font-mono dark:border-gray-800 dark:bg-slate-900 sm:w-4/12 lg:flex">
      <div className="rounded-md p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
        <div className="mb-0 flex flex-col items-center justify-between">
          {patients.map((patient) => (
            <Userprofile user={patient} onUserClick={onUserClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientSideDrawer;
