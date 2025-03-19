import { useEffect } from "react";
import { useRouter } from "next/router";
import IndividualItem from "@/components/IndividualItem";
import SuggestedItems from "@/components/SuggestedItems";
export default function ItemPage() {
  const router = useRouter();
  const { item } = router.query;
  return (
    <>
      <FloatingNavDemo />
      <IndividualItem id={item} />
      <SuggestedItems id={item} />
    </>
  );
}
