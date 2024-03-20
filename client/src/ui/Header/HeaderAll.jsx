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
            to="testimonial-section"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            Testimonials
          </Link>
        </li>
        <li className="mx-8">
          <Link
            to="Reviews-section"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            About Us
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HeaderAll;
