'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal
 * Fires once when the element enters the viewport.
 * @param {object} options
 * @param {number} options.threshold  - 0-1, default 0.15
 * @param {string} options.rootMargin - e.g. "0px 0px -50px 0px"
 */
export default function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
} = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Fire once — disconnect after first trigger
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, isVisible }
}
