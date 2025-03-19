import { useEffect, useRef, useState } from "react";
import { Box, Typography, Grid, Paper, Rating, Button } from "@mui/material";
import { useCartStore } from "@/hooks/CartStore";

export default function IndividualItem({ id }) {
  const [item, setItem] = useState(null);
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5001/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItem(data);
      });
  }, [id]);
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
              src={item.image}
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
