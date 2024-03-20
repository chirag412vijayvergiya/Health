import { FaAmbulance } from 'react-icons/fa';
import FacilityFeatures from './FacilityFeatures';
import Button from '../Button';
function Features() {
  return (
    <div id="features-section">
      <div className="min-w-screen  relative z-[10] flex overflow-hidden bg-grey-50 bg-cover dark:bg-gray-900">
        <div className="rotate-150 absolute bottom-0 left-0 z-[100] h-80 w-80 rounded-full bg-blue-600 opacity-40 blur-[120px] dark:opacity-30"></div>
        <div className="absolute -top-2 right-0 z-[100] h-80 w-80 rounded-full bg-green-600 opacity-40 blur-[120px] dark:opacity-20"></div>
        <div className="flex-1">
          <div className="mx-auto h-[80%] w-11/12 max-w-[1200px] space-y-[3.45rem] py-10   text-left md:py-20 md:text-center">
            <div className="mx-auto max-w-[900px]">
              <p className="text-md pt-14 font-semibold uppercase text-indigo-400">
                Patient-Centered Excellence, Doctor-Driven Care!
              </p>
              <h2 className="my-4 text-xl font-semibold text-grey-900 dark:text-grey-50 md:text-2xl xl:text-3xl">
                Elevate Patient Health, Empower Doctor Expertise, Illuminate
                Hospital Care
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row-reverse">
              <div className="flex flex-col gap-6 text-left">
                <h3 className="text-2xl font-semibold text-indigo-500">
                  Facilities For Future 🧑‍⚕️
                </h3>
                <p className="text-grey-900 dark:text-grey-500">
                  Elevate Patient Health, Empower Doctor Expertise, Illuminate
                  Hospital Care. Guiding Your Journey with Expertise,
                  Compassion, and Commitment
                </p>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FacilityFeatures type={1}>
                    24 x 7 Emergency Services
                  </FacilityFeatures>
                  <FacilityFeatures type={2}>Expert Care</FacilityFeatures>
                  <FacilityFeatures type={3}>
                    Precision Imaging
                  </FacilityFeatures>
                  <FacilityFeatures type={4}>
                    Compassionate Support
                  </FacilityFeatures>
                  <FacilityFeatures type={5}>
                    Precision Surgery
                  </FacilityFeatures>
                  <FacilityFeatures type={6}>
                    Holistic Wellness
                  </FacilityFeatures>
                </div>
              </div>
            </div>
            <div className="py-5">
              <a href="">
                <Button type="third">Learn More</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
