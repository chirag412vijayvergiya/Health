import { useState } from 'react';
import Button from '../../../ui/Button';
import { useUpdateUserData } from './useUpdateUserData';
import { useUser } from './useUser';

function Updateuserdata() {
  const {
    user: {
      data: {
        data: {
          name: currentFullName,
          email: currentEmail,
          role: currentRole,
          gender: currentGender,
          photo: currentPhoto,
        },
      },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUserData();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [Gender, setGender] = useState(currentGender);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(avatar, Gender, fullName);

    updateUser(
      { fullName, Gender, photo: avatar },
      {
        onSuccess: () => {
          console.log('User account successfully updated', avatar);
          e.target.reset();
        },
      },
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
    setGender(currentGender);
  }

  console.log(
    currentPhoto,
    currentFullName,
    currentEmail,
    currentRole,
    currentGender,
  );
  return (
    fullName !== undefined && (
      <form className="m-8 flex " onSubmit={handleSubmit}>
        <div className="h-10 w-1/3">
          <span className="relative my-6 ml-10 flex shrink-0 overflow-hidden rounded-full hover:brightness-90">
            <img
              src={
                preview ||
                `${import.meta.env.VITE_API_BASE_URL}/users/${currentPhoto}`
              }
              alt={`Avatar of ${currentFullName}`}
              className=" aspect-square  rounded-full border object-cover"
              height="115"
              width="115"
            />
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUpdating}
            className="mt-2 w-[12.9rem] cursor-pointer rounded-sm bg-brand-600 px-2 py-2 font-mono text-sm tracking-tighter text-brand-50 transition duration-200 hover:bg-brand-700"
          />
        </div>
        <div className="flex w-2/3 flex-col gap-y-3">
          <div className="flex gap-6 ">
            <div className="flex flex-1 flex-col gap-1">
              <label className="font-mono text-lg font-medium text-stone-900 dark:text-stone-300">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue={fullName}
                  id="fullName"
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isUpdating}
                  className="w-[12.7rem] rounded-sm border border-grey-300 bg-grey-0 p-2 pl-3 font-mono tracking-tighter  shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label className="font-mono text-lg font-medium text-stone-900 dark:text-stone-300">
                Email
              </label>
              <div className="">
                <input
                  type="text"
                  defaultValue={currentEmail}
                  disabled
                  className="w-[12.7rem] rounded-sm border border-grey-300 bg-grey-0 p-2 pl-3 font-mono tracking-tighter  opacity-50 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-1 flex-col gap-1">
              <label className="font-mono text-lg font-medium text-stone-900 dark:text-stone-300">
                Role
              </label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue={currentRole}
                  id="Role"
                  disabled
                  className="w-[12.7rem] rounded-sm border border-grey-300 bg-grey-0 p-2 pl-3 font-mono tracking-tighter  opacity-50 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label className="font-mono text-lg font-medium text-stone-900 dark:text-stone-300">
                Gender
              </label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue={Gender}
                  id="Gender"
                  onChange={(e) => setGender(e.target.value)}
                  disabled={isUpdating}
                  className="w-[12.7rem] rounded-sm border border-grey-300 bg-grey-0 p-2 pl-3 font-mono tracking-tighter  shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 "
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-5">
            <Button
              type="reset"
              variation="secondary"
              disabled={isUpdating}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button disabled={isUpdating} type="update">
              Update account
            </Button>
          </div>
        </div>
      </form>
    )
  );
}

export default Updateuserdata;
