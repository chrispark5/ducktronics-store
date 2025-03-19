import { useCartStore } from "@/hooks/CartStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { FloatingNavDemo } from "./FloatingNavbar";

export default function IndividualCategory({ category }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (!category) return;
    fetch(`http://localhost:5001/products/${category}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, [category]);

  return (
    <>
      <FloatingNavDemo />
      <div className="px-3 py-8">
        {/* Category Header */}
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          {category} {/* Dynamic Category Name */}
        </h2>

        {/* Grid Layout for Products */}
        <div className="grid lg:grid-cols-3 gap-4">
          {products &&
            products.map((product) => <ItemCard product={product} />)}
        </div>
      </div>
    </>
  );
}
