import { useDoctor } from '../features/DoctorPage/useDoctor';
import DefaultSpinner from '../ui/DefaultSpinner';

function DoctorProfile() {
  const { isPending, doctor } = useDoctor();

  if (isPending) return <DefaultSpinner />;
  if (!doctor) return <div>No doctor found</div>;

  return (
    <div className="flex w-full flex-col">
      <div className="">
        <img
          className="mb-2 h-24 w-24 rounded-full shadow-lg"
          src={`${import.meta.env.VITE_API_BASE_URL}/users/${doctor.photo}`}
          alt={doctor.name + 's photo'}
        />
      </div>
      <div></div>
    </div>
  );
}

export default DoctorProfile;

// However, there are a few considerations to keep in mind to ensure this approach works reliably after deployment:

// Relative Paths: Make sure that doctor.photo contains the correct relative path to the image from the root of your application. For instance, if doctor.photo is "images/doctors/photo.jpg", the resulting URL would be http://yourdomain.com/images/doctors/photo.jpg.

// Public Directory in Build: Ensure that during your build process (such as with Vite or other bundlers), the images are correctly placed in the public directory or the output directory of your build. Typically, files in the public directory of a Vite project are copied to the root of the build output.

// Deployment Considerations: When you deploy your application, the window.location.origin will correspond to the domain where your application is hosted. For example, if your application is deployed to https://example.com, window.location.origin will be https://example.com. Ensure that the image paths are structured correctly relative to the root.

// CDN or External Image Storage: If you're using a CDN or external storage for your images, you might want to use absolute URLs directly. This can often be more reliable and faster, depending on your setup.
