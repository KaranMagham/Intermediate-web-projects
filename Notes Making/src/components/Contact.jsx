import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Contact = () => {
  return (
    <footer className="w-full border-t-2 border-[#a3a1d9] bg-[#2B2950] pt-4 pb-4">
      {/* GitHub Link */}
      <div className="flex justify-center items-center gap-2 mb-3">
        <FaGithub className="text-[#a3a1d9] text-2xl hover:text-[#8381b3] transition duration-300 cursor-pointer" />
        <a
          href="https://github.com/KaranMagham"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#cdccf6] font-semibold hover:text-[#a3a1dd] transition duration-300"
        >
          Visit my GitHub
        </a>
      </div>

      {/* Footer Note */}
      <p className="text-center text-[#a3a1d9] text-sm italic">
        © 2025 Karan Magham | Created for learning & practice purpose
      </p>
    </footer>
  );
};

export default Contact;
