import { useEffect, useRef, useState } from "react";
import { Box, Typography, Grid, Paper, Rating, Button } from "@mui/material";
import { useCartStore } from "@/hooks/CartStore";
import { useAddToWishlist } from "@/hooks/useAddToWishlist";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function IndividualItem({ id }) {
  const [item, setItem] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5001/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Product data:", data);
        setItem(data); // Set the product item
      })
      .catch((error) => console.error("Error fetching product:", error));

    // Retrieve token only on client-side
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, [id]);

  useEffect(() => {
    if (!item || !item._id || !token) return; // Wait for item._id & token

    fetch(`http://localhost:5001/wishlist/${item._id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Wishlist data:", data);
        setIsSaved(data.exists);
      })
      .catch((error) => console.error("Error checking wishlist:", error));
  }, [item, token]); //

  const cardRef = useRef(null); // Reference to the item card
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
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

  const addItem = (item) => {
    addToCart(item);
    setAdded(true);
  };

  const { addToWishlist, loading, error } = useAddToWishlist();
  const handleAddToWishlist = async () => {
    if (!token) {
      router.push("/login");
      return;
    }
    await addToWishlist(item);
    setIsSaved(true);
  };

  return (
    <>
      {item && (
        <Box
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Product Image */}
          <Paper
            sx={{ padding: 2, boxShadow: 3, maxWidth: 600, width: "100%" }}
          >
            <Box
              component="img"
              src={`/images/${item.category}/${item.name}.jpg`}
              alt={item.name}
              sx={{ width: "100%", borderRadius: 2 }}
            />
          </Paper>
          {/* item Information */}
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: 1 }}
            >
              {item.name}
            </Typography>

            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ marginBottom: 2 }}
            >
              {item.category} | {item.color}
            </Typography>

            <Typography variant="h6" color="primary" sx={{ marginBottom: 1 }}>
              ${item.price}
            </Typography>

            {/* item Rating */}
            <Box sx={{ marginBottom: 2 }}>
              <Rating value={item.rating} readOnly />
            </Box>
            <Box
              sx={{
                marginBottom: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={handleAddToWishlist}
                disabled={isSaved} // Disable if saved or loading
                className={`flex items-center gap-2 px-4 py-2 rounded transition ${
                  isSaved
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {isSaved ? (
                  <>
                    <IconHeartFilled size={20} className="text-white" />
                    Saved
                  </>
                ) : (
                  <>
                    <IconHeart size={20} className="text-white" />
                    Save to Wishlist
                  </>
                )}
              </button>
            </Box>

            {/* Add to Cart Button */}

            <Button
              ref={cardRef}
              variant="contained"
              color="primary"
              size="large"
              sx={{ paddingX: 4 }}
              className={`mt-4 w-full py-2 px-4 rounded-md 
    ${
      added ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
    } 
    text-white`}
              onClick={() => addItem(item)}
              disabled={added} // Disable the button if 'added' is true
            >
              {added ? "Added" : "Add to Cart"}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
