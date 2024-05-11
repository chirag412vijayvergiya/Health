import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

function UserAvatar({ name, photo }) {
  return (
    <div className="font-rubik  items-center gap-x-4 lg:flex">
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
            src={`${photo}`}
            loading="lazy"
            width="35"
            height="35"
            alt="user"
            className="rounded-full bg-transparent"
          />
          <IoIosArrowDown className="lucide lucide-chevron-down stroke-neutral-2 mt-3 h-3 w-3 stroke-1" />
          <span className="ml-1 tracking-wider">{name}</span>
        </div>
      </button>
    </div>
  );
}

export default UserAvatar;
