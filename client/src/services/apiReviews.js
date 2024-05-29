import customFetch from '../utils/customFetch';

// Done
export async function getReviews() {
  try {
    const response = await customFetch.get('/reviews/my-reviews');
    console.log(response.data.data.reviews);
    return response.data.data.reviews;
  } catch (error) {
    // console.error('Error fetching Reviews: ', error);
    throw new Error('Failed to fetch Reviews');
  }
}

// Done
export async function updateReview({ reviewId, review, rating }) {
  try {
    const response = await customFetch.patch(`/reviews/${reviewId}`, {
      review,
      rating,
    });
    return response.data;
  } catch (err) {
    // console.error('Error update review: ', err);
    throw new Error('Failed to update review');
  }
}

// Done
export async function deleteReview(reviewId) {
  try {
    console.log('Hello from delete Api :- ', reviewId);
    const response = await customFetch.delete(`/reviews/${reviewId}`);
    return response.data;
  } catch (err) {
    // console.error('Error delete review: ', err);
    throw new Error('Failed to delete review');
  }
}

/// Done
export async function createReview({ doctor, review, rating }) {
  try {
    // console.log('From Api :- ', doctor, review, rating);
    const response = await customFetch.post('/reviews', {
      doctor,
      review,
      rating,
    });
    return response.data;
  } catch (err) {
    // console.error('Error create review: ', err);
    throw new Error('Failed to create review');
  }
}

export async function getOneReviewByDoctor(doctorId) {
  try {
    const response = await customFetch.get(
      `/reviews/reviewByDoctor/${doctorId}`,
    );
    return response.data.data;
  } catch (err) {
    // console.error('Error Get review: ', err);
    throw new Error(err);
  }
}
