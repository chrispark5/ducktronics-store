import { useCartStore } from "@/hooks/CartStore";
import { Rating } from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ItemCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);
  const cardRef = useRef(null); // Reference to the item card

  const addItem = (product) => {
    addToCart(product);
    setAdded(true);
  };

  // Reset the 'added' state to false when clicking outside of the card
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setAdded(false); // Reset 'added' to false if click is outside
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      key={product.id}
      className="bg-white border rounded-lg shadow-lg overflow-hidden w-120"
      ref={cardRef}
    >
      {/* Image */}
      <Link href="/product/[id]" as={`/product/${product.id}`} key={product.id}>
        <img
          src={`/images/${product.category}/${product.name}.jpg`}
          alt={product.name}
          className="w-full h-80 object-cover" // Adjusted height and object-fit
        />
      </Link>
      <div className="p-4">
        {/* Product Name */}
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        {/* Product Color */}
        <p className="text-md text-gray-600 mt-2">{product.color}</p>
        {/* Product Price */}
        <p className="text-lg font-bold text-blue-600 mt-2">
          ${product.price.toFixed(2)}
        </p>
        {/* Product Category */}
        <p className="text-sm text-gray-500 mt-2">
          Category: {product.category}
        </p>
        {/* Product Stock */}
        <p className="text-sm text-gray-500 mt-1">Stock: {product.stock}</p>
        {/* Product Rating */}
        <p className="text-sm text-yellow-500 mt-1">
          {" "}
          <Rating value={product.rating} readOnly />
        </p>
        {/* Add to Cart Button */}
        <button
          className={`mt-4 w-full py-2 px-4 rounded-md 
    ${
      added ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
    } 
    text-white`}
          onClick={() => addItem(product)}
          disabled={added} // Disable the button if 'added' is true
        >
          {added ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
