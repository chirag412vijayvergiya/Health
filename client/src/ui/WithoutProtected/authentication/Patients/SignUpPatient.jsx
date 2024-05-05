import { MdEmail } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import Button from '../../../Button';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { useEffect, useState } from 'react';
import { usePatinetSignup } from './usePatientSignup';
function SignUpPatient() {
  const { signuppatient, isLoading } = usePatinetSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  // function onSubmit({ fullName, email, password }) {
  //   console.log({ fullName, email, password });
  //   signuppatient(
  //     { fullName, email, password },
  //     {
  //       onSettled: () => reset(),
  //     },
  //   );
  // }

  const onSubmit = async ({ fullName, email, password }) => {
    try {
      const response = await axios.post(
        '/api/v1/patient/signup',
        {
          name: fullName,
          email,
          password,
          passwordConfirm: password,
        },
        { withCredentials: true },
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success('Registration successful');
        navigate('/issues'); // Redirect to login page after successful registration
        console.log(response);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }

    reset();
  };

  return (
    <form
      className="flex w-full flex-col gap-y-3 tracking-tighter"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid items-center gap-1.5">
        <label
          className="p-small group flex items-center gap-3 font-mono text-sm font-medium leading-none text-grey-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="fullName"
        >
          <FaUser className="h-5 w-5 fill-grey-400  group-hover:fill-indigo-500" />
          Name
        </label>
        <div className=" items-center font-mono tracking-tighter">
          <input
            className="ring-offset-background focus-visible:ring-ring h-10 w-full rounded-md border border-grey-100 bg-grey-50 p-3 pl-10 text-sm text-grey-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-grey-700 dark:bg-grey-800 dark:text-grey-50"
            placeholder="Enter your Name"
            id="fullName"
            type="text"
            {...register('fullName', { required: 'This field is required' })}
          />
        </div>
        {errors?.fullName && (
          <span className=" mx-auto rounded-md border bg-slate-50 px-2 font-mono tracking-tighter text-red-500">
            💥 {errors.fullName.message}
          </span>
        )}
      </div>

      <div className="grid items-center gap-1.5">
        <label
          className="p-small group flex items-center gap-3 font-mono text-sm font-medium leading-none text-grey-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="email"
        >
          <MdEmail className="h-5 w-5 fill-grey-400  group-hover:fill-indigo-500" />
          Email Address
        </label>
        <div className=" items-center font-mono tracking-tighter">
          <input
            className="ring-offset-background focus-visible:ring-ring h-10 w-full rounded-md border border-grey-100 bg-grey-50 p-3 pl-10 text-sm text-grey-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-grey-700 dark:bg-grey-800 dark:text-grey-50"
            placeholder="Enter your email address "
            type="email"
            id="email"
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide a valid email address',
              },
            })}
          />
        </div>
        {errors?.email && (
          <span className=" mx-auto rounded-md border bg-slate-50 px-2 font-mono tracking-tighter text-red-500">
            💥 {errors?.email?.message}
          </span>
        )}
      </div>
      <div className="grid items-center gap-1.5">
        <label
          className="p-small group flex items-center gap-3 font-mono text-sm font-medium leading-none text-grey-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="password"
        >
          <RiLockPasswordFill className="h-5 w-5 fill-grey-400 group-hover:fill-indigo-500" />
          Password
        </label>
        <div className="items-center font-mono tracking-tighter">
          <input
            className="ring-offset-background focus-visible:ring-ring h-10 w-full rounded-md border border-grey-100 bg-grey-50 p-3 pl-10 text-sm text-grey-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-grey-700 dark:bg-grey-800 dark:text-grey-50"
            placeholder="Enter your Password"
            type="password"
            id="password"
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password needs a minimum of 8 characters',
              },
            })}
          />
        </div>
      </div>

      <div className="grid items-center gap-1.5">
        <label
          className="p-small group flex items-center gap-3 font-mono text-sm font-medium leading-none text-grey-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="passwordConfirm"
        >
          <FaUser className="h-5 w-5 fill-grey-400  group-hover:fill-indigo-500" />
          Confirm Password
        </label>
        <div className=" items-center font-mono tracking-tighter">
          <input
            className="ring-offset-background focus-visible:ring-ring h-10 w-full rounded-md border border-grey-100 bg-grey-50 p-3 pl-10 text-sm text-grey-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-grey-700 dark:bg-grey-800 dark:text-grey-50"
            placeholder="Enter Password"
            type="password"
            id="passwordConfirm"
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) =>
                value === getValues().password || 'Passwords need to match',
            })}
          />
        </div>
      </div>

      <Button type="third" class="margin-left: 4px">
        <span className="font-mono">Sign Up</span>
      </Button>
    </form>
  );
}

export default SignUpPatient;
