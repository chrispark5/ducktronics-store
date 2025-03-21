import { useEffect } from "react";
import { useRouter } from "next/router";
import IndividualItem from "@/components/IndividualItem";
import SuggestedItems from "@/components/SuggestedItems";
import { FloatingNavDemo } from "@/components/FloatingNavbar";
import SearchAppBar from "@/components/Navbar";
export default function ItemPage() {
  const router = useRouter();
  const { item } = router.query;
  return (
    <div className="my-20">
      {/* <FloatingNavDemo /> */}
      <SearchAppBar />
      <IndividualItem id={item} />
      <SuggestedItems id={item} />
    </div>
  );
}
