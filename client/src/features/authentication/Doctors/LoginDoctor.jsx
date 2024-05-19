import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import Button from '../../../ui/Button';
import { useState } from 'react';
import { useDoctorLogin } from './useDoctorLogin';
import SpinnerMini from '../../../ui/SpinnerMini';
function LoginDoctor() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending } = useDoctorLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      },
    );
  }
  return (
    <form
      className="flex w-full flex-col gap-y-3 tracking-tighter"
      onSubmit={handleSubmit}
    >
      <div className="grid items-center gap-1.5"></div>

      <div className="grid items-center gap-1.5">
        <label
          className="p-small group flex items-center gap-3 font-mono text-sm font-medium leading-none text-grey-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="InputEmailD"
        >
          <MdEmail className="h-5 w-5 fill-grey-400  group-hover:fill-indigo-500" />
          Email Address
        </label>
        <div className=" items-center font-mono tracking-tighter">
          <input
            className="ring-offset-background focus-visible:ring-ring h-10 w-full rounded-md border border-grey-100 bg-grey-50 p-3 pl-10 text-sm text-grey-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-grey-700 dark:bg-grey-800 dark:text-grey-50"
            placeholder="Enter your email address "
            id="InputEmailD"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
        </div>
      </div>
      <div className="grid items-center gap-1.5">
        <label
          className="p-small group flex items-center gap-3 font-mono text-sm font-medium leading-none text-grey-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="InputPasswordD"
        >
          <RiLockPasswordFill className="h-5 w-5 fill-grey-400 group-hover:fill-indigo-500" />
          Password
        </label>
        <div className="items-center font-mono tracking-tighter">
          <input
            className="ring-offset-background focus-visible:ring-ring h-10 w-full rounded-md border border-grey-100 bg-grey-50 p-3 pl-10 text-sm text-grey-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-grey-700 dark:bg-grey-800 dark:text-grey-50"
            placeholder="Enter your Password"
            id="InputPasswordD"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />
        </div>
      </div>

      <Button type="third" class="margin-left: 4px" disabled={isPending}>
        {!isPending ? (
          <span className="font-mono">Login</span>
        ) : (
          <SpinnerMini />
        )}
      </Button>
    </form>
  );
}

export default LoginDoctor;
