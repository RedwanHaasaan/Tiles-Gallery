'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, X, Grid3X3, LayoutGrid } from 'lucide-react'
import TileCard from './TileCard'

export default function TilesClient({ tiles, categories }) {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || ''
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid')

  // Filter and sort tiles
  const filteredTiles = useMemo(() => {
    let result = [...tiles]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(tile =>
        tile.name.toLowerCase().includes(query) ||
        tile.category.toLowerCase().includes(query) ||
        tile.description.toLowerCase().includes(query) ||
        tile.material.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter(tile => tile.category === selectedCategory)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
      default:
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [tiles, searchQuery, selectedCategory, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSortBy('name')
  }

  const hasActiveFilters = searchQuery || selectedCategory

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e0dcd6] p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#6b6b6b] z-10" />
            <input
              type="text"
              placeholder="Search tiles by name, category, material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-12 bg-[#f8f6f3] border-[#e0dcd6] focus:border-[#c9a87c] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b6b6b] hover:text-[#2d2926]"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered bg-[#f8f6f3] border-[#e0dcd6] focus:border-[#c9a87c] focus:outline-none min-w-[150px]"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered bg-[#f8f6f3] border-[#e0dcd6] focus:border-[#c9a87c] focus:outline-none min-w-[150px]"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-[#f8f6f3] rounded-lg p-1 border border-[#e0dcd6]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-[#2d2926] text-white' 
                  : 'text-[#6b6b6b] hover:text-[#2d2926]'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-[#2d2926] text-white' 
                  : 'text-[#6b6b6b] hover:text-[#2d2926]'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#e0dcd6]">
            <span className="text-sm text-[#6b6b6b] flex items-center gap-1">
              <Filter className="w-4 h-4" />
              Active Filters:
            </span>
            {searchQuery && (
              <span className="badge bg-[#2d2926] text-white border-none gap-1 p-2">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="badge bg-[#c9a87c] text-white border-none gap-1 p-2">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-[#c9a87c] hover:text-[#2d2926] font-medium cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-[#6b6b6b]">
          Showing <span className="font-semibold text-[#2d2926]">{filteredTiles.length}</span> tiles
        </p>
      </div>

      {/* Tiles Grid */}
      {filteredTiles.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 sm:grid-cols-2'
        }`}>
          {filteredTiles.map((tile) => (
            <TileCard key={tile.id} tile={tile} showDetails={viewMode === 'grid'} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-[#e8e4df] rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-[#6b6b6b]" />
          </div>
          <h3 className="text-xl font-semibold text-[#2d2926] mb-2">No tiles found</h3>
          <p className="text-[#6b6b6b] mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={clearFilters}
            className="btn bg-[#2d2926] text-white hover:bg-[#1a1a1a] border-none"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
