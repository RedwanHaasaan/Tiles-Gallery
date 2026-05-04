"use client";
export default function Marquee({ items, speed = 30, className = '' }) {
  // Duplicate items to create seamless loop
  const duplicatedItems = [...items, ...items]

  return (
    <div className={`overflow-hidden bg-espresso py-3 ${className}`}>
      <div 
        className="flex whitespace-nowrap animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicatedItems.map((item, index) => (
          <span 
            key={index} 
            className="mx-8 text-gold font-medium text-sm uppercase tracking-wider flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-gold rounded-full"></span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
