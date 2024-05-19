import StarfilledRating from './../../ui/WithoutProtected/HomePage/Testimonials/StarfilledRating';
import StarblankRating from './../../ui/WithoutProtected/HomePage/Testimonials/StarblankRating';
import StarhalfRating from '../../ui/WithoutProtected/HomePage/Testimonials/StarhalfRating';
import { useNavigate } from 'react-router-dom';
export function CardBod({
  ratings,
  name,
  email,
  role,
  photo,
  ratingsQuantity,
  doctorId,
}) {
  const navigate = useNavigate();
  const wholeStars = Math.floor(ratings); // 3
  const hasHalfStar = ratings - wholeStars >= 0.5; // 0.5
  const blankStars = 5 - wholeStars - (hasHalfStar ? 1 : 0); // 1

  // Whether to display a half-star

  return (
    <div className="w-[19rem] max-w-xl rounded-lg border border-gray-200 bg-white p-2  shadow-md shadow-blue-200 dark:border-gray-700  dark:bg-gray-800  dark:shadow-blue-900">
      <div className="flex flex-col items-center px-4 pb-10 pt-4">
        <img
          className="mb-2 h-24 w-24 rounded-full shadow-lg"
          src={`${import.meta.env.VITE_API_BASE_URL}/users/${photo}`}
          alt={name + 's photo'}
        />
        <div className="flex items-center gap-x-2">
          <h5 className="my-1 text-xl font-medium text-gray-900 dark:text-white">
            {name}
          </h5>
          {role === 'admin' && (
            <svg
              aria-label="Verified"
              fill="rgb(0, 149, 246)"
              height="17"
              width="17"
              viewBox="0 0 40 40"
            >
              <path
                d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                fillRule="evenodd"
              ></path>
            </svg>
          )}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {email}
        </span>
        <div className=" mt-2 flex flex-row justify-center">
          {Array.from({ length: wholeStars }).map((_, index) => (
            <StarfilledRating key={index} />
          ))}
          {Array.from({ length: hasHalfStar }).map((_, index) => (
            <StarhalfRating key={index} />
          ))}
          {Array.from({ length: blankStars }).map((_, index) => (
            <StarblankRating key={index + ratings} />
          ))}

          <span className="ml-2">({ratingsQuantity})</span>
        </div>
        <div className="mt-4 flex md:mt-6">
          <button
            onClick={() => navigate('/book-appointment')}
            className="inline-flex items-center rounded-lg bg-indigo-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
          >
            Book Appointment
          </button>
          <button
            onClick={() => navigate(`/doctors/${doctorId}`)}
            className="ms-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}
export default CardBod;
