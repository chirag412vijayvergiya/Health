function FormRow({ label, error, children }) {
  return (
    <div className="flex-col  border-b py-3 dark:border-slate-600  ">
      <div className="grid grid-cols-[10rem_1fr_1fr] items-center gap-[3.5rem] ">
        {label && (
          <label
            htmlFor={children.props.id}
            className="font-sans text-base font-medium tracking-widest dark:text-grey-300"
          >
            {label}
          </label>
        )}
        {children}
      </div>
      {error && (
        <span className="text-sm tracking-wider text-red-700">💥 {error}</span>
      )}
    </div>
  );
}

export default FormRow;
