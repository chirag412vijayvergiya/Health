import { HiOutlineUser } from 'react-icons/hi2';
import ButtonIcon from '../ButtonIcon';
import DarkModeToggle from '../DarkModeToggle';

function HeaderMenu() {
  return (
    <div>
      <ul className="flex items-center gap-2">
        <li>
          <ButtonIcon>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li>
          <DarkModeToggle />
        </li>
        <li>
          <ButtonIcon>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
      </ul>
    </div>
  );
}

export default HeaderMenu;
