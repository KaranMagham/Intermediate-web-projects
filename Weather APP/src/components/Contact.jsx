import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="w-full border-t-2 border-blue-700 mt-16 pt-6 pb-4 bg-gradient-to-b from-blue-400 via-pink-300 to-purple-400">
            <div className="flex justify-center items-center gap-2 mb-4">
                <FaGithub className="text-white text-2xl hover:text-pink-500 cursor-pointer" />
                <a
                    href="https://github.com/KaranMagham"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold hover:text-pink-500 transition"
                >
                    Visit my GitHub
                </a>
            </div>
            <p className="text-center text-white text-sm italic">
                © 2025 Karan Magham | Created for learning & practice purpose
            </p>
        </div>
    );
};

export default Contact;

