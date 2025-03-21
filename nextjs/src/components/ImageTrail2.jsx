import ImageTrail from "@/blocks/Animations/ImageTrail/ImageTrail";

const ImageTrail2 = () => {
  return (
    <div
      style={{
        position: "fixed", // Ensures it covers the entire page
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: -1, // Puts it behind other content
      }}
    >
      <ImageTrail
        items={[
          "/images/ducks/duck1.jpg",
          "/images/ducks/duck2.jpg",
          "/images/ducks/duck3.jpg",
          "/images/ducks/duck4.jpg",
          "/images/ducks/duck5.jpg",
          "/images/ducks/duck6.jpg",
          "/images/ducks/duck-glasses.jpeg",
          "/images/ducks/duck-hat.jpeg",
          "/images/ducks/fancy-duck.jpg",
          "/images/ducks/mouth-duck.jpg",
        ]}
        variant={3}
      />
    </div>
  );
};

export default ImageTrail2;
