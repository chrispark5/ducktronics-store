import IndividualCategory from "@/components/IndividualCategoryPage";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { FloatingNavDemo } from "@/components/FloatingNavbar";
import SearchAppBar from "@/components/Navbar";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="my-20">
      {/* <FloatingNavDemo /> */}
      <SearchAppBar />
      <IndividualCategory category={category} />
    </div>
  );
}
