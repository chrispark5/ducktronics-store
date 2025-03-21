import { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Rating,
  Button,
  TextField,
} from "@mui/material";
import { useCartStore } from "@/hooks/CartStore";
import { useAddToWishlist } from "@/hooks/useAddToWishlist";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useRouter } from "next/router";
import Carousel from "./ui/carousel";

export default function IndividualItem({ id }) {
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]); // State for reviews
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" }); // State for new review
  const [isSaved, setIsSaved] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    // Fetch product details
    fetch(`http://localhost:5001/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
      })
      .catch((error) => console.error("Error fetching product:", error));

    // Fetch reviews for the product
    fetch(`http://localhost:5001/product/${id}/reviews`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => console.error("Error fetching reviews:", error));

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

  const handleAddReview = async () => {
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/product/${id}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newReview),
        }
      );

      if (response.ok) {
        const addedReview = await response.json();
        setReviews((prev) => [...prev, addedReview]); // Add the new review to the list
        setNewReview({ rating: 0, comment: "" }); // Reset the form
      } else {
        console.error("Failed to add review.");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
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
                flexDirection: "row",
                gap: 2, // Adds spacing between buttons
              }}
            >
              {/* Save to Wishlist Button */}
              <button
                onClick={handleAddToWishlist}
                disabled={isSaved}
                sx={{
                  borderRadius: "8px", // Match border radius
                }}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md transition text-white 
      ${
        isSaved
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600"
      }
    `}
                style={{ height: "48px" }} // Explicit height
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

              {/* Add to Cart Button */}
              <Button
                ref={cardRef}
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  paddingX: 4,
                  minWidth: "160px", // Wider button
                  height: "48px", // Match height with wishlist button
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px", // Match border radius
                  backgroundColor: added ? "gray" : "#00BFFF",
                  "&:hover": { backgroundColor: added ? "gray" : "#00BFFF" },
                }}
                onClick={() => addItem(item)}
                disabled={added}
              >
                {added ? "Added" : "Add to Cart"}
              </Button>
            </Box>
            {/* Reviews Section */}
            <Box sx={{ marginTop: 4, width: "100%" }}>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Reviews
              </Typography>
              {reviews.length > 0 ? (
                <Carousel reviews={reviews} />
              ) : (
                <Typography>No reviews yet. Be the first to review!</Typography>
              )}
            </Box>

            {/* Add Review Form */}
            <Box sx={{ marginTop: 4, width: "100%" }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Add a Review
              </Typography>
              <Rating
                value={newReview.rating}
                onChange={(e, newValue) =>
                  setNewReview((prev) => ({ ...prev, rating: newValue }))
                }
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Write your review here..."
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, comment: e.target.value }))
                }
                sx={{ marginTop: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={handleAddReview}
              >
                Submit Review
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
