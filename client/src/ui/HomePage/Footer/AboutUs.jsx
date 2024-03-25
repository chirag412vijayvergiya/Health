import Logo from '../../Logo';
import { MdEmail } from 'react-icons/md';
function AboutUs() {
  return (
    <div className="min-w-screen mx-auto flex flex-col gap-y-8">
      <div className="my-6 flex flex-col items-center gap-x-24 gap-y-12 md:flex-row md:items-start md:justify-around md:gap-0">
        <div className="flex flex-col items-center gap-y-3 px-4 text-center sm:items-start md:text-start">
          <Logo type="footer" />
          <p className="text-md max-w-[300px] font-normal text-neutral-400">
            Empowering Wellness, Embracing Life
          </p>
        </div>
        <div className="flex flex-col gap-y-3 text-center text-base md:text-left">
          <p className="text-center font-medium md:text-left">QuickLinks</p>
          <div className="flex flex-col gap-y-2">
            <a href="/">
              <p className="text-shark-300 text-sm font-normal hover:text-indigo-500">
                Home
              </p>
            </a>
            <a href="/">
              <p className="text-shark-300 text-sm font-normal hover:text-indigo-500">
                Features
              </p>
            </a>
            <a href="/">
              <p className="text-shark-300 text-sm font-normal hover:text-indigo-500">
                Testimonials
              </p>
            </a>
            <a href="/">
              <p className="text-shark-300 text-sm font-normal hover:text-indigo-500">
                Contact
              </p>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 text-center text-base md:text-left">
          <p className="text-center font-medium md:text-left">QuickLinks</p>
          <div className="flex flex-col gap-y-2">
            <a href="/">
              <p className="text-shark-300 text-sm font-normal hover:text-indigo-500">
                Home
              </p>
            </a>
            <a href="/">
              <p className="text-shark-300 text-sm font-normal hover:text-indigo-500">
                Features
              </p>
            </a>
            <a href="/">
              <p className="text-shark-300 text-sm font-normal hover:text-indigo-500">
                Testimonials
              </p>
            </a>
            <a href="/">
              <p className="text-shark-300 text-sm font-normal hover:text-indigo-500">
                Contact
              </p>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 text-center text-base md:text-left">
          <p className="text-center font-medium md:text-left">GET IN TOUCH</p>
          <div className="group flex items-center gap-3">
            <MdEmail className="fill-shark-300 h-5 w-5 group-hover:fill-indigo-500" />
            <p className="text-shark-300 font-medium group-hover:text-indigo-500">
              chirag4vv@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="bg-neutral-9 h-[1px] w-full"></div>
      <div className="text-center text-base">
        Copyright &#169; 2024 || Chirag Vijayvergiya All Right Reserved.
      </div>
    </div>
  );
}

export default AboutUs;
