import { WobbleCard } from "./ui/wobble-card";
import Link from "next/link";
export default function Categories() {
  return (
    <>
      <div className="text-center my-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white">
          Categories
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        <Link href="/products/technology">
          <WobbleCard containerClassName="min-h-[250px]">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Technology{" "}
            </h2>
          </WobbleCard>
        </Link>

        <WobbleCard containerClassName="min-h-[300px]">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Tools{" "}
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Description goes here.
          </p>
        </WobbleCard>

        <WobbleCard containerClassName="min-h-[280px]">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Books
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            More information here.
          </p>
        </WobbleCard>

        <WobbleCard containerClassName="min-h-[320px]">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Movies{" "}
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Description for card 4.
          </p>
        </WobbleCard>

        <WobbleCard containerClassName="min-h-[240px]">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Games{" "}
          </h2>
        </WobbleCard>

        <WobbleCard containerClassName="min-h-[350px]">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Jewelry{" "}
          </h2>
        </WobbleCard>

        <WobbleCard containerClassName="min-h-[300px]">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Outdoors
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Details for card 7.
          </p>
        </WobbleCard>

        <WobbleCard containerClassName="min-h-[270px]">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Toys{" "}
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Description for card 8.
          </p>
        </WobbleCard>

        <WobbleCard containerClassName="min-h-[290px]">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Card Title 9
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Some more content for card 9.
          </p>
        </WobbleCard>
      </div>
    </>
  );
}
