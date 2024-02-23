import { HiOutlineUser } from 'react-icons/hi2';
import HeaderMenu from './HeaderMenu';
function Header() {
  return (
    <div>
      <header className="border-b-1 border-gray-40 bg-gray-40 flex items-center justify-end gap-10 border-solid py-5 md:px-4 md:py-7">
        <HeaderMenu />
      </header>
    </div>
  );
}

export default Header;
