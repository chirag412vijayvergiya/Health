import Button from '../Button';
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
            <Button type="primary">Login</Button>
          </a>
        </li>
        <li className="mx-2">
          <a href="#">
            <Button type="secondary">Sign up</Button>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default LoginSignup;
