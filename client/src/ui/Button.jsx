import { Link } from 'react-router-dom';
function Button({ children, type }) {
  const base =
    'p-small flex items-center justify-center rounded-full font-medium';
  const styles = {
    primary: `${base} bg-indigo-400 px-6 py-2 text-grey-50 dark:bg-indigo-500`,
    secondary: `${base} bg-slate-800 px-6 py-2 text-grey-50 dark:bg-grey-200 dark:text-slate-800 `,
    third: `${base} px-6 py-[0.7rem] bg-slate-800 mx-auto text-sm text-grey-50 dark:bg-grey-200 dark:text-slate-800 `,
  };
  return <button className={styles[type]}>{children}</button>;
}

export default Button;
