import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";

export default function Home() {
  const marqueeItems = [
    'Premium Quality Tiles',
    'Free Shipping on Orders $500+',
    'Expert Design Consultation',
    'Lifetime Warranty',
    'Sustainable Materials',
    'Worldwide Delivery',
  ]

  return (
    <div className="min-h-screen flex flex-col"> 
      <Navbar/>
      <Marquee items={marqueeItems} speed={35} />
    </div>
  );
}
