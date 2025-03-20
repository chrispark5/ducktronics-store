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
          "https://picsum.photos/id/287/300/300",
          "https://picsum.photos/id/1001/300/300",
          "https://picsum.photos/id/1025/300/300",
          "https://picsum.photos/id/1026/300/300",
          "https://picsum.photos/id/1027/300/300",
          "https://picsum.photos/id/1028/300/300",
          "https://picsum.photos/id/1029/300/300",
          "https://picsum.photos/id/1030/300/300",
        ]}
        variant={1}
      />
    </div>
  );
};

export default ImageTrail2;
