import { useState } from 'react';
import Button from '../../ui/Button';
import StarRating from '../../ui/StarRating';
import { useCreateReview } from './useCreateReview';
import { useForm } from 'react-hook-form';

function CreateReviewForm({ onCloseModal, doctor }) {
  const { isCreating, createReview } = useCreateReview();
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  //   const { register, handleSubmit, reset, getValues, formState } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    console.log(doctor.id, userReview, userRating);
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
        <StarRating onSetRating={setUserRating} />
      </div>
      <textarea
        className="h-[8rem] w-full rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.8rem_1.2rem] text-sm tracking-wide shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-grey-300"
        placeholder={`Tell us about your own personal experience appointment with the doctor ${doctor.name}`}
        disabled={isCreating}
        onChange={(e) => setUserReview(e.target.value)}
      />
      <div className="m-auto flex items-center  justify-center gap-9 p-[1.2rem_0]">
        <Button type="reset" onClick={handleCancel} disabled={isCreating}>
          Back
        </Button>
        <Button type="update" disabled={isCreating}>
          Create Review
        </Button>
      </div>
    </form>
  );
}

export default CreateReviewForm;
