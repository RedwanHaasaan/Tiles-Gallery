import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, 
  Check, 
  X, 
  Ruler, 
  Layers, 
  Sparkles,
  ShoppingCart,
  Heart,
  Share2
} from 'lucide-react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Layout/Navbar'
import TileCard from '@/components/Tile/TileCard'
import Footer from '@/components/Layout/Footer'
import { getTileById } from '@/utils/tilesHelper'
import { tilesData } from '@/data/tiles'

export async function generateMetadata({ params }) {
  const { id } = await params
  const tile = getTileById(id)
  
  if (!tile) {
    return {
      title: 'Tile Not Found | Tiles Gallery',
    }
  }

  return {
    title: `${tile.name} | Tiles Gallery`,
    description: tile.description,
  }
}

export default async function TileDetailsPage({ params }) {
  const { id } = await params
  
//   // Check authentication - this is a private route
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   })

//   if (!session) {
//     redirect('/login')
//   }

  const tile = getTileById(id)

  if (!tile) {
    notFound()
  }

  // Get related tiles (same category, excluding current)
  const relatedTiles = tilesData
    .filter(t => t.category === tile.category && t.id !== tile.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f6f3]">
      <Navbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link 
              href="/tiles" 
              className="inline-flex items-center gap-2 text-[#6b6b6b] hover:text-[#2d2926] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Tiles
            </Link>
          </nav>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-lg">
                <Image
                  src={tile.image}
                  alt={tile.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Stock Badge */}
                <div className="absolute top-4 right-4">
                  {tile.inStock ? (
                    <span className="badge bg-green-500 text-white border-none text-sm flex items-center gap-1 px-3 py-2">
                      <Check className="w-4 h-4" /> In Stock
                    </span>
                  ) : (
                    <span className="badge bg-red-500 text-white border-none text-sm flex items-center gap-1 px-3 py-2">
                      <X className="w-4 h-4" /> Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              {/* Category Badge */}
              <span className="badge bg-[#c9a87c] text-white border-none p-2">
                {tile.category}
              </span>

              {/* Title & Price */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#2d2926] mb-2">
                  {tile.name}
                </h1>
                <p className="text-3xl font-bold text-[#c9a87c]">
                  ${tile.price.toFixed(2)}
                  <span className="text-sm font-normal text-[#6b6b6b] ml-2">per sq ft</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-[#6b6b6b] text-lg leading-relaxed">
                {tile.description}
              </p>

              {/* Specifications */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e0dcd6]">
                <h2 className="text-lg font-semibold text-[#2d2926] mb-4">Specifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#f0ebe5] rounded-lg flex items-center justify-center">
                      <Ruler className="w-5 h-5 text-[#c9a87c]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6b6b6b]">Size</p>
                      <p className="font-medium text-[#2d2926]">{tile.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#f0ebe5] rounded-lg flex items-center justify-center">
                      <Layers className="w-5 h-5 text-[#c9a87c]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6b6b6b]">Material</p>
                      <p className="font-medium text-[#2d2926]">{tile.material}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#f0ebe5] rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#c9a87c]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6b6b6b]">Finish</p>
                      <p className="font-medium text-[#2d2926]">{tile.finish}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="btn flex-1 bg-[#2d2926] text-white hover:bg-[#1a1a1a] border-none p-2"
                  disabled={!tile.inStock}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="btn btn-outline border-[#e0dcd6] text-[#2d2926] hover:bg-[#e8e4df] hover:border-[#e8e4df]">
                  <Heart className="w-5 h-5" />
                  Save
                </button>
                <button className="btn btn-outline border-[#e0dcd6] text-[#2d2926] hover:bg-[#e8e4df] hover:border-[#e8e4df]">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-[#2d2926]">Features</h3>
                <ul className="space-y-2">
                  {[
                    'Premium quality materials',
                    'Easy to clean and maintain',
                    'Suitable for indoor and outdoor use',
                    'Frost resistant',
                    'Eco-friendly production',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-[#6b6b6b]">
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related Tiles */}
          {relatedTiles.length > 0 && (
            <section className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2d2926]">
                  Related Tiles
                </h2>
                <Link 
                  href={`/tiles?category=${tile.category}`}
                  className="text-[#c9a87c] hover:text-[#2d2926] font-medium"
                >
                  View All {tile.category}
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedTiles.map((relatedTile) => (
                  <TileCard key={relatedTile.id} tile={relatedTile} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
