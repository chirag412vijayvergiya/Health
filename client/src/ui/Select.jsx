function Select({ options, value, onChange, type, ...props }) {
  return (
    <select
      value={value}
      onChange={onChange}
      {...props}
      className="rounded-sm border-solid border-slate-700 bg-grey-100 p-[0.4rem] text-xs font-semibold text-indigo-600 shadow-sm shadow-slate-500 dark:border-slate-200 dark:bg-slate-800 dark:text-indigo-300 md:p-[0.6rem] md:text-sm"
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
