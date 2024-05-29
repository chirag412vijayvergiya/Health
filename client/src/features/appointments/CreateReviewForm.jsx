import { useState } from 'react';
import Button from '../../ui/Button';
import StarRating from '../../ui/StarRating';
import { useCreateReview } from './useCreateReview';

import { useUpdateReview } from '../ReviewPage/useUpdateReview';

function CreateReviewForm({ onCloseModal, doctor, review }) {
  const { isCreating, createReview } = useCreateReview();
  const { isUpdating, updatedReview } = useUpdateReview();
  const isWorking = isCreating || isUpdating;
  const reviewId = review ? review._id : null;
  const isEditSession = Boolean(reviewId);

  const [userRating, setUserRating] = useState(review ? review.rating : 0);
  const [userReview, setUserReview] = useState(review ? review.review : '');

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(doctor.id, userReview, userRating);
    // console.log(isEditSession, reviewId, userReview, userRating);
    if (isEditSession) {
      updatedReview(
        { reviewId, review: userReview, rating: userRating },
        {
          onSuccess: () => {
            e.target.reset();
            onCloseModal?.();
          },
        },
      );
      return;
    } else {
      createReview(
        { doctor: doctor.id, review: userReview, rating: userRating },
        {
          onSuccess: () => {
            e.target.reset();
            onCloseModal?.();
          },
        },
      );
    }
  }
  function handleCancel() {
    setUserRating(0);
    setUserReview('');
    onCloseModal?.();
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-lg border-[1px] border-solid border-grey-100 bg-grey-0 p-[1.3rem_2rem] text-xl  dark:border-slate-800 dark:bg-slate-900 md:p-[2.4rem_4rem]"
    >
      <h5 className="mx-3 mb-3 items-center font-semibold text-grey-800 dark:text-grey-100 md:mx-7">
        Why did you leave this rating?
      </h5>
      <div className="mb-3 flex w-[230px] rounded-lg bg-grey-100 py-1 dark:bg-slate-800 md:w-[350px]">
        <StarRating onSetRating={setUserRating} defaultRating={userRating} />
      </div>
      <textarea
        className="h-[8rem] w-full rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.8rem_1.2rem] text-sm tracking-wide shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-grey-300"
        placeholder={`Tell us about your own personal experience appointment with the doctor ${doctor.name}`}
        disabled={isWorking}
        onChange={(e) => setUserReview(e.target.value)}
        value={userReview}
      />
      <div className="m-auto flex items-center  justify-center gap-9 p-[1.2rem_0]">
        <Button type="reset" onClick={handleCancel} disabled={isWorking}>
          Back
        </Button>
        <Button type="update" disabled={isWorking}>
          {isEditSession ? 'Edit' : 'Create'} Review
        </Button>
      </div>
    </form>
  );
}

export default CreateReviewForm;
