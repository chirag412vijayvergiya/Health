import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Load your publishable key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const BookAppointmentForm = () => {
  const [bookingData, setBookingData] = useState({
    patientId: '', // Set this dynamically based on user authentication
    doctorId: 'doctorId', // Replace with actual doctor ID
    appointmentDate: '',
    appointmentTime: '',
    disease: '',
    amount: 0,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Create a payment method with Stripe
      const cardElement = elements.getElement(CardElement);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      // Step 2: Send booking request to the backend
      const response = await fetch(
        'https://jeevan-backend.vercel.app/api/v1/appointment/book-appointment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...bookingData,
            paymentMethodId: paymentMethod.id,
          }),
        },
      );

      const result = await response.json();
      if (response.status === 200) {
        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: result.id });
      } else {
        setErrorMessage(result.message || 'Booking failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleBooking}>
        <label>
          Appointment Date:
          <input
            type="date"
            name="appointmentDate"
            value={bookingData.appointmentDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Appointment Time:
          <input
            type="time"
            name="appointmentTime"
            value={bookingData.appointmentTime}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Disease:
          <input
            type="text"
            name="disease"
            value={bookingData.disease}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={bookingData.amount}
            onChange={handleChange}
            required
          />
        </label>
        <CardElement />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

const BookAppointment = () => {
  return (
    <Elements stripe={stripePromise}>
      <BookAppointmentForm />
    </Elements>
  );
};

export default BookAppointment;
