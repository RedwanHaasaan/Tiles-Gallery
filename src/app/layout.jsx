import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import PageLoader from "@/components/UI/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tiles Gallery | Premium Ceramic & Marble Tiles",
  description:
    "Discover our curated collection of premium ceramic, marble, mosaic, and geometric tiles. Transform your space with elegant designs.",
  keywords:
    "tiles, ceramic, marble, mosaic, geometric, home decor, interior design",
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="tiles"
      className="bg-cream min-h-full flex flex-col"
      lang="en"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}
      >
        <PageLoader />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          theme="colored"
        />
      </body>
    </html>
  );
}
