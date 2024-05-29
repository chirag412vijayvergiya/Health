import DefaultSpinner from '../../ui/DefaultSpinner';
import ReviewCard from './ReviewCard';
import { useGetReviews } from './useGetReviews';

function Review() {
  const { Reviews, isPending } = useGetReviews();

  if (isPending) return <DefaultSpinner />;
  if (!Reviews) return <div>No reviews found</div>;
  return (
    <div className="grid grid-cols-1 gap-x-2 gap-y-8  sm:grid-cols-2 xl:gap-x-4">
      {Reviews.map((review, index) => (
        <ReviewCard key={review._id} doctor={review.doctor} review={review} />
      ))}
    </div>
  );
}

export default Review;
