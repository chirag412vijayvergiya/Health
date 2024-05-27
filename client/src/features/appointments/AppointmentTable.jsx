import TableHeader from './TableHeader';
import { useAppointments } from './useAppointments';
import DefaultSpinner from './../../ui/DefaultSpinner';
import Empty from '../../ui/Empty';
import AppointmentRow from './AppointmentRow';

const headerContent = [
  'No.',
  'Patient',
  'Doctor',
  'Disease',
  'Payment',
  'Status',
  'Date',
];
function AppointmentTable() {
  const { isLoading, appointments, error } = useAppointments();
  if (isLoading) return <DefaultSpinner />;

  if (!appointments?.length) return <Empty resourceName="Appointment" />;
  return (
    // <div className="flex flex-col ">
    //   <div className="my-2 overflow-x-auto sm:mx-3 lg:mx-4">
    //     <div className="inline-block w-full p-1.5 align-middle">
    //       <div className="overflow-hidden border-b border-gray-600 shadow shadow-slate-700 sm:rounded-lg">
    //         <table className="min-w-full divide-y divide-gray-200">
    //           <thead className="bg-indigo-700 ">
    //             <tr>
    //               {headerContent.map((content) => (
    //                 <TableHeader key={content} heading={content} />
    //               ))}
    //               <th scope="col" className="relative px-6 py-3">
    //                 <span className="sr-only">Edit</span>
    //               </th>
    //             </tr>
    //           </thead>
    //           <tbody className="divide-y divide-gray-400 bg-grey-200 text-slate-600 dark:bg-slate-800 dark:text-grey-100">
    //             {appointments.map((content, index) => (
    //               <AppointmentRow
    //                 key={content._id}
    //                 index={index + 1}
    //                 elements={content}
    //               />
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col">
      <div className="my-2 overflow-x-auto sm:mx-3 lg:mx-4">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border-b border-gray-600 shadow shadow-slate-700 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-700">
                <tr>
                  {headerContent.map((content) => (
                    <TableHeader key={content} heading={content} />
                  ))}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-400 bg-grey-200 text-slate-600 dark:bg-slate-800 dark:text-grey-100">
                {appointments.map((content, index) => (
                  <AppointmentRow
                    key={content._id}
                    index={index + 1}
                    elements={content}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentTable;
