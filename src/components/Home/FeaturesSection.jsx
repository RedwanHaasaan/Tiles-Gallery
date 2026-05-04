'use client'

import { HeadphonesIcon, Shield, Sparkles, Truck } from "lucide-react"
import useScrollReveal from "@/hooks/useScrollReveal"

const featureList = [
  {
    icon: Sparkles,
    title: 'Premium Quality',
    description: 'Handpicked tiles from the finest manufacturers worldwide',
    delay: 'stagger-1',
  },
  {
    icon: Shield,
    title: 'Lifetime Warranty',
    description: 'All our products come with comprehensive warranty coverage',
    delay: 'stagger-2',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free shipping on orders over $500 with tracking',
    delay: 'stagger-3',
  },
  {
    icon: HeadphonesIcon,
    title: 'Expert Support',
    description: 'Our design consultants are here to help you',
    delay: 'stagger-4',
  },
]

function FeatureCard({ feature, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`text-center p-6 rounded-xl bg-cream hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 ${feature.delay} ${
        isVisible
          ? 'animate__animated animate__fadeInUp'
          : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.12}s`, animationFillMode: 'both' }}
    >
      <div className="w-14 h-14 bg-espresso rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold transition-colors duration-300 group-hover:animate-float">
        <feature.icon className="w-7 h-7 text-gold group-hover:text-espresso transition-colors duration-300" />
      </div>
      <h3 className="text-lg font-semibold text-espresso mb-2 group-hover:text-gold transition-colors duration-200">
        {feature.title}
      </h3>
      <p className="text-ash text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  )
}

const FeaturesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-12 ${
            headerVisible ? 'animate__animated animate__fadeInDown' : 'opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-espresso mb-4">
            Why Choose Us
          </h2>
          <p className="text-ash max-w-2xl mx-auto">
            We are committed to providing exceptional quality and service
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureList.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection