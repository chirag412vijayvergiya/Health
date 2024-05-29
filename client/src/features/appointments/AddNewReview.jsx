import Button from '../../ui/Button';
import DefaultSpinner from '../../ui/DefaultSpinner';
import Modal from './../../ui/Modal';
import CreateReviewForm from './CreateReviewForm';
import { useGetReviewByDoctor } from './useGetReviewByDoctor';
function AddNewReview({ doctor }) {
  const { isPending, Review } = useGetReviewByDoctor(doctor.id);

  if (isPending) return <DefaultSpinner />;

  return (
    <div>
      {Review.review === null ? (
        <Modal>
          <Modal.Open opens="createreview-form">
            <Button type="update">Add Review</Button>
          </Modal.Open>
          <Modal.Window name="createreview-form">
            <CreateReviewForm doctor={doctor} />
          </Modal.Window>
        </Modal>
      ) : (
        <Modal>
          <Modal.Open opens="Editreview-form">
            <Button type="update">Edit Review</Button>
          </Modal.Open>
          <Modal.Window name="Editreview-form">
            <CreateReviewForm doctor={doctor} review={Review?.review} />
          </Modal.Window>
        </Modal>
      )}
    </div>
  );
}

export default AddNewReview;
