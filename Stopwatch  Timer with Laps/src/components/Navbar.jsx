import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'


const Navbar = () => {

  const navLinkStyles = ({ isActive }) =>
    `px-6 py-2 font-bold underline transition-all duration-500 text-2xl ${isActive ? 'text-[#ababab]' : 'text-red-600 hover:text-[#ababab]'
    }`

  const footerLinkStyles = ({ isActive }) =>
    `px-6 py-2 font-bold underline transition-all duration-500 text-xl ${isActive ? 'text-[#ababab]' : 'text-red-600 hover:text-[#ababab]'
    }`

  return (
    <div className='h-[100vh] w-[18vw] bg-gradient-to-br from-black via-[#222121] to-[#414141] border-r border-gray-400 flex flex-col justify-between'>

      {/* 🔷 Top Logo Section */}
      <div>
        <div className='flex items-center gap-2 px-6 py-4 text-2xl font-bold text-red-600'>
          <img src="src/assets/lightning.png" alt="logo" className='w-10 invert' />
          <NavLink to="/" className={navLinkStyles}>
            Zaptime.
          </NavLink>
        </div>
        <div className='w-full h-0.5 bg-red-600'></div>
      </div>

      {/* 🔗 Navigation Links */}
      <div className='flex flex-col gap-2 mt-4'>
        <NavLink to="/" className={navLinkStyles}>Time.</NavLink>
        <NavLink to="/alarm" className={navLinkStyles}>Alarm.</NavLink>
        <NavLink to="/stopwatch" className={navLinkStyles}>Stopwatch.</NavLink>
      </div>

      {/* 📄 Footer Links (About & Contact) */}
      <div className='mb-4'>
        <div className='w-full h-0.5 bg-red-600 mb-2'></div>

        <div className='text-red-600 px-6 py-2 font-bold text-xl underline hover:text-[#ababab] transition-all duration-500'>
          <NavLink to="/about" className={footerLinkStyles}>About.</NavLink>

        </div>

        <div className='text-red-600 px-6 py-2 font-bold text-xl underline hover:text-[#ababab] transition-all duration-500'>
          <NavLink to="/contact" className={footerLinkStyles}>Contact Me.</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
