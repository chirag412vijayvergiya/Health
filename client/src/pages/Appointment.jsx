import AddNewReview from '../features/appointments/AddNewReview';
import AppointmentDataBox from '../features/appointments/AppointmentDataBox';
import { useAppointment } from '../features/appointments/useAppointment';
import { useMoveBack } from '../hooks/useMoveBack';
import Button from '../ui/Button';
import DefaultSpinner from '../ui/DefaultSpinner';
function Appointment() {
  const moveBack = useMoveBack();
  const { isPending, appointment } = useAppointment();
  console.log(appointment);
  if (isPending) return <DefaultSpinner />;
  if (!appointment) return <div>No Appointment found</div>;
  return (
    <div className="my-[2vh] ml-[0.4rem] mr-[0.4rem] mt-7 flex h-[86vh] flex-col justify-between rounded-xl border-r border-r-grey-200 bg-slate-200 p-4 tracking-wider shadow-md shadow-blue-200 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900 md:m-[2vh] ">
      <div className="items-center justify-between overflow-hidden">
        <div className="flex items-center justify-between">
          <h1 className="m-5 text-lg font-semibold">Appointment 1</h1>

          <button
            className="items-center rounded-md border-2  border-l-0 border-r-0 border-t-0 border-b-indigo-500 text-lg font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
            onClick={moveBack}
          >
            &larr; Back
          </button>
        </div>
        <AppointmentDataBox appointment={appointment} />
        <div className="mt-5 flex justify-end gap-[1.2rem]">
          <Button type="reset" onClick={moveBack}>
            Back
          </Button>
          {/* <Button type="update">
            {appointment.review === 'Yes' ? 'Edit Review' : 'Create Review'}
          </Button> */}

          <AddNewReview doctor={appointment.doctor} />
        </div>
      </div>
    </div>
  );
}

export default Appointment;
