import DoctorList from '../features/DoctorPage/DoctorList';
function Doctor() {
  return (
    // <div className="m-[2vh] flex h-[86vh] overflow-scroll rounded-xl border-r border-r-grey-200 bg-slate-200 p-4 tracking-wider shadow-md shadow-blue-200 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900">
    //   <div className="items-center justify-between">
    //     <h1 className="relative m-5 w-full text-lg font-semibold">Doctors</h1>
    //     <DoctorList />
    //   </div>
    // </div>
    <div className="my-[2vh] ml-[0.4rem] mr-[0.4rem] flex h-[86vh] flex-col rounded-xl border-r border-r-grey-200 bg-slate-200 p-4 tracking-wider shadow-md shadow-blue-200 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900 md:m-[2vh]">
      <h1 className="sticky top-0  m-2 w-full bg-slate-200 text-lg font-semibold dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900">
        Doctors
      </h1>
      <div className="mt-2 flex-1 overflow-scroll">
        <DoctorList />
      </div>
    </div>
  );
}

export default Doctor;
