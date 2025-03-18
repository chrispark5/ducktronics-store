import { useEffect, useState } from "react";

export default function IndividualItem({ id }) {
  const [item, setItem] = useState(null);
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5001/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItem(data);
      });
  }, [id]);

  return (
    <div>
      <h1>Individual Item</h1>
      {item && item.name}
      {/* add to cart button */}
    </div>
  );
}
