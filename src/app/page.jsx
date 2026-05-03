import FeaturedCarousel from "@/components/FeaturedCarousel";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import { getFeaturedTiles } from "@/utils/tilesHelper";
export default function Home() {
  const marqueeItems = [
    'Premium Quality Tiles',
    'Free Shipping on Orders $500+',
    'Expert Design Consultation',
    'Lifetime Warranty',
    'Sustainable Materials',
    'Worldwide Delivery',
  ]
  // Get featured tiles
  const featuredTiles = getFeaturedTiles()
  return (
    <div className="min-h-screen flex flex-col"> 
      <Navbar/>
      <Marquee items={marqueeItems} speed={35} />
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FeaturedCarousel tiles={featuredTiles} />
        </div>
      </section>
    </div>
  );
}
