import { useState } from "react";

export const useAddToWishlist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToWishlist = async (product) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // Retrieve the JWT token
      if (!token) {
        throw new Error("User is not authenticated. Please log in.");
      }

      const response = await fetch("http://localhost:5001/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(product), // Send the product ID in the request body
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to add item to wishlist.");
      }

      return await response; // Return the response data if needed
    } catch (err) {
      setError(err.message);
      console.error("Error adding to wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  return { addToWishlist, loading, error };
};
