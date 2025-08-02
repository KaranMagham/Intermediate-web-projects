import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='h-[100vh] w-[18vw] bg-black border-r border-[#2c2c2c] flex flex-col'>
            {/* Top Logo Section */}
            <div>
                <div className='flex text-xl font-bold px-6 py-3 pl-6 items-center gap-3 text-[#FFD700] underline'>
                    <img src="src/assets/money.png" alt="logo" className='w-10 invert' />
                    <Link to="/" className='hover:text-white transition-all duration-300'>
                        SpendSense.
                    </Link>
                </div>
                <div className='w-full h-0.5 bg-amber-400'></div>
            </div>
            {/* Home page Links */}
            <div>
                <div className='w-full h-0.5 bg-amber-400'></div>
                <Link to="/" className='flex text-xl font-bold px-6 py-3 pl-6 items-center gap-3 text-[#FFD700] underline hover:text-white transition-all duration-300'>
                    Money Brief.
                </Link>
                <Link to="/transactions" className='flex text-xl font-bold px-6 py-3 pl-6 items-center gap-3 text-[#FFD700] underline hover:text-white transition-all duration-300'>
                    Manage Transactions.
                </Link>
                <Link to="/overview" className='flex text-xl font-bold px-6 py-3 pl-6 items-center gap-3 text-[#FFD700] underline hover:text-white transition-all duration-300'>
                    Overview.
                </Link>
                <Link to="/" className='flex text-xl font-bold px-6 py-3 pl-6 items-center gap-3 text-[#FFD700] underline hover:text-white transition-all duration-300'>
                    Settings.
                </Link>
            </div>
            {/* Bottom About & Contact Section */}
            <div className='mb-2 flex flex-col pt-86'>
                <div className='w-full h-0.5 bg-amber-400'></div>
                <Link to="/about" className='flex text-xl font-bold px-6 py-3 pl-6 items-center gap-3 text-[#FFD700] underline hover:text-white transition-all duration-300'>
                    About.
                </Link>
                <div className='w-full h-0.5 bg-amber-400'></div>
                <Link to="/contact" className='flex text-xl font-bold px-6 py-3 pl-6 items-center gap-3 text-[#FFD700] underline hover:text-white transition-all duration-300'>
                    Contact Me.
                </Link>
            </div>
        </div>
    )
}

export default Navbar
