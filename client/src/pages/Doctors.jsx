import DoctorList from '../features/DoctorPage/DoctorList';
import SEO from '../ui/SEO';
function Doctor() {
  return (
    <>
      <SEO
        title="Doctors"
        description="This is the doctors page of the website."
        keywords="doctors, page, keywords"
        author="Chirag Vijayvergiya"
      />
      <div className="my-[2vh] ml-[0.4rem] mr-[0.4rem] mt-7 flex h-[86vh] flex-col rounded-xl border-r border-r-grey-200 bg-slate-200 p-4 tracking-wider shadow-md shadow-blue-200 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900 md:m-[2vh]">
        <h1 className="sticky top-0  m-2 w-full bg-slate-200 text-lg font-semibold dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900">
          Doctors
        </h1>
        <div className="mt-2 flex-1 overflow-scroll">
          <DoctorList />
        </div>
      </div>
    </>
  );
}

export default Doctor;
