import CardDemo from "@/components/cards-demo-1";
import { FloatingDockDemo } from "@/components/floatingDock";
import { QuackleHeroParallaxActual } from "@/components/QuackleHeroParallax";
import { FloatingNavDemo } from "@/components/FloatingNavbar";
import { CartProvider } from "@/hooks/CartContext";
import Categories from "@/components/Categories";
export default function Home() {
  return (
    <>
      <FloatingNavDemo />
      <div className="space-y-8">
        <QuackleHeroParallaxActual />
        <Categories />
      </div>
    </>
  );
}
