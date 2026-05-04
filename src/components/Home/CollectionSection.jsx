'use client'

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import TileCard from "../Tile/TileCard"
import { tilesData } from "@/data/tiles"
import useScrollReveal from "@/hooks/useScrollReveal"

const CollectionSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.15 })
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.05 })

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 ${
            headerVisible ? 'animate__animated animate__fadeInUp' : 'opacity-0'
          }`}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2926] mb-2">
              Our Collection
            </h2>
            <p className="text-[#6b6b6b]">
              Explore our latest and most popular tile designs
            </p>
          </div>
          <Link
            href="/tiles"
            className="btn btn-ghost text-[#2d2926] hover:bg-[#e8e4df] hover:gap-3 transition-all duration-200"
          >
            View All
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {tilesData.slice(0, 8).map((tile, index) => (
            <div
              key={tile.id}
              className={gridVisible ? 'animate__animated animate__fadeInUp' : 'opacity-0'}
              style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'both' }}
            >
              <TileCard tile={tile} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CollectionSection