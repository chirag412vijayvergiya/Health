import { Link } from 'react-router-dom';
import Button from '../Button';
import DarkModeToggle from '../DarkModeToggle';
import HeaderMobile from './HeaderMobile';
import Header from './Header';

function LoginSignup() {
  return (
    <div>
      <ul className="mr-3 flex h-[45px] list-none items-center dark:text-white">
        <li className="mx-2">
          <DarkModeToggle />
        </li>
        <li className="mx-2 hidden sm:block">
          <Link to="/login">
            <Button type="primary">Login</Button>
          </Link>
        </li>
        {/* <li className="mx-2 hidden sm:block">
          <a href="#">
            <Button type="secondary">Sign up</Button>
          </a>
        </li> */}
        <li className="mx-2 md:hidden">
          <HeaderMobile />
        </li>
      </ul>
    </div>
  );
}

export default LoginSignup;
