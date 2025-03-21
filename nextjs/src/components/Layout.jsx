import ImageTrail2 from "./ImageTrail2";

export default function Layout({ children }) {
  return (
    <div style={{ position: "relative" }}>
      {/* Image Trail as Background */}

      {/* Page Content */}
      <main style={{ position: "relative", zIndex: 1 }}>
        {children}
        <ImageTrail2 />
      </main>
    </div>
  );
}
