import Link from "next/link";
import { LayoutGrid, Mail, Phone, MapPin } from "lucide-react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2d2926] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#c9a87c6a] rounded-full flex items-center justify-center">
              <Image
                src="https://i.ibb.co/4wWTc3y7/tiles-gallery-Logo.png"
                alt="Tiles Gallery Logo"
                width={40}
                height={40}
              />
              </div>
              <span className="text-xl font-bold">Tiles Gallery</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover premium ceramic, marble, mosaic, and geometric tiles for
              your dream spaces. Transform your home with our curated
              collection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#c9a87c]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tiles"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  All Tiles
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#c9a87c]">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tiles?category=Ceramic"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Ceramic Tiles
                </Link>
              </li>
              <li>
                <Link
                  href="/tiles?category=Marble"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Marble Tiles
                </Link>
              </li>
              <li>
                <Link
                  href="/tiles?category=Mosaic"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mosaic Tiles
                </Link>
              </li>
              <li>
                <Link
                  href="/tiles?category=Geometric"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Geometric Tiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#c9a87c]">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#c9a87c] shrink-0" />
                <span className="text-sm">
                  123 Tile Street, Design City, DC 12345
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#c9a87c] shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#c9a87c] shrink-0" />
                <span className="text-sm">hello@tilesgallery.com</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-[#c9a87c] transition-colors"
              >
                <FacebookIcon fontSize="small" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c9a87c] transition-colors"
              >
                <TwitterIcon fontSize="small" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c9a87c] transition-colors"
              >
                <InstagramIcon fontSize="small" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            {currentYear} Tiles Gallery. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
