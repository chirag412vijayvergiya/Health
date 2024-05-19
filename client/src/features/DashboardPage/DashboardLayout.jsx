import Stats from './Stats';

function DashboardLayout() {
  return (
    <div className="mt-3 flex flex-col gap-4 md:grid md:grid-cols-2 md:grid-rows-[auto_34rem_auto] lg:grid-cols-[0.8fr_1.6fr_0.8fr_0.8fr]">
      <Stats bookings={67} confirmedStays={23} numDays={12} cabinCount={34} />
    </div>
  );
}

export default DashboardLayout;
