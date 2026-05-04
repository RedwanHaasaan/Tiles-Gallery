"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Home, LayoutGrid, LogIn, LogOut, Menu, User, UserPlus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, isPending } = useSession();

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/tiles", label: "All Tiles", icon: LayoutGrid },
  ];
  const authLinks = session
    ? [{ href: "/my-profile", label: "My Profile", icon: User }]
    : [
        { href: "/login", label: "Login", icon: LogIn },
        { href: "/register", label: "Register", icon: UserPlus },
      ];

  // Scroll listener for navbar shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      router.push("/");
    } catch {
      toast.error("Failed to sign out");
    }
  };

  return (
    <nav
      className={`bg-[#f8f6f3] border-b border-[#e0dcd6] sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Row */}
        <div className="flex items-center justify-between h-16">

          {/* LEFT: Logo + Name */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:animate-float">
              <Image
                src="https://i.ibb.co/4wWTc3y7/tiles-gallery-Logo.png"
                alt="Tiles Gallery Logo"
                width={40}
                height={40}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-xl font-bold text-[#2d2926] group-hover:text-[#c9a87c] transition-colors duration-200">
              Tiles Gallery
            </span>
          </Link>

          {/* MIDDLE: Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#2d2926] font-medium hover:text-[#c9a87c] transition-colors duration-200 flex flex-row gap-2 items-center nav-link-animated"
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* RIGHT: Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <span className="loading loading-spinner loading-sm text-[#2d2926]"></span>
            ) : session ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div className="avatar placeholder">
                    <div className="bg-[#2d2926] text-[#c9a87c] rounded-full w-10 ring-2 ring-transparent group-hover:ring-[#c9a87c] transition-all duration-300">
                      {session.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          className="rounded-full"
                          width={100}
                          height={100}
                        />
                      ) : (
                        <span className="text-sm font-medium">
                          {session.user?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[#2d2926] font-medium hidden lg:block group-hover:text-[#c9a87c] transition-colors duration-200">
                    {session.user?.name || "User"}
                  </span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-1 menu p-2 shadow-lg bg-white rounded-lg w-52 mt-2 border border-[#e0dcd6] animate__animated animate__fadeInDown animate__faster"
                >
                  <li>
                    <Link
                      href="/my-profile"
                      className="flex items-center gap-2 text-[#2d2926] hover:bg-[#f0ebe5] hover:text-[#c9a87c] transition-colors duration-150"
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 text-[#2d2926] hover:bg-[#f0ebe5] hover:text-red-500 transition-colors duration-150"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn btn-ghost text-[#2d2926] hover:bg-[#e8e4df] hover:text-[#c9a87c] transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn bg-[#2d2926] text-white hover:bg-[#c9a87c] border-none transition-all duration-300 hover:scale-105"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#e8e4df] transition-colors duration-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open
              ? <X className="w-5 h-5 text-[#2d2926] animate__animated animate__rotateIn animate__faster" />
              : <Menu className="w-5 h-5 text-[#2d2926] animate__animated animate__rotateIn animate__faster" />
            }
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden mt-2 border-t border-[#e0dcd6] bg-[#f8f6f3] animate__animated animate__slideInDown animate__faster">
            {/* NAV LINKS */}
            <div className="flex flex-col items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="w-full px-4 py-3 text-[#2d2926] font-medium hover:bg-[#e8e4df] hover:text-[#c9a87c] transition-all duration-200 flex flex-row gap-2 items-center"
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* AUTH SECTION */}
            <div className="border-t border-[#e0dcd6] px-4 py-3 flex flex-col gap-2">
              {isPending ? (
                <div className="flex justify-center py-4">
                  <span className="loading loading-spinner loading-sm text-[#2d2926]"></span>
                </div>
              ) : session ? (
                <>
                  <div className="px-4 py-2 flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-[#2d2926] text-[#c9a87c] rounded-full w-10">
                        {session.user?.image ? (
                          <Image
                            src={session.user.image}
                            alt={session.user.name || "User"}
                            className="rounded-full"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <span className="text-sm font-medium">
                            {session.user?.name?.charAt(0).toUpperCase() || "U"}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[#2d2926] font-medium">
                      {session.user?.name || "User"}
                    </span>
                  </div>
                  <Link
                    href="/my-profile"
                    className="flex items-center gap-3 px-4 py-3 text-[#2d2926] hover:bg-[#e8e4df] hover:text-[#c9a87c] rounded-lg transition-colors duration-200"
                    onClick={() => setOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); setOpen(false) }}
                    className="flex items-center gap-3 px-4 py-3 text-[#2d2926] hover:bg-[#e8e4df] hover:text-red-500 rounded-lg transition-colors duration-200 text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  {authLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 text-[#2d2926] hover:bg-[#e8e4df] hover:text-[#c9a87c] rounded-lg transition-colors duration-200"
                      onClick={() => setOpen(false)}
                    >
                      <link.icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
