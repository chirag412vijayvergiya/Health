import { routes } from './Routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import * as Scroll from 'react-scroll';
function HeaderAll() {
  const path = useLocation().pathname;
  const location = path.split('/')[1];
  const navigate = useNavigate();
  const scroller = Scroll.scroller;
  const goToPageAndScroll = async (selector) => {
    try {
      await navigate('/');
      await scroller.scrollTo(selector, {
        duration: 500,
        smooth: true,
        offset: -75,
        spy: true,
      });
    } catch (err) {
      console.error('Error navigating or scrolling:', err);
    }
  };
  return (
    <div id="headerAll">
      <ul className="ml-18 hidden h-[45px] list-none items-center dark:text-white md:flex">
        {location === ''
          ? routes.map((route) => (
              <li key={route.title} className="mx-8">
                <ScrollLink
                  to={route.href}
                  spy={true}
                  smooth={true}
                  offset={-75}
                  duration={500}
                  className="cursor-pointer"
                >
                  {route.title}
                </ScrollLink>
              </li>
            ))
          : routes.map((route) => (
              <li key={route.title} className="mx-8">
                <button
                  onClick={() => goToPageAndScroll(route.href)}
                  className="cursor-pointer"
                >
                  {route.title}
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default HeaderAll;

// return (
//   <div id="headerAll">
//     <ul className="ml-18 hidden h-[45px] list-none items-center dark:text-white md:flex">
//       {routes.map((route) => (
//         <li key={route.title} className="mx-8">
//           <Link
//             to={route.href}
//             smooth={true}
//             duration={500}
//             className="cursor-pointer"
//           >
//             {route.title}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </div>
// );
