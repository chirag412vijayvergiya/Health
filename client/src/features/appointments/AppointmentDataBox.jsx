import { format } from 'date-fns';
import { IoCalendar } from 'react-icons/io5';
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';
import { capitalizeFirstLetter } from '../../utils/helpers';

function AppointmentDataBox({ appointment }) {
  return (
    <div className="mt-[3vh] overflow-hidden rounded-xl border-[1px] border-solid border-grey-200 bg-grey-100 dark:border-slate-800 dark:bg-slate-900">
      <header className="flex items-center justify-between bg-indigo-500 p-[1rem_2rem] text-2xl font-medium text-slate-300 ">
        <div className="flex items-center  gap-6 text-2xl font-semibold">
          <IoCalendar />
          <p>
            <span className="pr-4 text-lg uppercase">Disease</span>
            <span className="text-base text-red-900">
              "{capitalizeFirstLetter(appointment.disease)}"
            </span>
          </p>
        </div>
        <p className="font-sans text-lg font-semibold tracking-wider">
          {format(
            new Date(`${appointment.appointmentDate}`),
            'EEE, MMM dd yyyy, p',
          )}
        </p>
      </header>
      <section className="pb-[1rem] pl-[3rem] pr-[3rem] pt-[1.2rem]">
        <div className="flex flex-row justify-between">
          <div className="mb-6 flex flex-col items-center gap-[0.2rem] text-grey-600 dark:text-slate-200">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/users/${appointment.doctor.photo}`}
              alt="avatar"
              className="aspect-square items-center rounded-full border object-cover md:mx-0"
              height="36"
              width="36"
            ></img>
            <h6 className="font-bold uppercase tracking-wider text-indigo-600 dark:text-blue-500">
              Doctor
            </h6>

            <p className="text-base font-semibold tracking-wider text-slate-600 dark:text-slate-300">
              {appointment.doctor.name}
            </p>

            {/* <span className="pt-[0.1rem]">&bull;</span> */}
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {appointment.doctor.email}
            </p>
          </div>
          <div className="mb-6 flex flex-col items-center gap-[0.2rem] text-grey-600">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/users/${appointment.patient.photo}`}
              alt="avatar"
              className="aspect-square items-center rounded-full border object-cover md:mx-0"
              height="36"
              width="36"
            ></img>
            <h6 className="font-bold uppercase tracking-wider text-indigo-600 dark:text-blue-500">
              Patient
            </h6>

            <p className="text-base font-semibold tracking-wider text-slate-600 dark:text-slate-300">
              {appointment.patient.name}
            </p>

            {/* <span className="pt-[0.1rem]">&bull;</span> */}
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {appointment.patient.email}
            </p>
          </div>
        </div>
        <div className=" flex items-center justify-between rounded-sm bg-green-200 p-[1rem_2rem] text-green-700 dark:bg-green-600 dark:text-green-100">
          <div className="flex items-center gap-6 p-[0_0.8rem] ">
            <span className="flex items-center gap-[1rem] text-lg ">
              <HiOutlineCurrencyRupee
                style={{ width: '1.7rem', height: '1.7rem' }}
              />
              <span>Fees</span>
            </span>
            <span className="">&#x20B9; {appointment.doctor.fees}.00</span>
          </div>
          <p className="text-base font-semibold uppercase">
            {appointment.status}
          </p>
        </div>
      </section>
      <footer className="p-[0.8rem_3rem] text-right text-xs text-grey-500">
        <p>
          Booked{' '}
          {format(
            new Date(`${appointment.bookingDate}`),
            'EEE, MMM dd yyyy, p',
          )}
        </p>
      </footer>
    </div>
  );
}

export default AppointmentDataBox;
