import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className="bg-[#111827] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img className="w-10 cursor-pointer" src="src/assets/honey.png" alt="hive" />
                    <p className="font-bold text-[#FBBF24] text-2xl cursor-pointer hover:underline hover:text-[#FDE68A]">
                        KeyHive.
                    </p>
                </div>
                <ul className="flex items-center font-semibold text-lg gap-10 text-[#FBBF24]">
                    <li>
                        <a href="#home" className="hover:underline hover:text-[#FDE68A]">Home</a>
                    </li>
                    <li>
                        <a href="#about" className="hover:underline hover:text-[#FDE68A]">About</a>
                    </li>
                    <li>
                        <a href="#footer" className="hover:underline hover:text-[#FDE68A]">Contact</a>
                    </li>
                </ul>

            </nav>
        </div>
    )
}

export default Navbar   