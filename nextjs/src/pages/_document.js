import DuckMoodIndicator from "@/components/DuckMoodIndicator";
import NewFooter from "@/components/Footer";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        {/* <SearchAppBar /> */}
        <div
          style={{
            position: "fixed",
            bottom: "20px", // Distance from the bottom of the screen
            right: "20px", // Distance from the right of the screen
            zIndex: 1000, // Ensure it stays on top of other elements
          }}
        >
          <DuckMoodIndicator />
        </div>
        <Main />
        <NewFooter />
        <NextScript />
      </body>
    </Html>
  );
}
