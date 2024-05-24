import { BsThreeDotsVertical } from 'react-icons/bs';
import { formatDate } from '../../utils/helpers';
import Menus from '../../ui/Menus';
import { HiSquare2Stack } from 'react-icons/hi2';

function AppointmentRow({ index, elements }) {
  return (
    <tr>
      <td className="whitespace-nowrap px-5 py-4">{index}</td>
      <td className="whitespace-nowrap px-5 py-4">{elements.patient.name}</td>
      <td className="whitespace-nowrap px-5 py-4">{elements.doctor.name}</td>
      <td className="whitespace-nowrap px-5 py-4">{elements.disease}</td>
      <td className="whitespace-nowrap px-5 py-4">{elements.doctor.fees}</td>
      <td className="whitespace-nowrap px-5 py-4">{elements.status}</td>
      <td className="whitespace-nowrap px-5 py-4">
        {formatDate(elements.appointmentDate)}
      </td>
      <td className="whitespace-nowrap px-6 py-2">
        <Menus>
          <div>
            <Menus.Toggle
              id={elements._id}
              icon={BsThreeDotsVertical}
              className="outline-2px h-9 w-9 cursor-pointer rounded border-none bg-transparent p-2.5 transition duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-slate-900"
            />
            <Menus.List id={elements._id} positionX={2} positionY={-13}>
              <Menus.Button icon={<HiSquare2Stack />} disabled>
                Duplicate
              </Menus.Button>
            </Menus.List>
          </div>
        </Menus>
      </td>
    </tr>
  );
}

export default AppointmentRow;
