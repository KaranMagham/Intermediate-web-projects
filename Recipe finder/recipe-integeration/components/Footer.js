import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container flex flex-col gap-6 justify-center sm:flex-row items-center  px-4">
                {/* Left Side */}
                <p className="text-center text-sm">
                    © {new Date().getFullYear()} YummiFy. All rights reserved.
                </p>
                {/* Right Side */}
                <p className="text-center text-base font-semibold">
                    Made with ❤️ by <span className="text-amber-300">M_Karan</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer
