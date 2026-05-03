import { HeadphonesIcon, Shield, Sparkles, Truck } from "lucide-react";

const FeaturesSection=()=>{
  const featureList=[
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Handpicked tiles from the finest manufacturers worldwide',
    },
    {
      icon: Shield,
      title: 'Lifetime Warranty',
      description: 'All our products come with comprehensive warranty coverage',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $500 with tracking',
    },
    {
      icon: HeadphonesIcon,
      title: 'Expert Support',
      description: 'Our design consultants are here to help you',
    },
  ]
    return(
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2926] mb-4">
              Why Choose Us
            </h2>
            <p className="text-[#6b6b6b] max-w-2xl mx-auto">
              We are committed to providing exceptional quality and service
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureList.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl bg-[#f8f6f3] hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-[#2d2926] rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-[#c9a87c]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2d2926] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#6b6b6b] text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}

export default FeaturesSection;