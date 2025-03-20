import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import SearchAppBar from "./Navbar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function IndividualCategory({ category }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 6; // Number of items per page

  useEffect(() => {
    if (!category) return;
    fetch(`http://localhost:5001/products/${category}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, [category]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get the products for the current page
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <SearchAppBar />
      <div className="px-3 py-8">
        {/* Category Header */}
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          {category} {/* Dynamic Category Name */}
        </h2>

        {/* Grid Layout for Products */}
        <div className="grid lg:grid-cols-3 gap-4">
          {paginatedProducts.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <Stack spacing={2}>
            <Pagination
              count={totalPages} // Total number of pages
              page={currentPage} // Current active page
              onChange={handlePageChange} // Handle page change
              color="primary" // Color of the pagination
              variant="outlined" // Outlined style
              shape="rounded" // Rounded style
            />
          </Stack>
        </div>
      </div>
    </>
  );
}
