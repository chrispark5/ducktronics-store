import { FloatingNavDemo } from "@/components/FloatingNavbar";
import SearchAppBar from "@/components/Navbar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {/* <SearchAppBar /> */}
        <Main /> {/* This is where your pages render */}
        <NextScript />
      </body>
    </Html>
  );
}
