'use client'

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import useScrollReveal from "@/hooks/useScrollReveal"

const CTASection = () => {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal({ threshold: 0.2 })
  const { ref: paraRef, isVisible: paraVisible } = useScrollReveal({ threshold: 0.2 })
  const { ref: btnRef,  isVisible: btnVisible  } = useScrollReveal({ threshold: 0.2 })

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2d2926] relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="grid grid-cols-8 grid-rows-4 h-full w-full">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="border border-[#c9a87c]" />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2
          ref={headRef}
          className={`text-3xl sm:text-4xl font-bold text-white mb-4 text-balance ${
            headVisible ? 'animate__animated animate__fadeInLeft' : 'opacity-0'
          }`}
        >
          Ready to Transform Your Space?
        </h2>

        <p
          ref={paraRef}
          className={`text-gray-300 mb-8 text-lg ${
            paraVisible ? 'animate__animated animate__fadeInRight' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.15s', animationFillMode: 'both' }}
        >
          Join our community to access exclusive designs, special offers, and expert design tips.
        </p>

        <div
          ref={btnRef}
          className={`flex flex-wrap justify-center gap-4 ${
            btnVisible ? 'animate__animated animate__bounceIn' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          <Link
            href="/register"
            className="btn bg-[#c9a87c] text-white hover:bg-[#b8976b] border-none px-8 hover:scale-105 transition-transform duration-200"
          >
            Create Account
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/tiles"
            className="btn btn-outline border-white text-white hover:bg-white hover:text-[#2d2926] px-8 hover:scale-105 transition-transform duration-200"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection