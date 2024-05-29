import React from 'react';

function Stat({ icon, title, value, color }) {
  return (
    <div className="grid w-[18rem] grid-cols-[auto,1fr] grid-rows-[auto,auto] gap-x-[1.6rem] gap-y-[0.4rem] rounded-md border border-gray-100 bg-gray-50 px-10 py-3 shadow-2xl shadow-indigo-200 dark:border-slate-900 dark:bg-slate-900 dark:shadow-slate-900 md:w-full md:px-6">
      <div className="row-span-full mr-2 flex aspect-1 items-center  justify-center rounded-full  pt-2 text-3xl dark:text-gray-300">
        {icon}
      </div>

      <div className="ml-2 mt-2 flex flex-col">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-grey-100 ">
          {title}
        </p>
        <p className="text-base font-medium text-blue-600">{value}</p>
      </div>
    </div>
  );
}

export default Stat;
