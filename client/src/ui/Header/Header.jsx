import { useState } from 'react';
import HeaderMenu from './HeaderLoginMenu';
import Logo from '../Logo';
function Header() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      <header className="border-b-1 border-gray-40 max-w-maxScreen fixed inset-x-0 top-0 z-[1000] flex items-center justify-between gap-10 space-x-6 border-solid bg-gray-50 py-5  shadow-lg shadow-gray-200 dark:bg-slate-800 md:px-4 md:py-3">
        <Logo />
        {isLogin && <HeaderMenu />}
      </header>
    </div>
  );
}

export default Header;
