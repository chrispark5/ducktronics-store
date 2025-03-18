import IndividualCategory from "@/components/IndividualCategoryPage";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <>
      <IndividualCategory category={category} />
    </>
  );
}
