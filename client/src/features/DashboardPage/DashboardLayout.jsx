import Stats from './Stats';
import { useGetDoctorsCount } from './useGetDoctorsCount';
import DefaultSpinner from '../../ui/DefaultSpinner';
import { useGetAllAppointments } from './useGetAllAppointments';
import { useGetPatientsCount } from './useGetPatientsCount';
import AgeChart from './AgeChart';
import AppointmentsChart from './AppointmentsChart';

function DashboardLayout() {
  const { isPending: isPending1, DoctorsCount } = useGetDoctorsCount();
  const { isPending: isPending2, GetAppointments } = useGetAllAppointments();
  const { isPending: isPending3, PatientsCount } = useGetPatientsCount();
  if (isPending1 || isPending2 || isPending3) return <DefaultSpinner />;

  return (
    <div className="md:grid-rows-auto mt-3 flex flex-col gap-4 p-3 md:grid md:grid-cols-2 md:p-0 lg:grid-cols-[0.8fr_1.6fr_0.8fr_0.8fr]">
      <Stats
        doctors={DoctorsCount?.data}
        appointments={GetAppointments?.result}
        patients={PatientsCount?.size}
        cabinCount={34}
      />
      <div className="md:col-span-2">
        <AgeChart Ages={PatientsCount?.data} />
      </div>
      <div className="md:col-span-2">
        <AgeChart Ages={PatientsCount?.data} />
      </div>
      <div className="md:col-span-4">
        {/* <AgeChart Ages={PatientsCount.data} /> */}
        <AppointmentsChart />
      </div>
    </div>
  );
}

export default DashboardLayout;
