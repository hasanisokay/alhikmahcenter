'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';
import { IoHeadsetSharp } from 'react-icons/io5';
import { BsFiletypePdf } from 'react-icons/bs';
import { MdEventAvailable } from 'react-icons/md';
import { FaBlog } from 'react-icons/fa';
import alhikmahLogo from './../../public/images/alhikmah.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Audio', icon: IoHeadsetSharp, href: '/audio' },
    { name: 'PDF', icon: BsFiletypePdf, href: '/pdf' },
    { name: 'Book Appointment', icon: MdEventAvailable, href: '/book-appointment' },
    { name: 'Blog', icon: FaBlog, href: '/blog' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-lg'
          : 'bg-white/95 backdrop-blur-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group relative z-10"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <Image
                src={alhikmahLogo}
                alt="Al Hikmah Logo"
                className="object-contain"
                loading='eager'
                width={1000}
                height={1000}
              />
            </div>
            <div >
              <h1 className="text-xl font-bold text-emerald-900 leading-tight">AL-HIKMAH</h1>
              <p className="text-xs text-emerald-600 font-medium tracking-wider">RUQYAH & HIJAMA</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative px-4 py-2 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${isActive ? 'bg-gradient-to-r from-emerald-50 to-teal-50' : ''
                    }`}
                  style={{
                    animation: `fadeInDown 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 transition-opacity duration-300 ${isActive ? 'opacity-10' : 'opacity-0 group-hover:opacity-10'
                    }`} />
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transform transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />

                  <div className="flex items-center space-x-2 relative">
                    <item.icon className={`w-4 h-4 transition-colors duration-300 transform group-hover:rotate-12 ${isActive ? 'text-emerald-700' : 'text-gray-600 group-hover:text-emerald-700'
                      }`} />
                    <span className={`text-sm lg:text-base font-medium transition-colors duration-300 ${isActive ? 'text-emerald-900 font-semibold' : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                      {item.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 rounded-lg flex items-center justify-center group hover:bg-gray-100 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <HiMenu
                className={`absolute inset-0 w-6 h-6 text-gray-700 transition-all duration-300 transform ${isOpen
                    ? 'rotate-90 opacity-0 scale-0'
                    : 'rotate-0 opacity-100 scale-100'
                  }`}
              />
              <HiX
                className={`absolute inset-0 w-6 h-6 text-gray-700 transition-all duration-300 transform ${isOpen
                    ? 'rotate-0 opacity-100 scale-100'
                    : '-rotate-90 opacity-0 scale-0'
                  }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="py-4 space-y-2">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group relative flex items-center space-x-3 px-4 py-3 rounded-xl overflow-hidden transition-all duration-300 ${isActive
                      ? 'bg-gradient-to-r from-emerald-50 to-teal-50'
                      : 'hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50'
                    }`}
                  style={{
                    animation: isOpen
                      ? `slideInLeft 0.4s ease-out ${index * 0.1}s both`
                      : 'none',
                  }}
                >
                  <div className={`absolute left-0 w-1 h-full bg-gradient-to-b from-emerald-600 to-teal-600 transform transition-transform duration-300 origin-top ${isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                    }`} />

                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${isActive
                      ? 'from-emerald-100 to-teal-100'
                      : 'from-emerald-50 to-teal-50'
                    }`}>
                    <item.icon className={`w-5 h-5 transition-colors duration-300 ${isActive
                        ? 'text-emerald-700'
                        : 'text-emerald-600 group-hover:text-emerald-700'
                      }`} />
                  </div>

                  <span className={`text-base font-medium transition-colors duration-300 ${isActive
                      ? 'text-emerald-900 font-semibold'
                      : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;