import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { useCallback, useState } from 'react';
import { useCreateAppointment } from './useCreateAppointment';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function CreateAppointmentForm({
  onCloseModal,
  price,
  doctorId,
  doctorName,
  patientId,
}) {
  const { isBooking, createAppointment } = useCreateAppointment();
  const stripe = useStripe();
  const elements = useElements();

  const defaultValues = {
    patient: patientId,
    doctor: doctorId,
    appointmentDate: '',
    appointmentTime: '10:00 - 10:30',
    disease: '',
    amount: price,
    doctorName: doctorName,
  };

  const { register, handleSubmit, reset, formState } = useForm({
    mode: 'onChange',
    defaultValues: defaultValues,
  });
  const { errors } = formState;

  async function onSubmit(data) {
    console.log(data);
    if (!stripe || !elements) return;
    try {
      createAppointment(
        {
          data,
        },
        {
          onSuccess: async (session) => {
            console.log('Response from createAppointment:', session);

            if (session && session.id) {
              await stripe.redirectToCheckout({
                sessionId: session.id,
              });
            } else {
              console.error(
                'Invalid response from createAppointment:',
                session,
              );
            }

            reset();
            onCloseModal?.();
          },
          onError: (err) => {
            onCloseModal?.();
            console.error('Error creating appointment:', err);
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  }

  function onError(errors) {
    // console.log(errors);
  }

  const timeSlots = [
    '10:00 - 10:30',
    '10:30 - 11:00',
    '11:00 - 11:30',
    '11:30 - 12:00',
    '12:00 - 12:30',
    '12:30 - 13:00',
    '13:00 - 13:30',
    '13:30 - 14:00',
    '14:00 - 14:30',
    '14:30 - 15:00',
    '15:00 - 15:30',
    '15:30 - 16:00',
    '16:00 - 16:30',
    '16:30 - 17:00',
  ];

  const currentDate = new Date().toISOString().split('T')[0];
  return (
    <form
      className="relative flex flex-col overflow-hidden rounded-lg border-[1px] border-solid border-grey-100 bg-grey-0 p-[1.6rem_2.5rem] text-xl dark:border-slate-800  dark:bg-slate-900 md:w-full md:p-[2.4rem_3rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h5 className="mx-3 mb-3 items-center text-base font-semibold tracking-wider text-grey-800 dark:text-grey-100 md:mx-auto md:text-xl">
        Book your Appointment with Best Doctors
      </h5>
      <FormRow label="Doctor Name" error={errors?.doctorName?.message}>
        <input
          className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-300"
          type="text"
          id="doctorName"
          defaultValue={doctorName}
          disabled
        />
      </FormRow>

      <FormRow label="Amount" error={errors?.amount?.message}>
        <input
          className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-300"
          type="number"
          id="amount"
          defaultValue={price}
          disabled
        />
      </FormRow>
      <FormRow
        label="Appointment Date"
        error={errors?.appointmentDate?.message}
      >
        <input
          className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-transparent p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:text-grey-200"
          type="date"
          id="appointmentDate"
          // onChange={(e) => {
          //   setAppointmentDate(e.target.value);
          //   console.log(e.target.value);
          // }}
          {...register('appointmentDate', {
            required: 'This field is required',
            pattern: {
              value: /\d{4}-\d{2}-\d{2}/,
              message: 'Please enter a date in the format YYYY-MM-DD',
            },
            min: {
              value: currentDate,
              message: 'Please select a date on or after today.',
            },
          })}
          disabled={isBooking}
        />
      </FormRow>
      <FormRow
        label="Appointment Time"
        error={errors?.appointmentTime?.message}
      >
        <select
          className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-300"
          id="appointmentTime"
          type="text"
          // onChange={(e) => setAppointmentTime(e.target.value)}
          disabled={isBooking}
          {...register('appointmentTime', {
            required: 'This field is required',
          })}
        >
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="Disease" error={errors?.disease?.message}>
        <textarea
          className="h-[5rem] w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.8rem_1.2rem] text-sm tracking-wide shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-grey-300"
          placeholder="Please describe your symptoms and concerns"
          disabled={isBooking}
          id="disease"
          {...register('disease', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <div className="flex items-center justify-center gap-3 p-[1.2rem_0] md:justify-end">
        <Button
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isBooking}
        >
          Back
        </Button>
        <Button type="update" disabled={isBooking}>
          Create Appointment
        </Button>
      </div>
    </form>
  );
}

function CreateAppointmentWrapper(props) {
  return (
    <Elements stripe={stripePromise}>
      <CreateAppointmentForm {...props} />
    </Elements>
  );
}

export default CreateAppointmentWrapper;
