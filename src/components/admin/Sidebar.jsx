"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaCalendarAlt,
  FaDatabase,
  FaPlusCircle,
  FaTachometerAlt,
  FaTimes,
} from "react-icons/fa";
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
      sidebarRef.current?.focus();
    } else {
      document.removeEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // click outside (clicking overlay closes)
  function onOverlayClick(e) {
    if (e.target === e.currentTarget) setOpen(false);
  }

  const links = [
    { href: "/admin", label: "Dashboard", icon: <FaTachometerAlt /> },
    { href: "/admin/appointments", label: "All Appointments", icon: <FaCalendarAlt /> },
    { href: "/admin/schedule", label: "Schedule", icon: <FaPlusCircle /> },
    { href: "/admin/schedule-data", label: "Schedule Data", icon: <FaDatabase /> },
  ];
  const logOut = async () => {
    const res = await fetch("/api/log-out", {
      credentials: "include",
      method:"POST"
    });
    const json = await res.json();
    window.location.reload();
  };
  return (
    <>
      {/* Mobile overlay (appears when sidebar open) */}
      <div
        aria-hidden={!open}
        onClick={onOverlayClick}
        className={`fixed inset-0 z-20 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(15,23,42,0.65)" }}
      />

      <aside
        ref={sidebarRef}
        tabIndex={-1}
        aria-label="Sidebar"
        className={`
          fixed z-30 top-0 left-0 h-full transform transition-transform duration-300
          bg-gradient-to-b from-sky-500/90 via-indigo-700/95 to-slate-900/95
          text-white shadow-2xl border-r border-white/15
          w-72 p-5 space-y-6
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0
          ${collapsed ? "md:w-20 md:px-3" : "md:w-72"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo circle */}
            <div className="h-9 w-9 rounded-2xl bg-white/15 flex items-center justify-center shadow-inner">
              <span className="text-lg font-bold tracking-tight">A</span>
            </div>
            <div className={`${collapsed ? "hidden md:block" : ""}`}>
              <h1 className="text-xl font-semibold tracking-wide">Admin Panel</h1>
              <p className="text-xs text-slate-100/70">
                Appointment Dashboard
              </p>
            </div>
            {collapsed && <span className="sr-only">Admin Panel</span>}
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop collapse toggle */}
            {/* <button
              aria-pressed={collapsed}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden md:inline-flex p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <FaBars size={16} /> : <FaTimes size={16} />}
            </button> */}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
            >
              {open ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="space-y-2 mt-4" aria-label="Main navigation">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`
                  group flex items-center gap-3 rounded-2xl px-3 py-2.5
                  text-sm font-medium tracking-wide
                  transition-all duration-200
                  ${collapsed ? "justify-center" : ""}
                  ${
                    isActive
                      ? "bg-white/95 text-slate-900 shadow-lg shadow-sky-500/40"
                      : "text-sky-50/80 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <span
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-xl text-base
                    transition-all duration-200
                    bg-white/10 group-hover:bg-white/20
                    ${
                      isActive
                        ? "bg-gradient-to-br from-sky-500 to-indigo-500 text-white"
                        : ""
                    }
                  `}
                >
                  {l.icon}
                </span>
                <span
                  className={`whitespace-nowrap ${
                    collapsed ? "hidden md:inline-block" : "inline-block"
                  }`}
                >
                  {l.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`mt-auto pt-4 border-t border-white/15`}>
          {!collapsed && (
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-slate-100/70">Signed in as</p>
                <p className="text-sm font-semibold">Mahmud Selim</p>
              </div>
              <div onClick={()=>logOut()} className="px-3 py-1.5 cursor-pointer rounded-full bg-white/15 text-[0.7rem] uppercase tracking-wide">
                Log Out
              </div>
            </div>
          )}
          {collapsed && (
            <div className="hidden md:flex justify-center">
              <div className="mt-3 px-2 py-1 rounded-full bg-white/15 text-[0.65rem] uppercase tracking-wide">
                Admin
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Floating open button on mobile */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
        className="fixed bottom-6 left-6 z-10 md:hidden p-3 rounded-full shadow-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white"
      >
        <FaBars />
      </button>
    </>
  );
}
