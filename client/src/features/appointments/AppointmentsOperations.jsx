import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function AppointmentsOperations() {
  return (
    <div className="flex flex-col items-center gap-1 md:mr-4 md:flex-row md:gap-6">
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'checked-out', label: 'Checked out' },
          { value: 'checked-in', label: 'Checked in' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />
      <SortBy
        options={[
          { value: 'Date-desc', label: 'Sort by date (recent first)' },
          { value: 'Date-asc', label: 'Sort by date (earlier first)' },
          {
            value: 'payment-desc',
            label: 'Sort by payment (high first)',
          },
          { value: 'payment-asc', label: 'Sort by payment (low first)' },
        ]}
      />
    </div>
  );
}

export default AppointmentsOperations;
