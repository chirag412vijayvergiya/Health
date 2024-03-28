import { Link } from 'react-scroll';
import { routes } from './Routes';
function HeaderAll() {
  return (
    <div>
      <ul className="ml-18 hidden h-[45px] list-none items-center dark:text-white md:flex">
        {routes.map((route) => (
          <li key={route.title} className="mx-8">
            <Link
              to={route.href}
              smooth={true}
              duration={500}
              className="cursor-pointer"
            >
              {route.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HeaderAll;
