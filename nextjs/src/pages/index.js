import CardDemo from "@/components/cards-demo-1";
import { FloatingDockDemo } from "@/components/floatingDock";
import { QuackleHeroParallaxActual } from "@/components/QuackleHeroParallax";
import { FloatingNavDemo } from "@/components/FloatingNavbar";
import { CartProvider } from "@/hooks/CartContext";
import Categories from "@/components/Categories";
import SearchAppBar from "@/components/Navbar";
import ImageTrail from "@/blocks/Animations/ImageTrail/ImageTrail";
import TextCursor from "@/blocks/TextAnimations/TextCursor/TextCursor";

export default function Home() {
  return (
    <>
      {/* <FloatingNavDemo /> */}
      <SearchAppBar />
      <div className="space-y-1">
        <QuackleHeroParallaxActual />
        <Categories />
      </div>
    </>
  );
}
