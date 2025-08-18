import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#2B2950] border-b-2 border-[#a3a1d9] px-6 py-3 flex justify-between items-center">
      
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img src="src/assets/writing.png" alt="logo" className="w-8 invert" />
        <a href='#home' className="text-2xl font-bold underline text-[#a3a1d9] hover:text-[#8381b3] cursor-pointer">
          DOCNotes.
        </a>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6">
        <a href="#about" className="text-xl font-bold underline text-[#a3a1d9] hover:text-[#8381b3] transition">
          About
        </a>
        <a href="#contact" className="text-xl font-bold underline text-[#a3a1d9] hover:text-[#8381b3] transition">
          Contact
        </a>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        {menuOpen ? (
          <X size={28} className="text-[#a3a1d9] cursor-pointer" onClick={() => setMenuOpen(false)} />
        ) : (
          <Menu size={28} className="text-[#a3a1d9] cursor-pointer" onClick={() => setMenuOpen(true)} />
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-[#2B2950] border border-[#a3a1d9] rounded-md shadow-md p-4 flex flex-col gap-4 z-50 md:hidden">
          <a href="#about" onClick={() => setMenuOpen(false)} className="text-lg font-semibold text-[#a3a1d9] hover:text-[#8381b3]">About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="text-lg font-semibold text-[#a3a1d9] hover:text-[#8381b3]">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
