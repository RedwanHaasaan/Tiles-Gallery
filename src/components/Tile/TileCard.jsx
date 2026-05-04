"use client"
import Image from 'next/image'
import { ArrowRight, Check, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import { toast } from 'react-toastify'

export default function TileCard({ tile, showDetails = true }) {
  const router = useRouter()
  const { data: session } = useSession()

  const handleClick = () => {
    if (!session) {
      toast.error("You must be logged in to view details")
      router.push(`/login?redirect=/tile/${tile.id}`)
      return
    }
    router.push(`/tile/${tile.id}`)
  }

  return (
    <div className="card bg-white shadow-md hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-[#e0dcd6] hover:border-[#c9a87c] hover:-translate-y-1 shimmer-card">
      {/* Image */}
      <figure className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={tile.image}
          alt={tile.name}
          fill
          className="object-cover group-hover:scale-108 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ transform: 'scale(1)', transition: 'transform 0.7s ease' }}
        />
        {/* Hover vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="badge bg-[#2d2926] text-white border-none text-xs p-2 animate__animated animate__bounceIn">
            {tile.category}
          </span>
        </div>
        {/* Stock Status */}
        <div className="absolute top-3 right-3">
          {tile.inStock ? (
            <span className="badge bg-green-500 text-white border-none text-xs flex items-center gap-1 p-2 animate__animated animate__bounceIn" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <Check className="w-3 h-3" /> In Stock
            </span>
          ) : (
            <span className="badge bg-red-500 text-white border-none text-xs flex items-center gap-1 p-2 animate__animated animate__bounceIn" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <X className="w-3 h-3" /> Out of Stock
            </span>
          )}
        </div>
      </figure>

      {/* Content */}
      <div className="card-body p-4 gap-2">
        <h3 className="card-title text-[#2d2926] text-lg font-semibold line-clamp-1 group-hover:text-[#c9a87c] transition-colors duration-200">
          {tile.name}
        </h3>

        {showDetails && (
          <>
            <p className="text-[#6b6b6b] text-sm line-clamp-2">
              {tile.description}
            </p>

            <div className="flex items-center justify-between mt-2">
              <div>
                <span className="text-xs text-[#6b6b6b]">Size: {tile.size}</span>
              </div>
              <span className="text-[#c9a87c] font-bold text-lg">
                ${tile.price.toFixed(2)}
              </span>
            </div>
          </>
        )}

        {/* Action */}
        <div className="card-actions mt-3">
          <button
            onClick={handleClick}
            className="btn btn-block bg-[#2d2926] text-white hover:bg-[#c9a87c] border-none group/btn transition-all duration-300"
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  )
}