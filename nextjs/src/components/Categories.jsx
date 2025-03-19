import CategoryCards from "@/components/CategoryCards"


export default function Categories() {
  const categoryArray = ["Tools", "Technology", "Sports"];

  return (
    <>
      <div className="text-center my-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white">
          Categories
        </h1>
      </div>
      <CategoryCards categoryArray={categoryArray}/>
    </>
  );
}
