import DefaultSpinner from '../../ui/DefaultSpinner';
import ReviewCard from './ReviewCard';
import { useGetReviews } from './useGetReviews';

function Review() {
  const { Reviews, isPending } = useGetReviews();

  if (isPending) return <DefaultSpinner />;
  if (!Reviews) return <div>No reviews found</div>;
  if (Reviews) console.log(Reviews);
  return (
    <div className="grid grid-cols-1 gap-x-2 gap-y-8  sm:grid-cols-2 xl:gap-x-4">
      {Reviews.map((review, index) => (
        <ReviewCard
          key={review._id}
          Doctorname={review.doctor.name}
          email={review.doctor.email}
          ratings={review.rating}
          photo={review.doctor.photo}
          review={review.review}
          date={review.createdAt}
          id={review._id}
        />
      ))}
    </div>
  );
}

export default Review;
