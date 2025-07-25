import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <div className="w-full border-t-2 border-[#FBBF24] bg-[#111827] pt-4 pb-4">
        <div className="flex justify-center items-center gap-2 mb-3">
          <FaGithub className="text-[#FBBF24] text-2xl hover:text-[#FDE68A] transition duration-300 cursor-pointer" />
          <a
            href="https://github.com/KaranMagham"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FBBF24] font-semibold hover:text-[#FDE68A] transition duration-300"
          >
            Visit my GitHub
          </a>
        </div>
        <p className="text-center text-[#FDE68A] text-sm italic">
          © 2025 Karan Magham | Created for learning & practice purpose
        </p>
      </div>
      </>
  );
};

export default Footer;


