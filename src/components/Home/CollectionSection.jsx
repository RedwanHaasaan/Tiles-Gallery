import { ArrowRight } from "lucide-react";
import Link from "next/link";
import TileCard from "../Tile/TileCard";
import { tilesData } from "@/data/tiles";

const CollectionSection =()=>{
    return(
      <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2926] mb-2">
              Our Collection
            </h2>
            <p className="text-[#6b6b6b]">
              Explore our latest and most popular tile designs
            </p>
          </div>
          <Link 
            href="/tiles"
            className="btn btn-ghost text-[#2d2926] hover:bg-[#e8e4df]"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tilesData.slice(0, 8).map((tile) => (
            <TileCard key={tile.id} tile={tile} />
          ))}
        </div>
      </div>
    </section>
    );
}
export default CollectionSection