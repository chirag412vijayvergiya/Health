import DoctorProfileInput from '../../ui/DoctorProfileInput';

function Specialization({ doctor }) {
  // Split specializations into pairs of two
  const specializationPairs = [];
  for (let i = 0; i < doctor.specialization.length; i += 2) {
    specializationPairs.push(doctor.specialization.slice(i, i + 2));
  }
  return (
    <div
      // className=" flex w-full flex-col gap-6 rounded-2xl border border-gray-300 bg-gray-50 p-6 tracking-widest shadow-sm  shadow-grey-400 dark:border-slate-800 dark:bg-slate-900 dark:shadow-grey-900 md:w-1/2 md:overflow-scroll"
      // style={{ height: '28vh', overflowY: 'auto' }}
      className=" mb-2 flex h-auto w-full flex-col gap-6 rounded-2xl border border-gray-300 bg-gray-50 p-6 tracking-widest shadow-sm shadow-grey-400 dark:border-slate-800 dark:bg-slate-900 dark:shadow-grey-900 md:mb-0 md:h-[28vh] md:w-1/2 md:overflow-y-auto"
    >
      <p
        className="mx-[4rem] gap-y-3 rounded-xl border-2 border-yellow-500 bg-green-300 px-9 text-sm font-semibold  uppercase text-grey-800 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:mx-[6.5rem] "
        htmlFor={doctor.id}
      >
        Specialization
      </p>
      {specializationPairs.map((pair, index) => (
        <div className="flex gap-6" key={index}>
          {pair.map((specialization, subIndex) => (
            <DoctorProfileInput
              key={subIndex}
              label={`Specialization ${index * 2 + subIndex + 1}`}
              value={specialization}
              id={`specialization-${index * 2 + subIndex}`}
              type="text"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
export default Specialization;
