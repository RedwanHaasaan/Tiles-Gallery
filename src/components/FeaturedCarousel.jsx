'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export default function FeaturedCarousel({ tiles }) {
  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl overflow-hidden"
      >
        {tiles.map((tile) => (
          <SwiperSlide key={tile.id} className="h-[400px] sm:h-[500px] lg:h-[600px]">
            <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
              {/* Background Image */}
              <Image
                src={tile.image}
                alt={tile.name}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 text-white">
                <div className="max-w-2xl">
                  <span className="inline-block px-3 py-1 bg-[#c9a87c] text-[#2d2926] text-xs font-semibold rounded-full mb-4">
                    {tile.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-balance">
                    {tile.name}
                  </h2>
                  <p className="text-gray-200 text-sm sm:text-base mb-4 line-clamp-2 sm:line-clamp-3">
                    {tile.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl sm:text-3xl font-bold text-[#c9a87c]">
                      ${tile.price.toFixed(2)}
                    </span>
                    <Link 
                      href={`/tile/${tile.id}`}
                      className="btn bg-white text-[#2d2926] hover:bg-[#c9a87c] hover:text-white border-none"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300  cursor-pointer">
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#2d2926]" />
      </button>
      <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#2d2926]" />
      </button>
    </div>
  )
}