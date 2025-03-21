import SearchAppBar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function SuccessfulCheckout() {
  const [orderId, setOrderId] = useState("");

  // Function to generate a random order ID
  const generateOrderId = () => {
    const prefix = "ORD"; // Prefix for the order ID
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
    const randomSuffix = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase(); // Random 4-character alphanumeric string
    return `${prefix}-${randomNumber}-${randomSuffix}`;
  };

  useEffect(() => {
    // Generate the order ID when the component mounts
    setOrderId(generateOrderId());
  }, []);

  return (
    <>
      <SearchAppBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-semibold mb-4 text-green-600">
            Thank you for your order!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Your order has been successfully placed.
          </p>
          <p className="text-lg font-medium text-gray-800">
            Your Order ID: <span className="text-blue-600">{orderId}</span>
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Please save this Order ID for your records.
          </p>
          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => (window.location.href = "/")} // Redirect to homepage
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
