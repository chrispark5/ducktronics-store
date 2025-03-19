import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ItemCard from "@/components/ItemCard";
import { FloatingNavDemo } from "@/components/FloatingNavbar";

export default function SearchPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
    console.log(e.target.value);
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
        console.log(data);
        setSearchResults(data);
      });
  };

  return (
    <>
      <FloatingNavDemo />
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Search Products
        </h1>

        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
            value={searchTerm}
            setValue={setSearchTerm}
          />

          {/* Display search results */}
          <div className="mt-6">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {searchResults.map((item) => (
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
        </div>
      </div>
    </>
  );
}
