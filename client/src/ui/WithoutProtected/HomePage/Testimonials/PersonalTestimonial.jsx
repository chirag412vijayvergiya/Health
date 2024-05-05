import { CiCalendar } from 'react-icons/ci';
import StarfilledRating from './StarfilledRating';
import StarblankRating from './StarblankRating';
import PropTypes from 'prop-types';

PersonalTestimonial.propTypes = {
  maxRating: PropTypes.number,
  name: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string,
  index: PropTypes.number,
  quote: PropTypes.string,
  rating: PropTypes.number,
  currentSlide: PropTypes.number,
};
function PersonalTestimonial({
  name,
  date,
  quote,
  message,
  type,
  index,
  currentSlide,
  rating,
  maxRating = 5,
}) {
  const blankRating = maxRating - rating;
  const base = ' max-w-[400px] flex-1 animate-bounce space-y-3';
  const translateValue = 100 * (index - currentSlide);
  const styles = {
    left: `${base} opacity-100 lg:blur-sm  translate-x-[${translateValue}%]`,
    middle: `${base} hidden lg:block  translate-x-[${translateValue}%]`,
    right: `${base} hidden lg:block lg:blur-sm  translate-x-[${translateValue}%]`,
  };

  return (
    <div className={styles[type]}>
      <div className="w-full rounded-lg border-2 border-grey-100 bg-white px-3 py-4 dark:border-grey-700 dark:bg-grey-900 sm:px-5 sm:pb-5 sm:pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a className="flex items-center space-x-2" href="#">
              <span className="relative flex h-[46px] w-[46px] shrink-0 overflow-hidden rounded-full object-cover">
                <img
                  className="aspect-square h-full w-full rounded-full border object-cover"
                  src="/logo-light.jpeg"
                  alt="user"
                />
              </span>
            </a>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <a
                  className="link font-semibold text-grey-800 hover:text-blue-800 hover:underline dark:text-grey-50"
                  href="#"
                >
                  {name}
                </a>
              </div>
              <div className="flex flex-row items-center gap-1 text-xs text-grey-500">
                <CiCalendar className="h-4 w-4 stroke-grey-500 stroke-2" />
                {date}
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 text-grey-600 dark:text-grey-400">
          <div className="text-center text-indigo-400">{quote}</div>
          <br></br>
          <span>{message}</span>
        </div>
        <div className=" flex flex-row justify-center">
          {Array.from({ length: rating }).map((_, index) => (
            <StarfilledRating key={index} />
          ))}

          {Array.from({ length: blankRating }).map((_, index) => (
            <StarblankRating key={index + rating} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PersonalTestimonial;
