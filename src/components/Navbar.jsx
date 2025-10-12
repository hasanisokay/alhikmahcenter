'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(true)

    return (



        <nav className="fixed top-0 left-0 w-full bg-teal-800 text-white shadow-lg z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold">Ruqyah Healing</div>
                <div className="flex space-x-6">
                    {isAdmin && <Link href={'/admin'}>Admin</Link>}
                    <Link href="/" className="hover:text-teal-200 transition duration-300">Home</Link>
                    <Link href="#about" className="hover:text-teal-200 transition duration-300">About</Link>
                    <Link href="#services" className="hover:text-teal-200 transition duration-300">Services</Link>
                    <Link href="/appointment" className="hover:text-teal-200 transition duration-300">Appointment</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;