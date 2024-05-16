import TableHeader from './TableHeader';
import { BsThreeDotsVertical } from 'react-icons/bs';

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
  return (
    <div className="flex flex-col ">
      <div className="my-2 overflow-x-auto sm:mx-3 lg:mx-4">
        <div className="inline-block w-full p-1.5 align-middle">
          <div className="overflow-hidden border-b border-gray-600 shadow shadow-slate-700 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-700 ">
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
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">1</td>
                  <td className="whitespace-nowrap px-6 py-4">John Doe</td>
                  <td className="whitespace-nowrap px-6 py-4">Dr. Jane Doe</td>
                  <td className="whitespace-nowrap px-6 py-4">Fever</td>
                  <td className="whitespace-nowrap px-6 py-4">Paid</td>
                  <td className="whitespace-nowrap px-6 py-4">Pending</td>
                  <td className="whitespace-nowrap px-6 py-4">12/12/2021</td>
                  <td className="whitespace-nowrap px-6 py-2">
                    <div
                      className="outline-2px h-9 w-9 cursor-pointer rounded border-none
           bg-transparent p-2.5 transition  duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-slate-900"
                    >
                      <BsThreeDotsVertical />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">2</td>
                  <td className="whitespace-nowrap px-6 py-4">John Doe</td>
                  <td className="whitespace-nowrap px-6 py-4">Dr. Jane Doe</td>
                  <td className="whitespace-nowrap px-6 py-4">Fever</td>
                  <td className="whitespace-nowrap px-6 py-4">Paid</td>
                  <td className="whitespace-nowrap px-6 py-4">Pending</td>
                  <td className="whitespace-nowrap px-6 py-4">12/12/2021</td>
                  <td className="whitespace-nowrap px-6 py-2">
                    <div
                      className="outline-2px h-9 w-9 cursor-pointer rounded border-none
           bg-transparent p-2.5 transition  duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-slate-900"
                    >
                      <BsThreeDotsVertical />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">3</td>
                  <td className="whitespace-nowrap px-6 py-4">John Doe</td>
                  <td className="whitespace-nowrap px-6 py-4">Dr. Jane Doe</td>
                  <td className="whitespace-nowrap px-6 py-4">Fever</td>
                  <td className="whitespace-nowrap px-6 py-4">Paid</td>
                  <td className="whitespace-nowrap px-6 py-4">Pending</td>
                  <td className="whitespace-nowrap px-6 py-4">12/12/2021</td>
                  <td className="whitespace-nowrap px-6 py-2">
                    <div
                      className="outline-2px h-9 w-9 cursor-pointer rounded border-none
           bg-transparent p-2.5 transition  duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-slate-900"
                    >
                      <BsThreeDotsVertical />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentTable;
