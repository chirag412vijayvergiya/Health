import { useSearchParams } from 'react-router-dom';
import FilterButton from './FilterButton';

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get('page')) searchParams.set('page', 1);
    setSearchParams(searchParams);
  }
  return (
    <div className="border-1 flex gap-2 rounded-sm border-solid border-grey-100 bg-grey-50 p-1 py-1.5 text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-300">
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
          label={option.label}
        />
      ))}
    </div>
  );
}

export default Filter;
