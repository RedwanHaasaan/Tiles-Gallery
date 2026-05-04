import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import TilesClient from '@/components/Tile/TilesClient'
import { tilesData } from '@/data/tiles'
import { categories } from '@/utils/tilesHelper'
import { Suspense } from 'react'

export const metadata = {
  title: 'All Tiles | Tiles Gallery',
  description: 'Browse our complete collection of premium ceramic, marble, mosaic, and geometric tiles. Find the perfect tiles for your project.',
}

function TilesLoading() {
  return (
    <div className="space-y-6">
      {/* Search skeleton */}
      <div className="bg-white rounded-xl shadow-sm border border-tile-border p-6">
        <div className="h-12 bg-stone rounded-lg animate-pulse"></div>
      </div>
      
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-tile-border overflow-hidden">
            <div className="h-48 bg-stone animate-pulse"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-stone rounded animate-pulse"></div>
              <div className="h-4 bg-stone rounded w-3/4 animate-pulse"></div>
              <div className="h-10 bg-stone rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TilesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      {/* Page Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-espresso">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Tile Collection
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Explore our extensive range of premium tiles. Filter by category, 
            search by name, and find the perfect tiles for your project.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<TilesLoading />}>
            <TilesClient tiles={tilesData} categories={categories} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}
