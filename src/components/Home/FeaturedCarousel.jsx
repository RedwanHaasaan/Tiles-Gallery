'use client'

import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCreative, Thumbs } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-creative'
import 'swiper/css/thumbs'

export default function FeaturedCarousel({ tiles }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <div className="relative group">
      {/* ── Main Slider ── */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCreative, Thumbs]}
        effect="creative"
        creativeEffect={{
          prev: { shadow: true, translate: ['-20%', 0, -1], opacity: 0 },
          next: { translate: ['100%', 0, 0], opacity: 0 },
        }}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl overflow-hidden"
      >
        {tiles.map((tile, idx) => (
          <SwiperSlide key={tile.id} className="h-[400px] sm:h-[500px] lg:h-[600px]">
            <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
              {/* Background Image */}
              <Image
                src={tile.image}
                alt={tile.name}
                fill
                className="object-cover"
                priority={idx === 0}
                sizes="100vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Slide Content — animates in when active */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 text-white">
                <div
                  className={`max-w-2xl ${
                    activeIndex === idx ? 'slide-content-active' : 'slide-content-inactive'
                  }`}
                >
                  <span className="inline-block px-3 py-1 bg-[#c9a87c] text-[#2d2926] text-xs font-semibold rounded-full mb-4 animate__animated animate__bounceIn">
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
                      className="btn bg-white text-[#2d2926] hover:bg-[#c9a87c] hover:text-white border-none transition-all duration-300 hover:scale-105"
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

      {/* ── Custom Nav Buttons ── */}
      <button
        ref={prevRef}
        className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-[#c9a87c] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#2d2926] hover:text-white" />
      </button>
      <button
        ref={nextRef}
        className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-[#c9a87c] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#2d2926] hover:text-white" />
      </button>

      {/* ── Thumbs Strip ── */}
      <div className="mt-3">
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={4}
          watchSlidesProgress
          className="rounded-lg overflow-hidden"
          style={{ height: '80px' }}
        >
          {tiles.map((tile, idx) => (
            <SwiperSlide key={tile.id}>
              <div
                className={`relative w-full h-full cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                  activeIndex === idx
                    ? 'ring-2 ring-[#c9a87c] opacity-100 scale-105'
                    : 'opacity-60 hover:opacity-90'
                }`}
              >
                <Image
                  src={tile.image}
                  alt={tile.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 15vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}