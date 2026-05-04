'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// 3×3 tile grid — each cell gets a staggered delay
const TILE_DELAYS = [0, 0.08, 0.16, 0.08, 0.16, 0.24, 0.16, 0.24, 0.32]

// Tile patterns (background colors cycling through the brand palette)
const TILE_COLORS = [
  'var(--espresso)', 'var(--gold)', 'var(--espresso)',
  'var(--gold)', 'var(--cream-muted)', 'var(--gold)',
  'var(--espresso)', 'var(--gold)', 'var(--espresso)',
]

export default function PageLoader() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const [animKey, setAnimKey] = useState(0)

  // Show loader on first mount
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  // Show loader on every route change
  useEffect(() => {
    setVisible(true)
    setAnimKey(k => k + 1)
    const timer = setTimeout(() => setVisible(false), 1800)
    return () => clearTimeout(timer)
  }, [pathname])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'color-mix(in srgb, var(--espresso) 97%, transparent)' }}
      aria-label="Loading page"
    >
      {/* Tile Grid */}
      <div className="grid grid-cols-3 gap-2 mb-8" key={animKey}>
        {TILE_COLORS.map((color, i) => (
          <div
            key={i}
            className="loader-tile w-10 h-10 rounded-lg"
            style={{
              backgroundColor: color,
              animationDelay: `${TILE_DELAYS[i]}s`,
              border: color === 'var(--cream-muted)' ? '2px solid #c9a87c' : '1px solid color-mix(in srgb, var(--gold) 20%, transparent)',
            }}
          />
        ))}
      </div>

      {/* Brand name with shimmer */}
      <p className="shimmer-text text-xl font-bold tracking-widest uppercase mb-6 select-none">
        Tiles Gallery
      </p>

      {/* Progress bar */}
      <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="loader-progress h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #c9a87c, #f0d9b0, #c9a87c)' }}
        />
      </div>
    </div>
  )
}
