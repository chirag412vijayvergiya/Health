import { useUser } from '../../../../features/authentication/Patients/useUser';
import Button from '../../../Button';
import DefaultSpinner from '../../../DefaultSpinner';
import AboutUs from './AboutUs';
import { Link } from 'react-router-dom';

function Footer() {
  const { user, isPending } = useUser();
  return (
    <footer
      className="relative mx-auto min-h-[280px] w-full bg-gray-900 py-8 pb-8 pt-48 dark:bg-gray-50"
      id="about-us"
    >
      <div className="absolute -top-[70px] w-full md:-top-[100px]">
        <div className="mx-8 max-w-[1200px] rounded-3xl bg-indigo-500 py-12 md:py-24 xl:mx-auto">
          <div className="mx-auto flex max-w-4xl flex-col items-start justify-center gap-y-4 px-5 md:flex-row md:items-center">
            <div className="flex flex-1 flex-col items-start justify-center gap-y-2 ">
              <p className="text-2xl font-semibold text-gray-300 sm:text-[2rem]">
                What checkup do you want ?
              </p>
              <p className="text-2xl font-semibold text-gray-300 sm:text-[2rem]">
                Talk to us today
              </p>
            </div>
            <div className="mx-auto items-center">
              {!isPending ? (
                user ? (
                  <Link to="/dashboard">
                    <Button type="third">Get Started</Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button type="third">Get Started</Button>
                  </Link>
                )
              ) : (
                <DefaultSpinner />
              )}
            </div>
          </div>
        </div>
      </div>
      <AboutUs />
    </footer>
  );
}

export default Footer;
