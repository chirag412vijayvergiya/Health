import { BsThreeDotsVertical } from 'react-icons/bs';
import StarblankRating from '../../ui/WithoutProtected/HomePage/Testimonials/StarblankRating';
import StarfilledRating from '../../ui/WithoutProtected/HomePage/Testimonials/StarfilledRating';
import StarhalfRating from '../../ui/WithoutProtected/HomePage/Testimonials/StarhalfRating';
import { formatRelativeTime } from '../../utils/helpers';
import Menus from '../../ui/Menus';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import CreateReviewForm from '../appointments/CreateReviewForm';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteReviews } from './useDeleteReviews';

function ReviewCard({ review, doctor }) {
  const { isDeleting, deleteReview } = useDeleteReviews();
  const wholeStars = Math.floor(review.rating); // 3
  const hasHalfStar = review.rating - wholeStars >= 0.5; // 0.5
  const blankStars = 5 - wholeStars - (hasHalfStar ? 1 : 0); // 1
  return (
    <div className="m-auto flex h-[13rem] w-[20.5rem] max-w-xl flex-row justify-between overflow-scroll rounded-xl border-b border-gray-300 bg-gray-50 p-6 tracking-wider shadow-sm shadow-grey-400 dark:border-slate-800 dark:bg-slate-900 dark:shadow-grey-900 md:h-[15rem] md:w-[29rem]">
      <div className="flex flex-row">
        <img
          src={doctor.photo}
          className="h-[3rem] w-[3rem] rounded-full shadow-xl shadow-slate-300 dark:shadow-gray-800"
          alt="Patient"
        />
        <div className="gap-x-3 pl-3">
          <div className="flex flex-col ">
            <p className="text-md font-semibold text-slate-800 dark:text-grey-200">
              {doctor.name}
            </p>
            <div className="mt-2 flex flex-row ">
              {Array.from({ length: wholeStars }).map((_, index) => (
                <StarfilledRating key={index} />
              ))}
              {Array.from({ length: hasHalfStar }).map((_, index) => (
                <StarhalfRating key={index} />
              ))}
              {Array.from({ length: blankStars }).map((_, index) => (
                <StarblankRating key={index + review.rating} />
              ))}
              <p className="pl-2 text-sm">
                {formatRelativeTime(review.createdAt)}
              </p>
            </div>
            <div className="mb-1 mt-2 text-sm text-slate-500 dark:text-grey-400">
              <p>{review.review}</p>
            </div>
          </div>
        </div>
      </div>
      <Modal>
        <Menus>
          <div>
            <Menus.Toggle
              id={review._id}
              icon={BsThreeDotsVertical}
              className="outline-2px  h-9 w-9 cursor-pointer rounded
            border-none bg-transparent p-2.5  transition duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-slate-800"
            />
            <Menus.List id={review._id} positionX={2} positionY={-13}>
              <Modal.Open opens="Editreview-form">
                <Menus.Button icon={<HiPencil />} disabled>
                  Edit Review
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />} disabled>
                  Delete Review
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="Editreview-form">
              <CreateReviewForm doctor={doctor} review={review} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="Review"
                disabled={isDeleting}
                onConfirm={() => deleteReview(review._id)}
              />
            </Modal.Window>
          </div>
        </Menus>
      </Modal>
    </div>
  );
}

export default ReviewCard;
