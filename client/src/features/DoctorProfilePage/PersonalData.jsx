import DoctorProfileInput from '../../ui/DoctorProfileInput';

function PersonalData({ doctor }) {
  return (
    <div
      className=" flex w-1/2 flex-col gap-6 rounded-2xl border border-gray-300 bg-gray-50 p-6 tracking-wider shadow-sm shadow-grey-400 dark:border-slate-800 dark:bg-slate-900 dark:shadow-grey-900"
      style={{ height: '28vh', overflowY: 'auto' }}
    >
      <div className="flex gap-6">
        <DoctorProfileInput
          label="FullName"
          value={doctor.name}
          id="name"
          type="name"
        />
        <DoctorProfileInput
          label="Email Id"
          value={doctor.email}
          id="email"
          type="email"
        />
      </div>
      <div className="flex gap-6">
        <DoctorProfileInput
          label="Gender"
          value={doctor.gender}
          id="gender"
          type="gender"
        />
        <DoctorProfileInput
          label="Phone No."
          value={`+91-${doctor.phone}`}
          id="mobileNumber"
          type="text"
          inputMode="numeric"
        />
      </div>
    </div>
  );
}
export default PersonalData;
