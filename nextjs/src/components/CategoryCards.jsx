import { WobbleCard } from "./ui/wobble-card";
import Link from "next/link";

export default function CategoryCards({ categoryArray }){
    return (
      <div className="grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {categoryArray.map((category) => (
          <Link key={category} href={`/products/${category.toLowerCase()}`}>
            <WobbleCard containerClassName="min-h-[250px]">
              <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                {category}
              </h2>
            </WobbleCard>
          </Link>
        ))}
      </div>
    );
}