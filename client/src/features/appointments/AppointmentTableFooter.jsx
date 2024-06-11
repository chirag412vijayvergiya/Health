import Pagination from '../../ui/Pagination';

function AppointmentTableFooter() {
  return (
    <footer className="flex w-full justify-center bg-grey-300 px-6 py-[0.6rem] dark:bg-slate-900">
      <Pagination count={10} />
    </footer>
  );
}

export default AppointmentTableFooter;
