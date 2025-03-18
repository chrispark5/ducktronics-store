import { useEffect, useState } from "react";

export default function SuggestedItems({ id }) {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  useEffect(() => {
    if (!id) return;

    const productData = {
      product_id: id,
    };

    fetch("http://localhost:5000/recommend", {
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
          return (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow-lg overflow-hidden"
            >
              {/* Image */}
              <img
                src={`https://via.placeholder.com/300?text=${product.name}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                {/* Product Name */}
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                {/* Product Material */}
                <p className="text-md text-gray-600 mt-2">{product.material}</p>
                {/* Product Price */}
                <p className="text-lg font-bold text-blue-600 mt-2">
                  ${product.price.toFixed(2)}
                </p>
                {/* Product Category */}
                <p className="text-sm text-gray-500 mt-2">
                  Category: {product.category}
                </p>
                {/* Product Stock */}
                <p className="text-sm text-gray-500 mt-1">
                  Stock: {product.stock}
                </p>
                {/* Product Rating */}
                <p className="text-sm text-yellow-500 mt-1">
                  Rating: {product.rating}
                </p>
                {/* Add to Cart Button */}
                <button className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
}
