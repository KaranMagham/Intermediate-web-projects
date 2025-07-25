import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className='p-3 w-full bg-gradient-to-r from-blue-700 via-pink-500 to-purple-400 h-16 flex justify-between items-center'>
            <div className='flex items-center gap-3'>
                <img 
                    className='w-10 cursor-pointer' 
                    src="src/assets/nest_farsight_weather_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" 
                    alt="logo" 
                />
                <p className='font-bold text-white text-2xl cursor-pointer hover:underline hover:text-pink-300'>
                    Cloudy.
                </p>
            </div>

            <ul className='flex items-center font-semibold text-lg gap-6 text-white'>
                <li className='cursor-pointer hover:underline hover:text-blue-600'>Home</li>
                <li className='cursor-pointer hover:underline hover:text-blue-600'>Search</li>
                <li className='cursor-pointer hover:underline hover:text-blue-600'>About</li>
                <li className='cursor-pointer hover:underline hover:text-blue-600'>Contact</li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
