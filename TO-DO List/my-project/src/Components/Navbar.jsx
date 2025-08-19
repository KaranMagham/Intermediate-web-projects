import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-600 text-amber-100 p-2 border-b-2 border-black shadow-md">
      <div className="flex items-center gap-3">
        <img
          src="/src/Components/contract_edit_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
          alt="Logo"
          className="fill-amber-100 w-6 h-6 ml-8"
        />
        <span className="cursor-pointer hover:underline text-xl font-bold italic transition-all duration-300">
          TASKIFY
        </span>
      </div>

      <ul className="flex gap-15 mr-10 list-disc">
        <li className="cursor-pointer hover:underline hover:font-bold transition-all duration-300">
          Home
        </li>
        {/* <li className="cursor-pointer hover:underline hover:font-bold transition-all duration-300">
          Task
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
