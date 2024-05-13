import CardBod from './CardBod';
import { useDoctors } from './useDoctors';

function DoctorList() {
  const { isPending, doctors } = useDoctors();
  if (isPending) return <div>Loading...</div>;
  if (!doctors) return <div>No doctors found</div>;

  console.log(doctors);
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
      {doctors.map((doctor, index) => (
        <CardBod
          key={doctor.id}
          name={doctor.name}
          email={doctor.email}
          ratings={doctor.ratingsAverage}
          ratingsQuantity={doctor.ratingsQuantity}
          photo={doctor.photo}
          role={doctor.role}
        />
      ))}
    </div>
  );
}

export default DoctorList;
