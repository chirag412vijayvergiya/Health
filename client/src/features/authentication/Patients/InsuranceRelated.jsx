import { useUser } from './useUser';

function InsuranceRelated() {
  const {
    user: {
      data: {
        data: { InsuranceProviderCompany, PolicyNumber },
      },
    },
  } = useUser();
  return (
    <div>
      <h1 className="rounded-md bg-indigo-500 px-1 py-2 text-center text-slate-900 dark:bg-indigo-800 dark:text-grey-100">
        About Insurance
      </h1>

      <div className="flex flex-col gap-y-3 p-2">
        <div className="flex flex-col gap-y-1">
          <label className="font-mono text-lg font-medium text-stone-900 dark:text-stone-300">
            Insurance Company
          </label>
          <div className="relative">
            <input
              type="text"
              defaultValue={InsuranceProviderCompany}
              id="fullName"
              disabled
              className="w-[12.7rem] rounded-sm border border-grey-300 bg-grey-0 p-1 pl-3 font-mono tracking-tighter  shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100"
            />
          </div>
        </div>
        <div className="mb-2 border-t-2 border-grey-400 dark:border-slate-700"></div>
        <div className="flex flex-col gap-y-1">
          <label className="font-mono text-lg font-medium text-stone-900 dark:text-stone-300">
            Policy Number
          </label>
          <div className="relative">
            <input
              type="text"
              defaultValue={PolicyNumber}
              id="fullName"
              disabled
              className="w-[12.7rem] rounded-sm border border-grey-300 bg-grey-0 p-1 pl-3 font-mono tracking-tighter  shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsuranceRelated;
