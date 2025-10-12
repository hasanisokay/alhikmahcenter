"use client";

import React from "react";

const UnderConstruction = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-[#e0e5ec] dark:bg-[#1b1b1b]
      text-gray-800 dark:text-gray-200 transition-colors duration-300"
    >
      <div
        className="p-10 rounded-3xl shadow-[9px_9px_16px_#b8bcc2,_-9px_-9px_16px_#ffffff]
        dark:shadow-[9px_9px_16px_#0e0e0e,_-9px_-9px_16px_#252525]
        max-w-md w-full text-center"
      >
        {/* Construction Icon */}
        <div
          className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center
          shadow-[inset_6px_6px_12px_#b8bcc2,_inset_-6px_-6px_12px_#ffffff]
          dark:shadow-[inset_6px_6px_12px_#0e0e0e,_inset_-6px_-6px_12px_#252525]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-gray-700 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.6}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-3-3v6m-9 4h18M3 17l9-13 9 13"
            />
          </svg>
        </div>

        {/* Text Content */}
        <h1 className="text-2xl font-semibold mb-2 tracking-wide">
          Under Construction
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Our website is currently being built to serve you better.  
          Please check back soon!
        </p>

        {/* Soft Button */}
        <button
          className="mt-6 px-6 py-2 rounded-full text-sm font-medium
          bg-[#e0e5ec] dark:bg-[#1b1b1b]
          shadow-[6px_6px_12px_#b8bcc2,_-6px_-6px_12px_#ffffff]
          dark:shadow-[6px_6px_12px_#0e0e0e,_-6px_-6px_12px_#252525]
          active:shadow-[inset_4px_4px_8px_#b8bcc2,_inset_-4px_-4px_8px_#ffffff]
          dark:active:shadow-[inset_4px_4px_8px_#0e0e0e,_inset_-4px_-4px_8px_#252525]
          transition-all duration-200"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>

      <p className="mt-6 text-xs text-gray-500 dark:text-gray-500">
        © {new Date().getFullYear()} Al Hikmah Ruqyah & Hijama Center
      </p>
    </div>
  );
};

export default UnderConstruction;
