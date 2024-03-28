import { Link } from 'react-scroll';
import { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import { routes } from './Routes';
import Button from '../Button';
function HeaderMobile() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <Hamburger size={22} toggled={isOpen} toggle={setOpen} />
      {isOpen && (
        <div className="fixed left-0 right-0 top-[5rem] border-b border-b-white/20 p-5 pt-7  backdrop-blur-md backdrop-filter ">
          <ul className="grid gap-2 ">
            {routes.map((route) => {
              const { Icon } = route;

              return (
                <li
                  key={route.title}
                  className="w-full rounded-xl bg-gradient-to-tr from-gray-500 via-gray-900 to-gray-800 p-[0.08rem]"
                >
                  <Link
                    to={route.href}
                    smooth={true}
                    duration={500}
                    onClick={() => setOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-xl bg-gray-900 p-5"
                  >
                    <span className="flex gap-1 text-lg">{route.title}</span>
                    <Icon className="text-xl" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="my-6 flex justify-center">
            {' '}
            {/* Center the login button */}
            <a href="#">
              <Button type="primary">Login</Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderMobile;
