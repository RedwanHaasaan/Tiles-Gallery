"use client"

import Link from "next/link";
import { LayoutGrid, Mail, Phone, MapPin } from "lucide-react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const { ref: col1Ref, isVisible: col1Vis } = useScrollReveal({ threshold: 0.1 });
  const { ref: col2Ref, isVisible: col2Vis } = useScrollReveal({ threshold: 0.1 });
  const { ref: col3Ref, isVisible: col3Vis } = useScrollReveal({ threshold: 0.1 });
  const { ref: col4Ref, isVisible: col4Vis } = useScrollReveal({ threshold: 0.1 });
  const { ref: bottomRef, isVisible: bottomVis } = useScrollReveal({ threshold: 0.1 });

  const colClass = (vis, delay = '0s') =>
    `${vis ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`

  return (
    <footer className="bg-[#2d2926] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div
            ref={col1Ref}
            className={`space-y-4 ${colClass(col1Vis)}`}
            style={{ animationDelay: '0s', animationFillMode: 'both' }}
          >
            <div className="flex items-center gap-2 group cursor-default">
              <div className="w-10 h-10 bg-[#c9a87c6a] rounded-full flex items-center justify-center group-hover:animate-float">
                <Image src="https://i.ibb.co/4wWTc3y7/tiles-gallery-Logo.png" alt="Tiles Gallery Logo" width={40} height={40} />
              </div>
              <span className="text-xl font-bold group-hover:text-[#c9a87c] transition-colors duration-200">Tiles Gallery</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover premium ceramic, marble, mosaic, and geometric tiles for your dream spaces. Transform your home with our curated collection.
            </p>
          </div>

          {/* Quick Links */}
          <div
            ref={col2Ref}
            className={colClass(col2Vis)}
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#c9a87c]">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/tiles', label: 'All Tiles' },
                { href: '/login', label: 'Login' },
                { href: '/register', label: 'Register' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#c9a87c] hover:pl-1 transition-all duration-200 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div
            ref={col3Ref}
            className={colClass(col3Vis)}
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#c9a87c]">Categories</h3>
            <ul className="space-y-2">
              {['Ceramic', 'Marble', 'Mosaic', 'Geometric'].map((cat) => (
                <li key={cat}>
                  <Link href={`/tiles?category=${cat}`} className="text-gray-400 hover:text-[#c9a87c] hover:pl-1 transition-all duration-200 text-sm">
                    {cat} Tiles
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div
            ref={col4Ref}
            className={colClass(col4Vis)}
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#c9a87c]">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#c9a87c] shrink-0" />
                <span className="text-sm">123 Tile Street, Design City, DC 12345</span>
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
              {[
                { Icon: FacebookIcon,  label: 'Facebook'  },
                { Icon: TwitterIcon,   label: 'Twitter'   },
                { Icon: InstagramIcon, label: 'Instagram' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#c9a87c] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Icon fontSize="small" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          ref={bottomRef}
          className={`border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 ${bottomVis ? 'animate__animated animate__fadeIn' : 'opacity-0'}`}
          style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
        >
          <p className="text-gray-400 text-sm">
            {currentYear} Tiles Gallery. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { href: '#', label: 'Privacy Policy' },
              { href: '#', label: 'Terms of Service' },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="text-gray-400 hover:text-[#c9a87c] text-sm transition-colors duration-200">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
