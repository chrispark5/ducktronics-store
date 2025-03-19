import { useCartStore } from "@/hooks/CartStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products && products.map((product) => <ItemCard product={product} />)}
    </div>
  );
}
