import customFetch from '../utils/customFetch';

export async function getReviews() {
  try {
    const response = await customFetch.get('/reviews/my-reviews');
    console.log(response.data.data.reviews);
    return response.data.data.reviews;
  } catch (error) {
    console.error('Error fetching Reviews: ', error);
    throw new Error('Failed to fetch Reviews');
  }
}

export async function updateReview(reviewId, { review, rating }) {
  try {
    const formdata = new FormData();
    formdata.append('rating', rating);
    formdata.append('review', review);
    const response = await customFetch.patch(`/reviews/${reviewId}`, formdata);
    return response.data;
  } catch (err) {
    console.error('Error update review: ', err);
    throw new Error('Failed to update review');
  }
}

export async function deleteReview(reviewId) {
  try {
    const response = await customFetch.delete(`/reviews/${reviewId}`);
    return response.data;
  } catch (err) {
    console.error('Error delete review: ', err);
    throw new Error('Failed to delete review');
  }
}

export async function createReview({ DoctorId, review, rating }) {
  try {
    const response = await customFetch.post('/reviews', {
      DoctorId,
      review,
      rating,
    });
    return response.data;
  } catch (err) {
    console.error('Error create review: ', err);
    throw new Error('Failed to create review');
  }
}
