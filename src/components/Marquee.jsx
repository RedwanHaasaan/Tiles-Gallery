"use client";
export default function Marquee({ items, speed = 30, className = '' }) {
  // Duplicate items to create seamless loop
  const duplicatedItems = [...items, ...items]

  return (
    <div className={`overflow-hidden bg-[#2d2926] py-3 ${className}`}>
      <div 
        className="flex whitespace-nowrap animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicatedItems.map((item, index) => (
          <span 
            key={index} 
            className="mx-8 text-[#c9a87c] font-medium text-sm uppercase tracking-wider flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-[#c9a87c] rounded-full"></span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
