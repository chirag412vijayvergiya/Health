import Button from './Button';
import { useUser } from './../features/authentication/Patients/useUser';

function Updateuserdata() {
  const { user } = useUser();
  console.log(user);
  return (
    user && (
      <form className="m-8 flex ">
        <div className="h-10 w-1/3">
          <span className="relative my-6 ml-10 flex shrink-0 overflow-hidden rounded-full hover:brightness-90">
            <img
              src={user.data.data.photo}
              alt={`Avatar of ${user.data.data.name}`}
              className=" aspect-square  rounded-full border object-cover"
              height="115"
              width="115"
            />
          </span>
          <input
            type="file"
            accept="image/*"
            className="mt-2 w-[12.9rem] cursor-pointer rounded-sm bg-brand-600 px-2 py-2 font-mono text-sm tracking-tighter text-brand-50 transition duration-200 hover:bg-brand-700"
          />
        </div>
        <div className="flex w-2/3 flex-col gap-y-3">
          <div className="flex gap-6 ">
            <div className="flex flex-1 flex-col gap-1">
              <label className="font-mono text-lg font-medium text-stone-900 dark:text-stone-300">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={user.data.data.name}
                  id="fullName"
                  disabled={false}
                  className="w-[12.7rem] rounded-sm border border-grey-300 bg-grey-0 p-2 pl-3 font-mono tracking-tighter  shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label className="font-mono text-lg font-medium text-stone-900 dark:text-stone-300">
                Email
              </label>
              <div className="">
                <input
                  type="text"
                  value={user.data.data.email}
                  disabled
                  className="w-[12.7rem] rounded-sm border border-grey-300 bg-grey-0 p-2 pl-3 font-mono tracking-tighter  opacity-50 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-1 flex-col gap-1">
              <label className="font-mono text-lg font-medium text-stone-900 dark:text-stone-300">
                Role
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={user.data.data.role}
                  id="fullName"
                  disabled
                  className="w-[12.7rem] rounded-sm border border-grey-300 bg-grey-0 p-2 pl-3 font-mono tracking-tighter  opacity-50 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label className="font-mono text-lg font-medium text-stone-900 dark:text-stone-300">
                Gender
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={user.data.data.gender}
                  id="fullName"
                  disabled={false}
                  className="w-[12.7rem] rounded-sm border border-grey-300 bg-grey-0 p-2 pl-3 font-mono tracking-tighter  shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 "
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-5">
            <Button
              type="reset"
              variation="secondary"
              disabled="false"
              className=""
            >
              Cancel
            </Button>
            <Button disabled="false" type="update">
              Update account
            </Button>
          </div>
        </div>
      </form>
    )
  );
}

export default Updateuserdata;
