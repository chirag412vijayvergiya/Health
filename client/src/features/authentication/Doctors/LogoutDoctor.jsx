import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../../ui/DarkModeIcon';

function LogoutDoctor() {
  return (
    <ButtonIcon>
      <HiArrowRightOnRectangle className="h-[1.7rem] w-[1.7rem] stroke-1 text-red-500" />
    </ButtonIcon>
  );
}

export default LogoutDoctor;
