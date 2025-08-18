import React from 'react';
import Link from "next/link";

const Navbar = () => {
    return (
        <>
            {/* Navbar main container */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
                <div className="flex ml-4 items-center space-x-3">
                    {/* Title & Logo */}
                    <video
                        width="40"
                        height="40"
                        style={{
                            background:
                                "transparent url('https://cdn-icons-png.flaticon.com/512/12817/12817465.png') 50% 50% / contain no-repeat",
                        }}
                        className='rounded-full'
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source
                            src="https://cdn-icons-mp4.flaticon.com/512/12817/12817465.mp4"
                            type="video/mp4"
                        />
                    </video>
                    {/* Title and tagline */}
                    <div className="flex flex-col">
                        <Link href="/">
                            <h1 className="font-bold text-2xl hover:underline cursor-pointer hover:text-amber-300 transition-colors duration-200">
                                YummiFy.
                            </h1>
                        </Link>
                        <h3 className="text-xs italic text-gray-300">“Search. Cook. Enjoy.”</h3>
                    </div>
                </div>

                <div className="mr-5">
                    <ul className="flex space-x-6">
                        <Link href="/">
                            <li className="hover:underline cursor-pointer hover:text-amber-300 text-lg transition-colors duration-200">
                                Home
                            </li>
                        </Link>
                        <Link href="/search">
                            <li className="hover:underline cursor-pointer hover:text-amber-300 text-lg transition-colors duration-200">
                                Search
                            </li>
                        </Link>
                        {/* <Link href="/recipes/${recipes.id}">
                            <li className="hover:underline cursor-pointer hover:text-amber-300 text-lg transition-colors duration-200">
                                Details
                            </li>
                        </Link> */}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
