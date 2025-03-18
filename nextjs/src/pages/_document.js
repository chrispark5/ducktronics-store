import { FloatingNavDemo } from "@/components/FloatingNavbar";
import SearchAppBar from "@/components/Navbar";
import { CartProvider } from "@/hooks/CartContext";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {/* <SearchAppBar /> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
