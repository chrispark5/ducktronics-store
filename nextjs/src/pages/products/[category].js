import IndividualCategory from "@/components/IndividualCategoryPage";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { FloatingNavDemo } from "@/components/FloatingNavbar";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="relative">
      <FloatingNavDemo />
      <IndividualCategory category={category} />
    </div>
  );
}
