import { Link } from 'react-router-dom';
import Button from '../../Button';
import DarkModeToggle from '../../DarkModeToggle';
import HeaderMobile from './HeaderMobile';
import { useUser } from '../../../features/authentication/Patients/useUser';
import UserAvatar from './UserAvatar';
import HeaderLogoutMenu from './HeaderLogoutMenu';
import ButtonIcon from '../../DarkModeIcon';
import DefaultSpinner from '../../DefaultSpinner';

function LoginSignup() {
  const { user, isPending } = useUser();
  return (
    <div>
      <ul className="mr-3 flex h-[45px] list-none items-center dark:text-white">
        <li className="mx-2">
          <DarkModeToggle />
        </li>
        {isPending ? (
          <DefaultSpinner />
        ) : user ? (
          <>
            <li className="mr-2">
              <UserAvatar
                name={user.data.data.name}
                photo={user.data.data.photo}
              />
            </li>
            <ButtonIcon>
              <HeaderLogoutMenu />
            </ButtonIcon>
          </>
        ) : (
          <li className="mx-2 hidden sm:block">
            <Link to="/login">
              <Button type="primary">Login</Button>
            </Link>
          </li>
        )}

        <li className="mx-2 md:hidden">
          <HeaderMobile />
        </li>
      </ul>
    </div>
  );
}

export default LoginSignup;
