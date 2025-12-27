"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import alhikmahLogo from "./../../public/images/alhikmah.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  // Logo slide-in animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* NAVBAR */}
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between  bg-white/90 backdrop-blur px-6 py-3 shadow-sm">
            {/* Logo */}
            <div
              className={`flex items-center gap-3 transition-all duration-700 ease-out
              ${showLogo ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}
            >
              <Image
                src={alhikmahLogo}
                alt="Al Hikmah"
                className="h-9 w-auto"
                priority
              />
              <span className="font-semibold text-gray-900 whitespace-nowrap">
                Al Hikmah
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Home
              </Link>

              <Link
                href="/book-appointment"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Book Appointment
              </Link>

              <Link
                href="https://ruqyahbd.org/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Blog ↗
              </Link>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link
                href="/book-appointment"
                className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600 transition"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden rounded-full p-2 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-50 bg-white transition-all duration-500 ease-out md:hidden
        ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div
            className={`flex items-center gap-3 transition-all duration-700
            ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <Image
              src={alhikmahLogo}
              alt="Al Hikmah"
              className="h-9 w-auto"
            />
            <span className="font-semibold text-gray-900">Al Hikmah</span>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Links */}
        <div
          className={`flex flex-col gap-6 px-6 py-10 transition-all duration-700 delay-100
          ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium"
          >
            Home
          </Link>

          <Link
            href="/book-appointment"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium"
          >
            Book Appointment
          </Link>

          <Link
            href="https://ruqyahbd.org/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-medium"
          >
            Blog ↗
          </Link>

          {/* Highlight CTA */}
          <Link
            href="/book-appointment"
            onClick={() => setMenuOpen(false)}
            className="mt-8 inline-flex justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-600 transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}
