import { MdEmail } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import Button from '../../Button';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
// import { useHistory } from 'react-router-dom';

import useSignup from './useSignup';
function SignUpPatient() {
  const { signup } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  // const history = useHistory();

  const onSubmit = async ({ fullName, email, password }) => {
    await signup(fullName, email, password);
    reset(); // Reset the form after submission
    // history.push('/');
  };

  // function onSubmit({ fullName, email, password }) {}

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
