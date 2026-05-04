'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TileCard from './TileCard'
import { useRef } from 'react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function RelatedTilesSwiper({ tiles }) {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  if (!tiles || tiles.length === 0) return null

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={tiles.length > 2}
        breakpoints={{
          640:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {tiles.map((tile, idx) => (
          <SwiperSlide key={tile.id}>
            <div
              className={`animate__animated animate__fadeInUp`}
              style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
            >
              <TileCard tile={tile} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <button
        ref={prevRef}
        className="absolute left-0 top-1/2 -translate-y-6 z-10 w-10 h-10 bg-white hover:bg-[#c9a87c] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 -translate-x-5 cursor-pointer border border-[#e0dcd6]"
      >
        <ChevronLeft className="w-5 h-5 text-[#2d2926]" />
      </button>
      <button
        ref={nextRef}
        className="absolute right-0 top-1/2 -translate-y-6 z-10 w-10 h-10 bg-white hover:bg-[#c9a87c] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 translate-x-5 cursor-pointer border border-[#e0dcd6]"
      >
        <ChevronRight className="w-5 h-5 text-[#2d2926]" />
      </button>
    </div>
  )
}
