'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaCalendarAlt, FaDatabase, FaPlusCircle, FaTachometerAlt, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [open, setOpen] = useState(false); // mobile slide-over open
  const [collapsed, setCollapsed] = useState(false); // desktop collapsed (icons-only)
  const sidebarRef = useRef(null);
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape and trap focus rudimentarily
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      // set focus to sidebar for screen readers / keyboard users
      sidebarRef.current?.focus();
    } else {
      document.removeEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // click outside (clicking overlay closes)
  function onOverlayClick(e) {
    // only close when clicking the overlay itself (not the sidebar)
    if (e.target === e.currentTarget) setOpen(false);
  }

  const links = [
    { href: "/admin", label: "Dashboard", icon: <FaTachometerAlt /> },
    { href: "/admin/appointments", label: "All Appointments", icon: <FaCalendarAlt /> },
    { href: "/admin/schedule", label: "Schedule", icon: <FaPlusCircle /> },
    { href: "/admin/schedule-data", label: "Schedule Data", icon: <FaDatabase /> },
  ];

  return (
    <>
      {/* Mobile overlay (appears when sidebar open) */}
      <div
        aria-hidden={!open}
        onClick={onOverlayClick}
        className={`fixed inset-0 z-20 md:hidden transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      />

      <aside
        ref={sidebarRef}
        tabIndex={-1}
        aria-label="Sidebar"
        className={`
          fixed z-30 top-0 left-0 h-full transform transition-transform duration-300
          backdrop-blur-xl bg-white/60 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/40 shadow-xl
          ${/* Mobile width/full overlay drawer */""}
          w-64 p-5 space-y-6
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:shadow-none
          ${/* When desktop collapsed make it narrow */""}
          ${collapsed ? "md:w-20 md:px-2" : "md:w-64"}
        `}
      >
        <div className="flex items-center justify-between md:justify-between">
          <div className="flex items-center gap-3">
            <h1 className={`text-2xl font-bold truncate ${collapsed ? "hidden md:block" : ""}`}>Admin</h1>
            {/* show icon-only label when collapsed */}
            {collapsed && <span className="sr-only">Admin</span>}
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop collapse toggle */}
            {/* <button
              aria-pressed={collapsed}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden md:inline-flex p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <FaBars /> : <FaTimes />}
            </button> */}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
            >
              {open ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        <nav className="space-y-2 mt-4" aria-label="Main navigation">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)} // close on mobile after navigation
                className={`
                  flex items-center gap-3 p-2 rounded-lg transition-colors
                  ${isActive ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold" : "hover:bg-gray-200 dark:hover:bg-gray-700"}
                  ${collapsed ? "justify-center" : ""}
                `}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="flex items-center text-lg">{l.icon}</span>
                <span className={`${collapsed ? "hidden" : "block"}`}>{l.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* optional footer / quick actions */}
        <div className={`mt-auto ${collapsed ? "hidden md:block" : ""}`}>
          {!collapsed && (
            <div className="pt-4 border-t border-white/20 dark:border-gray-700/40">
              <p className="text-sm">Signed in as <strong>Mahmud Selim</strong></p>
            </div>
          )}
        </div>
      </aside>

      {/* When the sidebar is visible on mobile, add a small button (floating) to open it */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
        className="fixed bottom-6 left-6 z-10 md:hidden p-3 rounded-full shadow-lg bg-white/90 dark:bg-gray-800/80"
      >
        <FaBars />
      </button>
    </>
  );
}
