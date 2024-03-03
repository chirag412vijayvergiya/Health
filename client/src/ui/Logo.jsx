import { useDarkMode } from '../Context/DarkModeContext';

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? '/logo-dark.jpeg' : '/logo-light.jpeg';
  return (
    <div className="flex items-center justify-center gap-x-3">
      <img src={src} alt="jeeven-Logo" className=" h-[30px] pl-6" />
      <p className="gap-1 text-2xl font-semibold uppercase">
        <span className="text-black dark:text-white">jee</span>
        <span className="text-indigo-500">ven</span>
      </p>
    </div>
  );
}

export default Logo;
