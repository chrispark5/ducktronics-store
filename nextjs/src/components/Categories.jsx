import CategoryCards from "@/components/CategoryCards"


export default function Categories() {
  const categoryArray = ["Computers", "Phones", "Tablets", "Watches", "Audio", "Home", "Accessories"];

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
