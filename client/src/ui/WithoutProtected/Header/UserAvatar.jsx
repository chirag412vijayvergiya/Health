import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import useUser from '../authentication/Patients/useUser';

function UserAvatar() {
  const userData = useUser();
  return (
    <div className="font-rubik items-center gap-x-2 lg:flex">
      {userData && (
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:r0:"
          data-slate="closed"
        >
          <div className="flex items-center gap-x-1">
            <img
              // src={userData.photo}
              src={`server/public/users/${userData.photo}`}
              loading="lazy"
              width="38"
              height="38"
              alt="user"
              className="rounded-full bg-transparent"
            />
            <IoIosArrowDown className="lucide lucide-chevron-down stroke-neutral-2 mt-3 h-4 w-4 stroke-2" />
          </div>
        </button>
      )}
    </div>
  );
}

export default UserAvatar;
