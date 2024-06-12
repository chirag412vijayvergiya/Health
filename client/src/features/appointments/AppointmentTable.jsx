import TableHeader from './TableHeader';
import { useAppointments } from './useAppointments';
import DefaultSpinner from './../../ui/DefaultSpinner';
import Empty from '../../ui/Empty';
import AppointmentRow from './AppointmentRow';
import Menus from '../../ui/Menus';
import AppointmentTableFooter from './AppointmentTableFooter';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

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
  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));
  const { isLoading, appointments, error, count } = useAppointments();
  if (isLoading) return <DefaultSpinner />;

  if (!appointments?.length) return <Empty resourceName="Appointment" />;
  return (
    <Menus>
      <div className=" mt-6 flex flex-col font-mono">
        <div className="my-2 overflow-x-auto  rounded-sm border-b  border-grey-100 shadow-2xl  shadow-slate-200 dark:border-gray-600 dark:shadow-slate-800 sm:mx-3 lg:mx-4">
          <div className="inline-block min-w-full align-middle ">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-grey-300 dark:bg-slate-900">
                  <tr>
                    {headerContent.map((content) => (
                      <TableHeader key={content} heading={content} />
                    ))}
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-400 bg-grey-0 text-slate-600 dark:bg-slate-800 dark:text-grey-100">
                  {appointments.map((content, index) => (
                    <AppointmentRow
                      key={content._id}
                      index={index + (currentPage - 1) * PAGE_SIZE + 1}
                      // index={index + 1}
                      elements={content}
                    />
                  ))}
                </tbody>
              </table>
              <AppointmentTableFooter count={count} />
            </div>
          </div>
        </div>
      </div>
    </Menus>
  );
}

export default AppointmentTable;

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
