import DoctorProfileInput from '../../ui/DoctorProfileInput';
import OneReview from './OneReview';

function ReviewData({ doctor }) {
  return (
    <div
      className="my-2 flex w-full flex-col gap-6 rounded-2xl border border-gray-300 bg-gray-50 p-6 tracking-wider shadow-sm shadow-grey-400 dark:border-slate-800 dark:bg-slate-900 dark:shadow-grey-900"
      style={{ height: 'auto', overflowY: 'auto' }}
    >
      <p
        className="mx-auto gap-y-3 rounded-xl border-2 border-yellow-500 bg-green-300 px-9 text-sm  font-semibold uppercase text-grey-800 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
        htmlFor={doctor.id}
      >
        Reviews and Ratings
      </p>
      <div className="flex gap-6">
        <DoctorProfileInput
          label="Rating"
          value={`${doctor.ratingsAverage} ⭐️`}
          id="rating"
          type="text"
          inputMode="numeric"
        />
        <DoctorProfileInput
          label="Total Reviews"
          value={doctor.ratingsQuantity}
          id="totalReviews"
          type="number"
        />
      </div>
      {doctor.reviews.map((review, index) => (
        <OneReview
          key={index}
          photo={review.patient.photo}
          name={review.patient.name}
          ratings={review.rating}
          review={review.review}
          date={review.createdAt}
        />
      ))}
    </div>
  );
}

export default ReviewData;
