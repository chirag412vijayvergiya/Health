import Button from '../../ui/Button';
import Modal from './../../ui/Modal';
import CreateReviewForm from './CreateReviewForm';
function AddNewReview({ doctor }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="review-form">
          <Button type="update">Add Review</Button>
        </Modal.Open>
        <Modal.Window name="review-form">
          <CreateReviewForm doctor={doctor} />
        </Modal.Window>
      </Modal>
    </div>
  );
}
export default AddNewReview;
