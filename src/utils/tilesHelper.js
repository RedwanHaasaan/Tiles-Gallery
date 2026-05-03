import { tilesData } from "@/data/tiles"

// Get all unique categories
export const categories = [...new Set(tilesData.map(tile => tile.category))]

// Get featured tiles
export const getFeaturedTiles = () => tilesData.filter(tile => tile.featured)

// Get tiles by category
export const getTilesByCategory = (category) => 
  category ? tilesData.filter(tile => tile.category === category) : tilesData

// Search tiles
export const searchTiles = (query) => {
  const lowercaseQuery = query.toLowerCase()
  return tilesData.filter(tile => 
    tile.name.toLowerCase().includes(lowercaseQuery) ||
    tile.category.toLowerCase().includes(lowercaseQuery) ||
    tile.description.toLowerCase().includes(lowercaseQuery) ||
    tile.material.toLowerCase().includes(lowercaseQuery)
  )
}

// Get tile by ID
export const getTileById = (id) => tilesData.find(tile => tile.id === id)
