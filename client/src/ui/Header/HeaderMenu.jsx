import { HiOutlineUser } from 'react-icons/hi2';
import ButtonIcon from '../ButtonIcon';
import DarkModeToggle from '../DarkModeToggle';

function HeaderMenu() {
  return (
    <div>
      <ul className="flex h-[45px] list-none items-center">
        <li className="mx-2">
          <ButtonIcon>
            <HiOutlineUser className=" h-[1.3rem] w-[1.3rem] stroke-brand-600" />
          </ButtonIcon>
        </li>
        <li className="mx-2">
          <DarkModeToggle />
        </li>
        <li className="mx-2">
          <ButtonIcon>
            <HiOutlineUser className="h-[1.3rem] w-[1.3rem] stroke-brand-600 " />
          </ButtonIcon>
        </li>
      </ul>
    </div>
  );
}

export default HeaderMenu;
