import React from "react";
import { Typography, Box } from "@mui/material";
import CategoryCards from "@/components/CategoryCards";

export default function Categories() {
  const categoryArray = [
    "Computers",
    "Phones",
    "Tablets",
    "Watches",
    "Audio",
    "Home",
    "Accessories",
  ];

  return (
    <>
      <Box textAlign="center" my={12}>
        <Typography variant="h1" color="primary" fontWeight="bold">
          Categories
        </Typography>
      </Box>
      <CategoryCards categoryArray={categoryArray} />
    </>
  );
}
