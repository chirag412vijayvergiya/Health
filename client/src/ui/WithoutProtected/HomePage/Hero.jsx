import Button from '../../Button';
import { IoIosArrowForward } from 'react-icons/io';
function Hero() {
  return (
    <div
      id="Home"
      className="mt-[90px] min-h-[calc(100vh-90px)] bg-grey-50  dark:bg-slate-900 sm:mt-[10px] sm:min-h-[calc(100vh-90px)] "
    >
      <div className="min-w-screen relative z-[10] flex w-full overflow-hidden md:min-h-[100vh]">
        <div className="rotate-150 absolute -left-11 top-0 z-[100] h-80 w-80 rounded-full bg-blue-600 opacity-40 blur-[120px] dark:opacity-30"></div>
        <div className="absolute bottom-0 right-0 z-[100] h-80 w-80 rounded-full bg-green-600 opacity-40 blur-[120px] dark:opacity-20"></div>
        <div className="flex-1">
          <div className="mx-auto flex w-11/12 max-w-[1200px] flex-col items-center justify-between gap-[50px] py-10 sm:py-[5rem] md:h-full lg:flex-row lg:gap-6 lg:py-0">
            <div className="space-y-4 sm:space-y-8">
              <button className="dark:accent-1-06 bg-accent-1-11 dark:border-accent-1-02 mx-auto flex items-center gap-1 rounded-full border border-amber-600 bg-amber-100 p-1 px-2 text-[10px] font-medium text-yellow-600 dark:bg-gray-800 sm:px-3 sm:text-sm lg:mx-0 lg:justify-start">
                <p>Start your healing journey with us today</p>
                <IoIosArrowForward />
              </button>
              <div className="space-y-2">
                <h1 className="text-center text-3xl font-bold sm:text-4xl lg:text-left xl:text-5xl">
                  <span className="leading-[1.2] text-grey-800  dark:text-grey-50">
                    Empowering Wellness,
                  </span>
                  <br></br>
                  <span className="text-indigo-500 dark:text-indigo-800">
                    {' '}
                    Embracing Life
                  </span>
                </h1>
                <p className="p-small max-w-md text-center font-medium text-grey-500 sm:max-w-lg lg:text-left">
                  Connect with professionals and patients at Jeeven Hospital for
                  support, collaboration, and care.
                </p>
              </div>
              <div className="flex items-center justify-center gap-x-4 lg:justify-start">
                <a href="#">
                  <Button type="primary">Join Now</Button>
                </a>
              </div>
            </div>
            <div className="flex aspect-square w-[320px] items-center justify-center sm:w-[500px]">
              <img
                src="/kindpng_1925225.png"
                alt="Hero"
                className="-translate-y-29 col-start-2 col-end-3 row-span-4 row-start-1 transform pr-12 dark:bg-slate-900"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
