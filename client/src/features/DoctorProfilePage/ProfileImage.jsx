function ProfileImage({ doctor }) {
  return (
    <div className="flex w-full flex-col">
      <div className="m-auto mt-1 ">
        <img
          className="mb-8 h-32 w-32 rounded-full shadow-xl shadow-slate-300 dark:shadow-gray-800"
          src={doctor.photo}
          alt={doctor.name + 's photo'}
        />
      </div>
    </div>
  );
}
export default ProfileImage;
