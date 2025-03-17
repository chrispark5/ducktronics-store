import CardDemo from "@/components/cards-demo-1";
import { FloatingDockDemo } from "@/components/floatingDock";
export default function Home() {
  return (
    <h1>
      Welcome to My Next.js App
      <FloatingDockDemo />
      <CardDemo />
    </h1>
  );
}
