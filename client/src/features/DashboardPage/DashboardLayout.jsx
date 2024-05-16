import Stats from './Stats';

function DashboardLayout() {
  return (
    <div className="mt-3 grid grid-cols-[auto_1.6fr_auto_auto] grid-rows-[auto_34rem_auto] gap-7">
      <Stats bookings={67} confirmedStays={23} numDays={12} cabinCount={34} />
    </div>
  );
}

export default DashboardLayout;
