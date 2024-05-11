import Button from './Button';

function UpdatePassword() {
  return (
    <div>
      <h1 className="mx-[22vh] rounded-md bg-indigo-500 px-1 py-2 text-center text-slate-900 dark:bg-indigo-800 dark:text-grey-100">
        Update Password
      </h1>
      <div className="flex flex-col gap-y-3 p-2">
        <div className="flex flex-col gap-y-1">
          <label className="font-mono text-lg font-medium text-stone-900 dark:text-stone-300">
            Current Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="currentPassword"
              disabled={false}
              className="w-[12.7rem] rounded-sm border border-grey-300 bg-grey-0 p-1 pl-3 font-mono tracking-tighter  shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100"
            />
          </div>
        </div>
        <div className="flex gap-6 ">
          <div className="flex flex-col gap-y-1">
            <label className="font-mono text-lg font-medium text-stone-900 dark:text-stone-300">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="newPassword"
                disabled={false}
                className="w-[12.7rem] rounded-sm border border-grey-300 bg-grey-0 p-1 pl-3 font-mono tracking-tighter  shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="font-mono text-lg font-medium text-stone-900 dark:text-stone-300">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                disabled={false}
                className="w-[12.7rem] rounded-sm border border-grey-300 bg-grey-0 p-1 pl-3 font-mono tracking-tighter  shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100"
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
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
