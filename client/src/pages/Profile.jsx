import InsuranceRelated from '../features/authentication/Patients/InsuranceRelated';
import UpdatePassword from '../features/authentication/Patients/UpdatePassword';
import Updateuserdata from '../features/authentication/Patients/Updateuserdata';
import { useUser } from '../features/authentication/Patients/useUser';

function Profile() {
  const {
    user: {
      data: {
        data: { name, email, role, gender, photo },
      },
    },
  } = useUser();
  return (
    <div className="m-[2vh] flex h-[86vh] flex-col gap-y-3 font-mono tracking-tighter">
      <div className="h-3/6 rounded-xl border-r border-r-grey-200  bg-slate-200 shadow-md shadow-blue-100 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900">
        <Updateuserdata
          currentFullName={name}
          currentEmail={email}
          currentRole={role}
          currentGender={gender}
          currentPhoto={photo}
        />
      </div>
      <div className="flex h-3/6 flex-row gap-x-3 rounded-xl border-r border-r-grey-200 bg-grey-200 p-2 shadow-blue-100 dark:border-r-grey-800 dark:bg-slate-800">
        <div className="w-2/6 rounded-xl border-r border-r-grey-200 p-3 shadow-md shadow-blue-100 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900">
          {role === 'patient' && <InsuranceRelated />}
        </div>

        <div className="w-4/6 rounded-xl border-r border-r-grey-200 p-3 shadow-md shadow-blue-100 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900">
          <UpdatePassword />
        </div>
      </div>
    </div>
  );
}

export default Profile;
