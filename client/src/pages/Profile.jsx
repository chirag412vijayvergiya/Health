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
    <div className="my-[2vh] ml-[0.4rem] mr-[0.4rem] mt-7 flex flex-col gap-y-3 font-sans tracking-wider md:m-[2vh] md:h-[86vh]">
      <div className="rounded-xl border-r border-r-grey-200 bg-slate-200  shadow-md shadow-blue-100 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900 md:h-3/6">
        <Updateuserdata
          currentFullName={name}
          currentEmail={email}
          currentRole={role}
          currentGender={gender}
          currentPhoto={photo}
        />
      </div>
      <div className="flex h-full flex-col gap-x-3 rounded-xl border-r border-r-grey-200 bg-grey-200 p-2 shadow-blue-100 dark:border-r-grey-800 dark:bg-slate-800 md:h-3/6 md:flex-row">
        <div className="mb-3 w-full rounded-xl border-r border-r-grey-200 p-3 shadow-md shadow-blue-100 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900 md:mb-0 md:w-2/6">
          {role === 'patient' && <InsuranceRelated />}
        </div>

        <div className="w-full rounded-xl border-r border-r-grey-200 p-3 shadow-md shadow-blue-100 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900 md:w-4/6">
          <UpdatePassword />
        </div>
      </div>
    </div>
  );
}

export default Profile;
