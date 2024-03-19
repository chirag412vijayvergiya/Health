import { Link } from 'react-scroll';
function HeaderAll() {
  return (
    <div>
      <ul className="ml-20 flex h-[45px] list-none items-center dark:text-white">
        <li className="mx-8">
          <Link
            to="features-section"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            Features
          </Link>
        </li>

        <li className="mx-8">
          <Link
            to="Operations-section"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            Operations
          </Link>
        </li>
        <li className="mx-8">
          <Link
            to="Reviews-section"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            Reviews
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HeaderAll;
