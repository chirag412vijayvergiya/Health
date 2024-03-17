import ButtonIcon from '../ButtonIcon';
import styles from './HomePageStyle';
import { IoIosArrowForward } from 'react-icons/io';
function Hero() {
  return (
    // <main
    //   id="home"
    //   className="mt-[140px] min-h-[calc(100vh-140px)] bg-grey-100 dark:bg-grey-900 sm:mt-[116px] sm:min-h-[calc(100vh-116px)]"
    // >
    //   <div className="flex-1">
    //     <div className="mx-auto flex w-11/12 max-w-[1200px] flex-col items-center justify-between gap-[50px] py-10 md:h-full lg:flex-row lg:gap-6 lg:py-0">
    //       <div className="space-y-4 sm:space-y-8">
    //         <div className="space-y-4 sm:space-y-8">
    //           <button className="dark:accent-1-06 border-accent-1-09 bg-accent-1-11 text-accent-1-07 dark:border-accent-1-02 dark:bg-accent-1-01 mx-auto flex items-center gap-1 rounded-full border p-1 px-2 text-[10px] font-medium sm:px-3 sm:text-sm lg:mx-0 lg:justify-start">
    //             <p>Start your healing journey with us today</p>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </main>
    /*
    <div className="w-full pt-[77px] dark:bg-slate-900">
      <div className="absolute -left-40 -top-40 z-[-100] h-96 w-96 rotate-180 rounded-full bg-blue-600 opacity-40 blur-[120px] dark:opacity-30"></div>
      <div className="absolute -bottom-40 -right-40 z-[-100] h-96 w-96 rounded-full bg-green-500 opacity-40 blur-[120px] dark:opacity-20"></div>
      <div className="flex-1">
        <div className="mx-auto flex w-11/12 flex-col items-center justify-between gap-[50px] py-10 md:h-full lg:flex-row lg:gap-6 lg:py-10">
          <div className="space-y-4 sm:space-y-8">
            <button className="dark:accent-1-06 bg-accent-1-11 dark:border-accent-1-02 mx-auto flex items-center gap-1 rounded-full border border-yellow-600 bg-yellow-100 p-1 px-2 text-[10px] font-medium text-yellow-500 dark:bg-gray-400 sm:px-3 sm:text-sm lg:mx-0 lg:justify-start">
              <p>Start your healing journey with us today</p>
              <IoIosArrowForward />
            </button>
            <div className="space-y-5">
              <h1 className="text-center text-3xl font-bold sm:text-4xl lg:text-left xl:text-5xl">
                <span className="text-grey-800 dark:text-grey-50">
                  Empowering Wellness,
                </span>
                <br></br>
                <span className="text-indigo-500 dark:text-indigo-800">
                  {' '}
                  Embracing Life
                </span>
              </h1>
            </div>
            <div className="flex items-center justify-center gap-x-4 lg:justify-start">
              <a href="#">
                <button className="p-small flex items-center justify-center rounded-full bg-indigo-400  px-6 py-2 font-medium  text-grey-50 dark:bg-indigo-500 ">
                  Join Now
                </button>
              </a>
            </div>
          </div>
          <div className="flex aspect-square w-[320px] items-center justify-center bg-transparent sm:w-[500px]">
            <video
              src="/kid-consultation-with-doctor-8856213-7201972.mp4"
              autoPlay
            ></video>
          </div>
        </div>
      </div>
    </div>
*/
    //
    <div className="mt-[80px] min-h-[calc(100vh-80px)] bg-grey-100  sm:mt-[30px] sm:min-h-[calc(100vh-20px)] ">
      <div className="min-w-screen relative z-[10] flex w-full overflow-hidden bg-white dark:bg-slate-900 md:min-h-[100vh]">
        <div className="rotate-150 absolute left-0 top-0 z-[100] h-80 w-80 rounded-full bg-blue-600 opacity-40 blur-[120px] dark:opacity-30"></div>
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
                  <button className="p-small flex items-center justify-center rounded-full bg-indigo-400  px-6 py-2 font-medium  text-grey-50 dark:bg-indigo-500 ">
                    Join Now
                  </button>
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
