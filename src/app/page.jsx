import CategorySection from "@/components/Home/CategorySection";
import CollectionSection from "@/components/Home/CollectionSection";
import CTASection from "@/components/Home/CTASection";
import FeaturedCarousel from "@/components/Home/FeaturedCarousel";
import FeaturesSection from "@/components/Home/FeaturesSection";
import Marquee from "@/components/Home/Marquee";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import { getFeaturedTiles,categories } from "@/utils/tilesHelper";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function Home() {
  const marqueeItems = [
    "Premium Quality Tiles",
    "Free Shipping on Orders $500+",
    "Expert Design Consultation",
    "Lifetime Warranty",
    "Sustainable Materials",
    "Worldwide Delivery",
  ];
  // Get featured tiles
  const featuredTiles = getFeaturedTiles();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Marquee items={marqueeItems} speed={35} />
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FeaturedCarousel tiles={featuredTiles} />
        </div>
      </section>
      {/* Welcome Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mb-6 text-balance">
            Welcome to a New Dimension of Design
          </h1>
          <p className="text-ash max-w-3xl mx-auto text-lg leading-relaxed text-pretty">
            Tiles Gallery blends intricate design, considered function, and
            luxury materials to transform your spaces and awaken your senses.
            Discover our curated collection of premium ceramic, marble, mosaic,
            and geometric tiles.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/tiles"
              className="btn bg-espresso text-white hover:bg-espresso-dark border-none px-8"
            >
              Browse All Tiles
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="btn btn-outline border-espresso text-espresso hover:bg-espresso hover:text-white px-8"
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <CategorySection categories={categories} />
      {/* Features Section */}
      <FeaturesSection/>
      {/* Tiles Collection Section */}
      <CollectionSection/>
      {/* Call To Action Section */}
      <CTASection/>
      {/* Footer Section */}
      <Footer/>
    </div>
  );
}
