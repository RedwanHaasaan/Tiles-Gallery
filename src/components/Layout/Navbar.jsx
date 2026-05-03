"use client";

import { Home, LayoutGrid, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/tiles', label: 'All Tiles', icon: LayoutGrid },
  ]

  return (
    <nav className="bg-[#f8f6f3] border-b border-[#e0dcd6] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Row */}
        <div className="flex items-center justify-between h-16">
          {/* LEFT: Logo + Name */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <Image
                src="/tiles-gallery-logo.png"
                alt="Tiles Gallery Logo"
                width={40}
                height={40}
              />
            </div>
            <span className="text-xl font-bold text-[#2d2926]">
              Tiles Gallery
            </span>
          </Link>

          {/* MIDDLE: Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#2d2926] font-medium hover:text-[#c9a87c] transition flex flex-row gap-2 items-center"
              >
                <link.icon className="w-5 h-5"/>
                {link.label}
              </Link>
            ))}
          </div>

          {/* RIGHT: Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 rounded-md text-[#2d2926] hover:bg-[#e8e4df]"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-md bg-[#2d2926] text-white hover:bg-black"
            >
              Register
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden mt-2 border-t border-[#e0dcd6] bg-[#f8f6f3]">
            {/* NAV LINKS */}
            <div className="flex flex-col items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-[#2d2926] font-medium hover:bg-[#e8e4df] transition flex flex-row gap-2 items-center"
                >
                  <link.icon className="w-5 h-5"/>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* AUTH SECTION */}
            <div className="border-t border-[#e0dcd6] px-4 py-3 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="w-full py-2 text-center border border-[#2d2926] rounded-md text-[#2d2926] hover:bg-[#e8e4df] transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="w-full py-2 text-center rounded-md bg-[#2d2926] text-white hover:bg-[#1a1a1a] transition"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
