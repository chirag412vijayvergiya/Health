import DarkModeToggle from '../DarkModeToggle';

function LoginSignup() {
  return (
    <div>
      <ul className="mr-3 flex h-[45px] list-none items-center dark:text-white">
        <li className="mx-2">
          <DarkModeToggle />
        </li>
        <li className="mx-2">
          <a href="#">
            <button className="p-small flex items-center justify-center rounded-full bg-indigo-400  px-6 py-2 font-medium  text-grey-50 dark:bg-indigo-500 ">
              Login
            </button>
          </a>
        </li>
        <li className="mx-2">
          <a href="#">
            <button className="p-small flex items-center justify-center rounded-full  bg-slate-800 px-6 py-2 font-medium  text-grey-50 dark:bg-grey-200 dark:text-slate-800 ">
              Sign up
            </button>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default LoginSignup;
