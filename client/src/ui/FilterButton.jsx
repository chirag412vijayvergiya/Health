import classNames from 'classnames';
function FilterButton({ active, disabled, onClick, key, label }) {
  const buttonClasses = classNames(
    ' border-none rounded-sm font-semibold tracking widest text-xs md:text-sm px-2 py-1 transition duration-300',
    {
      'bg-indigo-800 text-indigo-100': active,
      'hover:bg-indigo-600 hover:text-white': !disabled,
      'cursor-not-allowed opacity-100': disabled,
    },
  );

  return (
    <button
      className={buttonClasses}
      key={key}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default FilterButton;
