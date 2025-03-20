import { useEffect, useState } from "react";
import SearchAppBar from "@/components/Navbar";
import { Modal, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useCartStore } from "@/hooks/CartStore";
import WishlistItem from "@/components/WishlistItem";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Item to remove
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const router = useRouter();
  // Fetch wishlist items from the endpoint
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if not authenticated
      router.push("/login");
      return;
    }
    fetch("http://localhost:5001/wishlist", {
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
        console.log(data);
        setWishlistItems(data);
      })
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, []);

  // Open the modal and set the selected item
  const handleRemoveClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleConfirmRemove = () => {
    if (selectedItem) {
      console.log(selectedItem);
      const token = localStorage.getItem("token");

      fetch(`http://localhost:5001/wishlist/${selectedItem._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
          "Content-Type": "application/json", // Optional, but good practice
        },
      })
        .then((response) => {
          if (response.ok) {
            // Remove the item from the local state
            setWishlistItems((prevItems) =>
              prevItems.filter((item) => item._id !== selectedItem._id)
            );
            handleCloseModal();
          } else {
            console.error("Failed to remove item from wishlist");
          }
        })
        .catch((error) => console.error("Error removing item:", error));
    }
  };

  return (
    <div className="my-20">
      <SearchAppBar />
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Your Wishlist
        </h1>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <WishlistItem
                key={item._id}
                item={item}
                handleRemoveClick={handleRemoveClick}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        )}

        {/* Confirmation Modal */}
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="remove-wishlist-item"
          aria-describedby="remove-wishlist-item-description"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto mt-40">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Remove Item
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove{" "}
              <span className="font-bold">{selectedItem?.name}</span> from your
              wishlist?
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmRemove}
              >
                Remove
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
