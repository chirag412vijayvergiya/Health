import StarblankRating from '../../ui/WithoutProtected/HomePage/Testimonials/StarblankRating';
import StarfilledRating from '../../ui/WithoutProtected/HomePage/Testimonials/StarfilledRating';
import StarhalfRating from '../../ui/WithoutProtected/HomePage/Testimonials/StarhalfRating';
import { formatRelativeTime } from '../../utils/helpers';

function OneReview({ photo, name, ratings, review, date }) {
  const wholeStars = Math.floor(ratings); // 3
  const hasHalfStar = ratings - wholeStars >= 0.5; // 0.5
  const blankStars = 5 - wholeStars - (hasHalfStar ? 1 : 0); // 1
  return (
    <div className="flex w-full flex-col rounded-2xl border-b border-gray-300 bg-gray-50 p-6 tracking-wider shadow-sm shadow-grey-400 dark:border-slate-800 dark:bg-slate-900 dark:shadow-grey-900 ">
      <div className="flex flex-row">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/users/${photo}`}
          className="h-[3rem] w-[3rem] rounded-full shadow-xl shadow-slate-300 dark:shadow-gray-800"
          alt="Patient"
        />
        <div className="gap-x-3 pl-3">
          <div className="flex flex-col ">
            <p className="text-md font-semibold text-slate-800 dark:text-grey-100">
              {name}
            </p>
            <div className="mt-2 flex flex-row ">
              {Array.from({ length: wholeStars }).map((_, index) => (
                <StarfilledRating key={index} />
              ))}
              {Array.from({ length: hasHalfStar }).map((_, index) => (
                <StarhalfRating key={index} />
              ))}
              {Array.from({ length: blankStars }).map((_, index) => (
                <StarblankRating key={index + ratings} />
              ))}
              <p className="pl-2 text-sm">{formatRelativeTime(date)}</p>
            </div>
            <div className="mt-2 text-sm text-slate-500 dark:text-grey-400">
              <p>{review}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneReview;
