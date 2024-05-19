import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { usePatientLogout } from './usePatientLogout';
import ButtonIcon from '../../../ui/DarkModeIcon';
import DefaultSpinner from '../../../ui/DefaultSpinner';

function LogoutPatient() {
  const { logout, isPending } = usePatientLogout();
  return (
    <ButtonIcon disabled={isPending} onClick={logout}>
      {!isPending ? (
        <HiArrowRightOnRectangle className="h-[1.7rem] w-[1.7rem] stroke-1 text-red-500" />
      ) : (
        <DefaultSpinner />
      )}
    </ButtonIcon>
  );
}

export default LogoutPatient;
