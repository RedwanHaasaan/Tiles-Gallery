// /app/not-found.js
import LottiePlayer from "@/components/Lottie/LottiePlayer";
import Link from "next/link";
import notFoundAnimation from "@/assets/404-not-found.json"
export default function NotFound() {
  return (
<main className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-xl w-full text-center">

        {/* Animation */}
        <div className="flex justify-center">
          <LottiePlayer
            animationData={notFoundAnimation}
          />
        </div>


        {/* title */}
        <h1 className="text-xl font-medium text-gray-700 mt-2">
          Page not found
        </h1>

        {/* Description */}
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 items-center">

          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-espresso text-white hover:bg-espresso-dark border-none font-medium transition shadow-sm"
          >
            Go Home
          </Link>
          <Link
            href="/tiles"
            className=" px-6 py-3 rounded-xl border border-espresso text-espressofont-medium hover:bg-espresso transition hover:text-white"
          >
            Browse All Tiles
          </Link>
        </div>

        {/* Subtle footer text */}
        <p className="text-xs text-gray-400 mt-8">
          Error 404 • Something went missing
        </p>
      </div>
    </main>
  );
}