import AppointmentTable from '../features/appointments/AppointmentTable';
import AppointmentsOperations from '../features/appointments/AppointmentsOperations';

function Appointments() {
  return (
    <div className="my-[2vh] ml-[0.4rem] mr-[0.4rem] mt-7 flex h-[86vh] flex-col justify-between rounded-xl border-r border-r-grey-200 bg-slate-200 p-4 tracking-wider shadow-md shadow-blue-200 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900 md:m-[2vh] ">
      <div className="items-center justify-between overflow-hidden">
        <div className="mb-7 flex flex-col items-center justify-between md:flex-row">
          <h1 className="m-5 text-lg font-semibold">All Appointments</h1>
          <AppointmentsOperations />
        </div>
        <AppointmentTable />
      </div>
    </div>
  );
}

export default Appointments;
