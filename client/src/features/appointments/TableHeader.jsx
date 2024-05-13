function TableHeader({ heading }) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-50"
    >
      {heading}
    </th>
  );
}

export default TableHeader;
