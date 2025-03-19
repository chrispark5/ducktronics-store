import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

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
    <>
      {suggestedProducts &&
        suggestedProducts.map((product) => {
          return <ItemCard product={product} />;
        })}
    </>
  );
}
