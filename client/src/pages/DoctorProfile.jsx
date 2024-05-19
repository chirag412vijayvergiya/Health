import { useDoctor } from '../features/DoctorPage/useDoctor';
import PersonalData from '../features/DoctorProfilePage/PersonalData';
import ProfileImage from '../features/DoctorProfilePage/ProfileImage';
import ReviewData from '../features/DoctorProfilePage/ReviewData';
import Specialization from '../features/DoctorProfilePage/Specialization';
import DefaultSpinner from '../ui/DefaultSpinner';

function DoctorProfile() {
  const { isPending, doctor } = useDoctor();

  if (isPending) return <DefaultSpinner />;
  if (!doctor) return <div>No doctor found</div>;

  return (
    <div className="m-[2vh] flex h-[86vh] flex-col rounded-xl border-r border-r-grey-200 bg-slate-200 p-4 tracking-wider shadow-md shadow-blue-200 dark:border-r-grey-800 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900">
      <h1 className="sticky top-0 z-10 m-2 w-full bg-slate-200 text-lg font-semibold dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 dark:shadow-blue-900">
        {`${doctor.name}'s Profile`}
      </h1>
      <div className="flex-1 overflow-scroll">
        <ProfileImage doctor={doctor} className="h-1/3" />
        <div className="mx-auto flex w-full flex-row items-center justify-center gap-x-2">
          <div className="flex h-1/3 w-full flex-row items-center justify-center gap-x-2">
            <PersonalData doctor={doctor} />
            <Specialization doctor={doctor} />
          </div>
        </div>
        <div className="h-1/3">
          <ReviewData doctor={doctor} />
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;

// However, there are a few considerations to keep in mind to ensure this approach works reliably after deployment:

// Relative Paths: Make sure that doctor.photo contains the correct relative path to the image from the root of your application. For instance, if doctor.photo is "images/doctors/photo.jpg", the resulting URL would be http://yourdomain.com/images/doctors/photo.jpg.

// Public Directory in Build: Ensure that during your build process (such as with Vite or other bundlers), the images are correctly placed in the public directory or the output directory of your build. Typically, files in the public directory of a Vite project are copied to the root of the build output.

// Deployment Considerations: When you deploy your application, the window.location.origin will correspond to the domain where your application is hosted. For example, if your application is deployed to https://example.com, window.location.origin will be https://example.com. Ensure that the image paths are structured correctly relative to the root.

// CDN or External Image Storage: If you're using a CDN or external storage for your images, you might want to use absolute URLs directly. This can often be more reliable and faster, depending on your setup.
