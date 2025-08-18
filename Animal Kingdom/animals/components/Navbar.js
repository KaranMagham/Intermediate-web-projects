"use client";
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname();

  const LinkStyles = (href) =>
    `px-6 py-2 font-bold underline transition-all duration-500 text-2xl ${pathname === href ? 'text-[#ababab]' : 'text-red-600 hover:text-[#ababab]'
    }`;

  const footerLinkStyles = (href) =>
    `px-6 py-2 font-bold underline transition-all duration-500 text-xl ${pathname === href ? 'text-[#ababab]' : 'text-red-600 hover:text-[#ababab]'
    }`;

  return (
    <div className='sticky top-0 h-screen w-[16vw] bg-gradient-to-br from-black via-[#222121] to-[#414141] border-r border-gray-400 flex flex-col'>
      {/* 🔷 Top Logo Section */}
      <div>
        <div className='flex items-center px-4 py-4 text-2xl font-bold text-red-600'>
          <img src="https://cdn-icons.flaticon.com/svg/10506/10506853.svg?token=exp=1755307334~hmac=c165e2fc4bf112e3869b9df09a2f6d30" alt="logo" className='w-10 invert' />
          <Link href="/" className={LinkStyles('/')}>
            PawPedia.
          </Link>
        </div>
        <div className='w-full h-0.5 bg-red-600'></div>
      </div>

      {/* 🔗 Navigation Links */}
      <div className='flex flex-col gap-2 mt-4 flex-grow justify-start'>
        <Link href="/" className={LinkStyles('/')}>Search.</Link>
        <Link href="/detail" className={LinkStyles('/detail')}>Detail.</Link>
      </div>

      {/* 📄 Footer Links (About & Contact) */}
      <div className='mb-8 flex flex-col items-start px-6'>
        <div className='w-full h-0.5 bg-red-600 mb-4'></div>
        <Link href="/about" className={footerLinkStyles('/about')}>About.</Link>
        <Link href="/contact" className={footerLinkStyles('/contact')}>Contact Me.</Link>
      </div>
    </div>
  )
}

export default Navbar
