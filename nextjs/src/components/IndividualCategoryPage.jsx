import { useEffect, useState } from "react";

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
      {products &&
        products.map((product) => (
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
        ))}
    </div>
  );
}
