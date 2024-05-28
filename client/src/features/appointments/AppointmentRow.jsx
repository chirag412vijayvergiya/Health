import { BsThreeDotsVertical } from 'react-icons/bs';
import { formatDate } from '../../utils/helpers';
import Menus from '../../ui/Menus';
import { HiEye, HiPencil, HiSquare2Stack } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import { useNavigate } from 'react-router-dom';
import CreateReviewForm from './CreateReviewForm';

function AppointmentRow({ index, elements }) {
  const navigate = useNavigate();
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
        <Modal>
          <Menus>
            <Menus.Toggle
              id={elements._id}
              icon={BsThreeDotsVertical}
              className="outline-2px h-9 w-9 cursor-pointer rounded border-none bg-transparent p-2.5 transition duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-slate-900"
            />
            <Menus.List id={elements._id} positionX={2} positionY={-13}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/appointments/${elements._id}`)}
              >
                See Details
              </Menus.Button>
            </Menus.List>
          </Menus>
        </Modal>
      </td>
    </tr>
  );
}

export default AppointmentRow;
