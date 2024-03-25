import Button from '../../Button';
import AboutUs from './AboutUs';

function Footer() {
  return (
    <footer
      className="relative mx-auto min-h-[280px] w-full bg-gray-900 py-8 pb-8 pt-48 dark:bg-gray-50"
      id="about-us"
    >
      <div className="absolute -top-[70px] z-10 w-full md:-top-[100px]">
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
            <Button type="third">Get Started</Button>
          </div>
        </div>
      </div>
      <AboutUs />
    </footer>
  );
}

export default Footer;
