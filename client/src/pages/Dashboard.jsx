// import AppointmentC from '../features/DashboardPage/AppointmentC';
// import DoctorC from '../features/DashboardPage/DoctorC';
// import PatientC from '../features/DashboardPage/PatientC';
// import EmergencyC from '../features/DashboardPage/EmergencyC';
import DashboardLayout from '../features/DashboardPage/DashboardLayout';
// import AppointmentsOperations from '../features/appointments/AppointmentsOperations';

function Dashboard() {
  return (
    <div className="m-[2vh] flex h-[86vh] rounded-xl border-r border-r-grey-200 bg-slate-200 p-4 tracking-wider shadow-md shadow-blue-200 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900 md:mx-[2vh]">
      <div className="items-center justify-between">
        <div className="flex items-center justify-between">
          <h1 className="m-5 text-lg font-semibold">Dashboard</h1>
        </div>
        <DashboardLayout />
      </div>
    </div>
  );
}

export default Dashboard;
