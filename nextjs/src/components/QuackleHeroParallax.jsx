"use client";
import React from "react";
import { useEffect, useState } from "react";
import { QuackleHeroParallax } from "@/components/ui/quackle-hero-parallax";

export function QuackleHeroParallaxActual() {
  const [randomProducts, setRandomProducts] = useState([]);
  useEffect(() => {
      fetch("http://localhost:5001/heroparallax")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRandomProducts(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, []);

  return <QuackleHeroParallax products={randomProducts} />;
}
