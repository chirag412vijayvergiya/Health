import { useState } from 'react';
import HeaderMenu from './HeaderMenu';
import Logo from '../Logo';
import HeaderAll from './HeaderAll';
import LoginSignup from './LoginSignup';
import Hero from '../HomePage/Hero';
function Header() {
  //
  const [isLogin, setIsLogin] = useState(false);
  //<header className="border-b-1 border-gray-40 max-w-maxScreen fixed inset-x-0 top-0 z-[1000] flex items-center justify-between gap-10 space-x-6 border-solid bg-gray-50 py-5  shadow-lg shadow-gray-200 dark:bg-slate-900 md:px-4 md:py-3">
  return (
    <div>
      <div className="fixed inset-x-0 top-0 z-[1000] flex min-h-[5.7rem] items-center justify-between border-solid bg-gray-50 shadow-md shadow-gray-200 dark:bg-gray-900  dark:shadow-gray-900   md:min-h-[4.5rem]">
        <Logo />
        <HeaderAll />
        {isLogin ? <HeaderMenu /> : <LoginSignup />}
      </div>
      <Hero className="dark:bg-grey-900" />
      {/* <div className="flex w-full items-center justify-between border-solid bg-gray-50 py-3 shadow-lg shadow-gray-200 dark:bg-slate-900 dark:shadow-slate-900 md:px-4 md:py-3"></div> */}
    </div>
  );
}

export default Header;
