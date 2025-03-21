import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchAppBar from "@/components/Navbar";
import { useCartStore } from "@/hooks/CartStore";

export default function Profile() {
  const [user, setUser] = useState(null); // State to store user data
  const [error, setError] = useState(null); // State to store errors
  const [updated, setUpdated] = useState(false);
  const [userInfo, setUserInfo] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  }); // State for address and payment info
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the JWT token

    if (!token) {
      // Redirect to login if no token is found
      router.push("/login");
      return;
    }

    // Fetch user profile data
    fetch("http://localhost:5001/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          // Redirect to login if the token is invalid or expired
          router.push("/login");
          return;
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        // Pre-fill the form with existing user data if available
        if (data?.address || data?.creditCardInfo) {
          setUserInfo({
            addressLine1: data.address?.addressLine1 || "",
            addressLine2: data.address?.addressLine2 || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            zipCode: data.address?.zipCode || "",
            cardNumber: data.creditCardInfo?.cardNumber || "",
            expiryDate: data.creditCardInfo?.expiryDate || "",
            cvv: data.creditCardInfo?.cvv || "",
          });
        } else {
          setUserInfo({
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zipCode: "",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile. Please try again.");
      });
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdated(false);
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token"); // Retrieve the JWT token

    try {
      const response = await fetch("http://localhost:5001/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({
          address: {
            addressLine1: userInfo.addressLine1,
            addressLine2: userInfo.addressLine2,
            city: userInfo.city,
            state: userInfo.state,
            zipCode: userInfo.zipCode,
          },
          creditCardInfo: {
            cardNumber: userInfo.cardNumber,
            expiryDate: userInfo.expiryDate,
            cvv: userInfo.cvv,
          },
        }),
      });

      if (response.ok) {
        setUpdated(true);
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    useCartStore.getState().clearCart(); // Clear the cart items
    router.push("/login"); // Redirect to the login page
  };

  if (!user && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="my-20">
      <SearchAppBar />
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center mb-4">Profile</h1>
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <>
              <p className="text-lg">
                <strong>Username:</strong> {user?.username}
              </p>
              <p className="text-lg">
                <strong>Email:</strong> {user?.email}
              </p>

              {/* Address and Payment Form */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Update Profile</h2>

                {/* Address Form */}
                <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                <input
                  type="text"
                  name="addressLine1"
                  placeholder="Address Line 1"
                  value={userInfo?.addressLine1}
                  onChange={handleInputChange}
                  className="w-full mb-2 px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="Address Line 2"
                  value={userInfo?.addressLine2}
                  onChange={handleInputChange}
                  className="w-full mb-2 px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={userInfo?.city}
                  onChange={handleInputChange}
                  className="w-full mb-2 px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={userInfo?.state}
                  onChange={handleInputChange}
                  className="w-full mb-2 px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={userInfo?.zipCode}
                  onChange={handleInputChange}
                  className="w-full mb-4 px-4 py-2 border rounded"
                />

                {/* Payment Form */}
                <h3 className="text-lg font-medium mb-2">
                  Payment Information
                </h3>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={userInfo?.cardNumber}
                  onChange={handleInputChange}
                  className="w-full mb-2 px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="Expiry Date (MM/YY)"
                  value={userInfo?.expiryDate}
                  onChange={handleInputChange}
                  className="w-full mb-2 px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={userInfo?.cvv}
                  onChange={handleInputChange}
                  className="w-full mb-4 px-4 py-2 border rounded"
                />

                <button
                  onClick={handleUpdateProfile}
                  className={`w-full py-2 px-4 rounded text-white ${
                    updated
                      ? "bg-[#00BFFF] cursor-not-allowed"
                      : "bg-[#00BFFF] hover:bg-[#00BFFF]"
                  }`}
                  disabled={updated}
                >
                  {updated ? "Updated profile!" : "Update Profile"}
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
