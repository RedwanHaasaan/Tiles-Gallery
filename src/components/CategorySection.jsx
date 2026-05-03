import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const categoryImages = {
  Ceramic: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80',
  Marble: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
  Mosaic: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  Geometric: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
}

const categoryDescriptions = {
  Ceramic: 'Classic warmth and versatility for every space',
  Marble: 'Timeless elegance with natural beauty',
  Mosaic: 'Artistic patterns that tell a story',
  Geometric: 'Modern designs for contemporary living',
}

export default function CategorySection({ categories }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f0ebe5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2926] mb-4 text-balance">
            Explore Our Collections
          </h2>
          <p className="text-[#6b6b6b] max-w-2xl mx-auto text-pretty">
            Browse through our carefully curated categories of premium tiles, 
            each offering unique aesthetics for your design vision.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/tiles?category=${category}`}
              className="group relative h-64 sm:h-72 rounded-xl overflow-hidden shadow-lg"
            >
              {/* Background Image */}
              <Image
                src={categoryImages[category]}
                alt={category}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">{category}</h3>
                <p className="text-sm text-gray-300 mb-3">
                  {categoryDescriptions[category]}
                </p>
                <span className="inline-flex items-center gap-1 text-[#c9a87c] text-sm font-medium group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
