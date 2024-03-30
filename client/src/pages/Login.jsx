import MainHeader from '../ui/Header/MainHeader';
import DoctorAuth from '../ui/authentication/Doctors/DoctorAuth';
import PatientAuth from '../ui/authentication/Patients/PatientAuth';

function Login() {
  return (
    <>
      <MainHeader />

      {/* <div className="lg:max-w-maxScreen relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 sm:mx-auto">
        <div className="bg-neutral-10 border-neutral-9 flex flex-col items-start gap-8 rounded-3xl border px-3 py-14 sm:px-8">
          <div className="flex flex-col items-start gap-y-2">
            <p className="text-3xl font-semibold">Hey! 👋 Jeevan Family</p>
            <p className="max-w-lg text-base font-normal text-white">
              Simply Accessing your Account in the Jeevan. Made it Easy with One
              Click
            </p>
          </div>
          <div className="mx-auto flex w-full flex-col items-start gap-y-8 px-4 sm:px-20">
            <div className="flex w-full flex-col items-start gap-4 self-stretch">
              <button className="ring-offset-background focus-visible:ring-ring bg-primary !rounded-btn border-neutral-8 hover:bg-shark-900 z-30 inline-flex h-auto w-full items-center justify-center whitespace-nowrap rounded-md border !p-3 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                <p className="flex items-center justify-center gap-x-2 px-2 text-base font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  Continue with Google
                </p>
              </button>
            </div>
            <div className="flex items-center gap-3 self-stretch">
              <span className="h-[0.1px] flex-1 bg-grey-300 dark:bg-grey-700"></span>
              <p className="text-shark-300 min-w-fit text-sm font-normal">
                or register with email
              </p>
              <span className="h-[0.1px] flex-1 bg-grey-300 dark:bg-grey-700"></span>
            </div>
            <form className="flex flex-col items-center gap-y-4 self-stretch">
              <div className="flex w-full flex-col items-center gap-2">
                <div className="rounded-btn flex w-full items-center gap-3 border px-4 py-3 ">
                  <input
                    autoComplete="on"
                    id="email"
                    placeholder="Enter your email"
                    title="Please enter a valid email address"
                    type="email"
                    className="w-full bg-transparent text-base font-medium text-white placeholder:font-medium placeholder:text-white focus:outline-none"
                  />
                </div>
              </div>
              <button
                className="ring-offset-background focus-visible:ring-ring -mt-2 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-blue-400 underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                type="button"
              >
                Don't have an account?
              </button>
              <button
                className="ring-offset-background focus-visible:ring-ring !rounded-btn inline-flex h-auto w-full items-center justify-center whitespace-nowrap rounded-md bg-indigo-600 !p-3 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:w-2/3"
                type="submit"
              >
                <p className="flex items-center justify-center gap-x-2 px-2 text-base font-medium">
                  Get started
                </p>
              </button>
            </form>
          </div>
        </div>
        <div className="bg-neutral-10 border-neutral-9 flex flex-col items-start gap-y-8 rounded-3xl border px-3 py-14 sm:px-8">
          <div className="flex flex-col items-start gap-y-2">
            <p className="text-3xl font-semibold">Hey! 👋 Jeevan Family</p>
            <p className="max-w-lg text-base font-normal text-white">
              Aimply Accessing your Account in the Jeevan. Made it Easy with One
              Click
            </p>
          </div>
        </div>
      </div> */}
      <div className="lg:max-w-maxScreen relative min-h-screen w-full items-center justify-center overflow-hidden px-5 pt-[77px] font-serif tracking-wider sm:mx-auto ">
        <div className="rotate-150 absolute -bottom-5 -left-11 z-[100] h-80 w-80 rounded-full bg-blue-600 opacity-40 blur-[120px] dark:opacity-30"></div>
        <div className="absolute -top-2 right-0 z-[100] h-80 w-80 rounded-full bg-blue-600 opacity-40 blur-[120px] dark:opacity-20"></div>
        <div className="rotate-150 absolute -bottom-5 -right-11 z-[100] h-80 w-80 rounded-full bg-blue-600 opacity-40 blur-[120px] dark:opacity-30"></div>
        <div className="absolute -top-2 left-0 z-[100] h-80 w-80 rounded-full bg-blue-600 opacity-40 blur-[120px] dark:opacity-20"></div>
        <div className="mb-10 flex flex-col items-center">
          <h3 className="my-4 text-center text-3xl ">Hey! 👋 Jeevan Family</h3>
          <p className="max-w-2xl  text-lg text-grey-900 dark:text-grey-50">
            Accessing your Account in the Jeevan. Made it Easy with One Click.
          </p>
        </div>
        <div className="lg:max-w-maxScreen relative flex w-full flex-col items-center justify-center gap-x-11 overflow-hidden px-5 sm:mx-auto sm:flex-row">
          <PatientAuth />
          <DoctorAuth />
        </div>
      </div>
    </>
  );
}

export default Login;
