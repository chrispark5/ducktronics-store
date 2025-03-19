import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export default function SuggestedItems({ id }) {
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    if (!id) return;
    const productData = {
      product_id: id,
    };
    console.log(productData);
    fetch("http://localhost:8000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSuggestedProducts(data); // Assuming this updates the state
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
        Suggested Items
      </h2>
      {suggestedProducts && <InfiniteMovingCards items={suggestedProducts} />}
    </div>
  );
}
