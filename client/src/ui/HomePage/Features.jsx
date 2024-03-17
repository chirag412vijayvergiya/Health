import { FaAmbulance } from 'react-icons/fa';
function Features() {
  return (
    <div className="min-w-screen ltm-landing-bg dark:bg-grey-950 relative z-[10] flex overflow-hidden bg-grey-50 bg-cover bg-no-repeat">
      <div className="rotate-150 absolute bottom-0 left-0 z-[100] h-80 w-80 rounded-full bg-blue-600 opacity-40 blur-[120px] dark:opacity-30"></div>
      <div className="absolute -top-2 right-0 z-[100] h-80 w-80 rounded-full bg-green-600 opacity-40 blur-[120px] dark:opacity-20"></div>
      <div className="flex-1">
        <div className="mx-auto h-full w-11/12 max-w-[1200px] space-y-[3.45rem] py-10 text-left md:py-20 md:text-center">
          <div className="mx-auto max-w-[900px]">
            <p className="text-md font-semibold uppercase text-indigo-400">
              Patient-Centered Excellence, Doctor-Driven Care!
            </p>
            <h2 className="my-4 text-xl font-semibold text-grey-900 dark:text-grey-50 md:text-2xl xl:text-3xl">
              Elevate Patient Health, Empower Doctor Expertise, Illuminate
              Hospital Care
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row-reverse">
            <div className="flex flex-col gap-6 text-left">
              <h3 className="text-main-06 text-2xl font-semibold">
                Facilities For Future
              </h3>
              <p className="text-grey-900 dark:text-grey-500">
                Elevate Patient Health, Empower Doctor Expertise, Illuminate
                Hospital Care. Guiding Your Journey with Expertise, Compassion,
                and Commitment
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-row items-center gap-4 text-left">
                  <div className="flex rounded-full bg-yellow-100 p-3">
                    <FaAmbulance />
                  </div>
                  <p className="text-lg font-medium text-grey-800 dark:text-grey-200">
                    Hello persons
                  </p>
                </div>
                <div className="flex flex-row items-center gap-4 text-left">
                  <div className="bg-success-100 flex rounded-full p-3">
                    <FaAmbulance />
                  </div>
                  <p className="text-lg font-medium text-grey-800 dark:text-grey-200">
                    Hello persons
                  </p>
                </div>
                <div className="flex flex-row items-center gap-4 text-left">
                  <div className="bg-success-100 flex rounded-full p-3">
                    <FaAmbulance />
                  </div>
                  <p className="text-lg font-medium text-grey-800 dark:text-grey-200">
                    Hello persons
                  </p>
                </div>
                <div className="flex flex-row items-center gap-4 text-left">
                  <div className="bg-success-100 flex rounded-full p-3">
                    <FaAmbulance />
                  </div>
                  <p className="text-lg font-medium text-grey-800 dark:text-grey-200">
                    Hello persons
                  </p>
                </div>
                <div className="flex flex-row items-center gap-4 text-left">
                  <div className="bg-success-100 flex rounded-full p-3">
                    <FaAmbulance />
                  </div>
                  <p className="text-lg font-medium text-grey-800 dark:text-grey-200">
                    Hello persons
                  </p>
                </div>
                <div className="flex flex-row items-center gap-4 text-left">
                  <div className="bg-success-100 flex rounded-full p-3">
                    <FaAmbulance />
                  </div>
                  <p className="text-lg font-medium text-grey-800 dark:text-grey-200">
                    Hello persons
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <a href="">
              <button className="p-small mx-auto flex items-center justify-center  rounded-full bg-stone-600  px-6 py-3 font-medium text-grey-50">
                <span>Learn More</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
