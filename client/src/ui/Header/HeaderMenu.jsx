import { HiOutlineUser } from 'react-icons/hi2';
import ButtonIcon from '../ButtonIcon';

function HeaderMenu() {
  return (
    <div>
      <ul className="flex gap-2">
        <li>
          <ButtonIcon>
            <HiOutlineUser />
          </ButtonIcon>
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
