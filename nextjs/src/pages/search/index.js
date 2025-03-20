import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ItemCard from "@/components/ItemCard";
import SearchAppBar from "@/components/Navbar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function SearchPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [filter, setFilter] = useState(""); // Filter state
  const [sort, setSort] = useState(""); // Sort state
  const itemsPerPage = 6; // Number of items per page
  const placeholders = [
    "Search for products",
    "Search for items",
    "Search for categories",
  ];

  useEffect(() => {
    const { query } = router.query;
    if (query) {
      setSearchTerm(query);
      fetchResults(query);
    }
  }, [router.query]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?query=${searchTerm}`, undefined, { shallow: true });
    fetchResults(searchTerm);
  };

  const fetchResults = (term) => {
    fetch(`http://localhost:5001/search?q=${term}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      });
  };

  // Filter and sort results
  const filteredAndSortedResults = searchResults
    .filter((item) => {
      if (filter === "inStock") return item.stock > 0;
      if (filter === "outOfStock") return item.stock === 0;
      if (filter === "highRating") return item.rating >= 4;
      if (filter === "lowRating") return item.rating < 4;
      return true; // No filter applied
    })
    .sort((a, b) => {
      if (sort === "priceLowToHigh") return a.price - b.price;
      if (sort === "priceHighToLow") return b.price - a.price;
      if (sort === "ratingHighToLow") return b.rating - a.rating;
      if (sort === "ratingLowToHigh") return a.rating - b.rating;
      return 0; // No sorting applied
    });

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredAndSortedResults.length / itemsPerPage);

  // Get the results for the current page
  const paginatedResults = filteredAndSortedResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative">
      <SearchAppBar />
      <div className="min-h-screen bg-gray-100 py-8 px-4 my-18">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Search Products
        </h1>

        <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
            value={searchTerm}
            setValue={setSearchTerm}
          />

          {/* Filter and Sort Controls */}
          <div className="flex justify-between items-center mt-6">
            {/* Filter Dropdown */}
            <select
              className="border border-gray-300 rounded px-4 py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Filter by</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="highRating">High Rating (4+)</option>
              <option value="lowRating">Low Rating (&lt;4)</option>
            </select>

            {/* Sort Dropdown */}
            <select
              className="border border-gray-300 rounded px-4 py-2"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="ratingHighToLow">Rating: High to Low</option>
              <option value="ratingLowToHigh">Rating: Low to High</option>
            </select>
          </div>

          {/* Display search results */}
          <div className="mt-6">
            {paginatedResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedResults.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    <ItemCard product={item} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No results found</p>
            )}
          </div>

          {/* Pagination Controls */}
          {filteredAndSortedResults.length > itemsPerPage && (
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
          )}
        </div>
      </div>
    </div>
  );
}
