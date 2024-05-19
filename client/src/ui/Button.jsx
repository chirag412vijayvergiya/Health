import { Link } from 'react-router-dom';
function Button({ children, type, disabled }) {
  const base =
    'p-small flex items-center justify-center rounded-full font-medium';
  const styles = {
    primary: `${base} bg-indigo-400 px-6 py-2 text-grey-50 dark:bg-indigo-500`,
    secondary: `${base} bg-slate-800 px-6 py-2 text-grey-50 dark:bg-grey-200 dark:text-slate-800 `,
    third: `${base} px-6 py-[0.7rem] bg-slate-800 mx-auto text-sm text-grey-50 dark:bg-grey-200 dark:text-slate-800 `,
    reset: `p-small flex items-center justify-center rounded-md font-medium  px-6 py-2 text-grey-50 dark:bg-slate-800 bg-indigo-800 `,
    update: `p-small flex items-center justify-center rounded-md font-medium bg-slate-800 px-6 py-2 text-grey-50 bg-indigo-400 dark:bg-indigo-500 `,
    sidebar:
      'font-medium text-base subpixel-antialiased tracking-wide flex flex-row items-center gap-2',
  };
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
