function ButtonIcon({ children, onClick }) {
  return (
    <div
      className="outline-2px h-10 w-10 cursor-pointer rounded border-none
       bg-transparent p-2.5 transition  duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-400"
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default ButtonIcon;
