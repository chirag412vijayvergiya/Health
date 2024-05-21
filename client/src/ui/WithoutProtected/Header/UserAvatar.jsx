import { IoIosArrowDown } from 'react-icons/io';
import { FaUser } from 'react-icons/fa6';
import Menus from '../../Menus';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { MdSpaceDashboard } from 'react-icons/md';

function UserAvatar({ name, photo }) {
  const navigate = useNavigate();
  function handleNavigation(route) {
    console.log(route);
    navigate(route);
  }
  return (
    <div className="font-rubik items-center gap-x-4 lg:flex">
      <Menus>
        <div className="flex items-center gap-x-1">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/users/${photo}`}
            loading="lazy"
            width="35"
            height="35"
            alt="user"
            className="rounded-full bg-transparent"
          />
          <Menus.Toggle id="profile" />
        </div>
        <Menus.List id="profile" className="z-20">
          <Menus.Button
            icon={<FaUser />}
            onClick={() => handleNavigation('/account')}
          >
            {name}
          </Menus.Button>
          <Menus.Button
            icon={<MdSpaceDashboard />}
            onClick={() => handleNavigation('/dashboard')}
          >
            Dashboard
          </Menus.Button>
        </Menus.List>
      </Menus>
    </div>
  );
}

export default UserAvatar;
