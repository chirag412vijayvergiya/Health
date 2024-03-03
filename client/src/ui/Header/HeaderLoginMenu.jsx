import { HiOutlineUser } from 'react-icons/hi2';
import ButtonIcon from '../ButtonIcon';
import DarkModeToggle from '../DarkModeToggle';

function HeaderMenu() {
  return (
    <div>
      <ul className="flex h-[45px] w-[95%] items-center gap-2">
        <li>
          <ButtonIcon>
            <HiOutlineUser className=" h-[1.3rem] w-[1.3rem] stroke-brand-600" />
          </ButtonIcon>
        </li>
        <li>
          <DarkModeToggle />
        </li>
        <li>
          <ButtonIcon>
            <HiOutlineUser className="h-[1.3rem] w-[1.3rem] stroke-brand-600 " />
          </ButtonIcon>
        </li>
      </ul>
    </div>
  );
}

export default HeaderMenu;
