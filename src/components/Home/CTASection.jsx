import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTASection=()=>{
return(
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#2d2926]">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
        Ready to Transform Your Space?
      </h2>
      <p className="text-gray-300 mb-8 text-lg">
        Join our community to access exclusive designs, special offers, and expert design tips.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link 
          href="/register"
          className="btn bg-[#c9a87c] text-white hover:bg-[#b8976b] border-none px-8"
        >
          Create Account
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link 
          href="/tiles"
          className="btn btn-outline border-white text-white hover:bg-white hover:text-[#2d2926] px-8"
        >
          Browse Collection
        </Link>
      </div>
    </div>
  </section>
);
}
export default CTASection