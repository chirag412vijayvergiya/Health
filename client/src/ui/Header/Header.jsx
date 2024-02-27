import { useState } from 'react';
import HeaderMenu from './HeaderLoginMenu';
import Logo from '../Logo';
function Header() {
  const [isLogin, serIsLogin] = useState(true);
  return (
    <div>
      <header className="border-b-1 border-gray-40 bg-gray-40 dark:bg-grey-500 fixed inset-x-0 top-0 z-[1000] flex items-center justify-end gap-10 space-x-6 border-solid py-5 shadow-lg shadow-gray-200 md:px-4 md:py-5">
        <Logo />
        {isLogin && <HeaderMenu />}
      </header>
    </div>
  );
}

export default Header;
