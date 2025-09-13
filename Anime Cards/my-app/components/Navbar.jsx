"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setHasShadow(window.scrollY > 2);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkBase = "transition-colors relative";
  const getLinkClass = (href) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `${linkBase} ${isActive ? "text-gray-900 font-medium after:content-[''] after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-blue-600" : "text-gray-600 hover:text-gray-900"}`;
  };

  return (
    <nav className={`sticky top-0 z-50 supports-[backdrop-filter]:bg-gray-900/60 backdrop-blur ${hasShadow ? 'shadow-sm' : 'border-b'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo & title */}
        <div className="flex items-center gap-3">
          <Image
            src="/playing-cards-ezgif.com-effects.gif"
            alt="OtakuDeck logo"
            width={50}
            height={60}
            className="rounded-3xl"
          />

          <Link href={"/"}>
            <h2 className="text-xl sm:text-3xl font-semibold text-white/70 hover:underline tracking-tight">OtakuDeck</h2>
          </Link>
        </div>

        {/* Desktop actions */}
        <div className="flex gap-10">
          {/* Dynamic Button */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href={pathname === "/search" ? "/" : "/search"}
              className="px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-black transition-colors"
            >
              {pathname === "/search" ? "Home" : "Get Started"}
            </Link>
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/contact"
              className="px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-black transition-colors"
            >
              Contact
            </Link>
          </div>
          {/* About Button */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/about"
              className="px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-black transition-colors"
            >
              About
            </Link>
          </div>
        </div>


        {/* Mobile menu button */}
        <button
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            {isOpen ? (
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 0 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M3.75 6.75a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {isOpen && (
        <div className="md:hidden border-t bg-white/95 supports-[backdrop-filter]:bg-white/75 backdrop-blur">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
            <div className="flex flex-col gap-2 text-base">
              <Link onClick={() => setIsOpen(false)} className={getLinkClass('/')} href="/">Home</Link>
              <Link onClick={() => setIsOpen(false)} className={getLinkClass('/about')} href="/about">About</Link>
              <Link onClick={() => setIsOpen(false)} className={getLinkClass('/contact')} href="/contact">Contact</Link>
            </div>
            <div className="pt-2 space-y-2">
              <Link onClick={() => setIsOpen(false)} href={"/search"} className='inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'>Search</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
