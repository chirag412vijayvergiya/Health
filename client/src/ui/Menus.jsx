import { createContext, useContext, useState } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { createPortal } from 'react-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  console.log('id', id);
  const { openId, close, open, setPosition } = useContext(MenusContext);
  console.log('openId', openId);
  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    console.log('openId', openId);
    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      className="lucide lucide-chevron-down stroke-neutral-2 mt-3 h-3 w-3 stroke-1"
    >
      <IoIosArrowDown />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  console.log('close', close);
  const ref = useOutsideClick({ handler: close });

  if (openId !== id) return null;

  return createPortal(
    <ul
      style={{ right: position.x - 19, top: position.y + 19 }}
      className="fixed rounded-sm bg-grey-200  text-grey-700 shadow-md dark:bg-slate-800 dark:text-grey-300"
      ref={ref}
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-[1rem] border-none bg-none p-[0.7rem_1.4rem] text-left text-sm  tracking-widest transition-all hover:bg-grey-300 hover:text-indigo-600 dark:hover:bg-slate-900 dark:hover:text-indigo-100"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
