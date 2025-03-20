import { useCartStore } from "@/hooks/CartStore";
import { useState } from "react";

export default function WishlistItem({ item, handleRemoveClick }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  const addItem = (product) => {
    addToCart(product);
    setAdded(true);
  };

  return (
    <div
      key={item.product.id}
      className="bg-white border rounded-lg shadow-lg overflow-hidden"
    >
      {/* Image */}
      <img
        src={`/images/${item.product.category}/${item.product.name}.jpg`}
        alt={item.product.name}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        {/* Product Name */}
        <h2 className="text-xl font-semibold text-gray-800">
          {item.product.name}
        </h2>
        {/* Product Price */}
        <p className="text-lg font-bold text-sky-500 mt-2">
          ${item.product.price.toFixed(2)}
        </p>
        {/* Remove from Wishlist Button */}
        <button
          className={`mt-4 w-full py-2 px-4 rounded-md 
    ${
      added ? "bg-gray-400 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"
    } 
    text-white`}
          onClick={() => addItem(item.product)}
          disabled={added} // Disable the button if 'added' is true
        >
          {added ? "Added" : "Add to Cart"}
        </button>
        <button
          className="mt-4 w-full py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white"
          onClick={() => handleRemoveClick(item)}
        >
          Remove from Wishlist
        </button>
      </div>
    </div>
  );
}
