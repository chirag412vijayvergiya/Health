import MainHeader from '../ui/WithoutProtected/Header/MainHeader';
import DoctorAuth from '../ui/WithoutProtected/authentication/Doctors/DoctorAuth';
import PatientAuth from '../ui/WithoutProtected/authentication/Patients/PatientAuth';

function Login() {
  return (
    <>
      <MainHeader />
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
