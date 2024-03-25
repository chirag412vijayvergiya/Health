import { useDarkMode } from '../Context/DarkModeContext';

function Logo({ type }) {
  const { isDarkMode } = useDarkMode();
  const styles = {
    header: {
      img: 'h-[30px] pl-6',
      src: isDarkMode ? '/logo-dark-1.jpeg' : '/logo-light.jpeg',
      p: 'hidden gap-1 text-2xl font-semibold uppercase md:inline',
      span: 'text-black dark:text-white',
    },
    footer: {
      img: 'h-[30px]',
      src: `${isDarkMode ? '/logo-light.jpeg' : '/logo-dark-1.jpeg'}`,
      p: 'hidden gap-1 text-2xl font-semibold uppercase md:inline',
      span: 'text-white dark:text-black',
    },
  };

  return (
    <a href="\" className="flex items-center justify-center gap-x-3">
      <img
        src={styles[type].src}
        alt="jeeven-Logo"
        className={styles[type].img}
      />

      <p className={styles[type].p}>
        <span className={styles[type].span}>jee</span>
        <span className="text-indigo-500">van</span>
      </p>
    </a>
  );
}

export default Logo;
