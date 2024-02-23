function ButtonIcon({ children }) {
  return (
    <div
      className="cursor-pointer rounded border-none bg-transparent p-2.5
      transition duration-200 ease-in-out hover:bg-gray-200"
    >
      {children}
    </div>
  );
}

export default ButtonIcon;
