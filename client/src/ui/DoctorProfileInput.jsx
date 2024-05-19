function DoctorProfileInput({ label, value, id, type = 'text', ...props }) {
  return (
    <div className="flex flex-1 flex-col gap-1 tracking-wider">
      <label
        className="gap-1 text-sm font-medium text-indigo-500 peer-disabled:opacity-70"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className="flex h-10 w-full rounded-md border border-grey-400 bg-grey-300 p-3 text-sm tracking-wider text-grey-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  disabled:opacity-80 dark:border-grey-700 dark:bg-slate-800 dark:text-blue-200"
          id={id}
          defaultValue={value}
          type={type}
          name={id}
          disabled
          inputMode={type === 'number' ? 'numeric' : undefined}
          {...props}
        />
      </div>
    </div>
  );
}

export default DoctorProfileInput;
