import { useState } from 'react';
import HeaderMenu from './HeaderMenu';
import Logo from '../Logo';
import HeaderAll from './HeaderAll';
import LoginSignup from './LoginSignup';
import Hero from '../HomePage/Hero';
function Header() {
  const [isLogin, setIsLogin] = useState(false);
  //<header className="border-b-1 border-gray-40 max-w-maxScreen fixed inset-x-0 top-0 z-[1000] flex items-center justify-between gap-10 space-x-6 border-solid bg-gray-50 py-5  shadow-lg shadow-gray-200 dark:bg-slate-900 md:px-4 md:py-3">
  return (
    <header className="flex h-[100vh] flex-col items-center p-0">
      <div className="border-gray-40 border-b-1 fixed z-[100] flex h-[4.5rem] w-full items-center justify-between border-solid bg-gray-50 px-[3rem] shadow-md shadow-gray-200 dark:bg-slate-900 dark:shadow-gray-900 ">
        <Logo />
        <HeaderAll />
        {isLogin ? <HeaderMenu /> : <LoginSignup />}
      </div>
      <Hero />
      {/* <div className="flex w-full items-center justify-between border-solid bg-gray-50 py-3 shadow-lg shadow-gray-200 dark:bg-slate-900 dark:shadow-slate-900 md:px-4 md:py-3"></div> */}
    </header>
  );
}

export default Header;
