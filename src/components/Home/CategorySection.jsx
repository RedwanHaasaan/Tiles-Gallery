'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import useScrollReveal from '@/hooks/useScrollReveal'

const categoryImages = {
  Ceramic:   'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80',
  Marble:    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
  Mosaic:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  Geometric: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
}

const categoryDescriptions = {
  Ceramic:   'Classic warmth and versatility for every space',
  Marble:    'Timeless elegance with natural beauty',
  Mosaic:    'Artistic patterns that tell a story',
  Geometric: 'Modern designs for contemporary living',
}

const zoomClasses = ['animate__zoomIn', 'animate__zoomIn', 'animate__zoomIn', 'animate__zoomIn']

function CategoryCard({ category, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <Link
      ref={ref}
      href={`/tiles?category=${category}`}
      className={`group relative h-64 sm:h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
        isVisible ? `animate__animated ${zoomClasses[index]}` : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.12}s`, animationFillMode: 'both' }}
    >
      {/* Background Image */}
      <Image
        src={categoryImages[category]}
        alt={category}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />

      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ background: 'linear-gradient(135deg, rgba(201,168,124,0.15) 0%, transparent 60%)' }} />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform group-hover:-translate-y-1 transition-transform duration-300">
        <h3 className="text-xl font-bold mb-1 group-hover:text-[#c9a87c] transition-colors duration-200">
          {category}
        </h3>
        <p className="text-sm text-gray-300 mb-3">
          {categoryDescriptions[category]}
        </p>
        <span className="inline-flex items-center gap-1 text-[#c9a87c] text-sm font-medium group-hover:gap-3 transition-all duration-300">
          Explore
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </span>
      </div>
    </Link>
  )
}

export default function CategorySection({ categories }) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f0ebe5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 ${
            headerVisible ? 'animate__animated animate__fadeInDown' : 'opacity-0'
          }`}
        >
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
          {categories.map((category, index) => (
            <CategoryCard key={category} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
