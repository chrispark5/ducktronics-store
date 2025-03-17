"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Battlecreek Coffee",
    link: "https://gomoonbeam.com",
    thumbnail: "/images/products/battlecreek.jpg",
  },
  {
    title: "Airpods",
    link: "https://cursor.so",
    thumbnail: "/images/products/airpods.jpg",
  },
  {
    title: "Nike Shoes",
    link: "https://userogue.com",
    thumbnail: "/images/products/domino.jpg",
  },

  {
    title: "Drink",
    link: "https://editorially.org",
    thumbnail: "/images/products/drink.jpg",
  },
  {
    title: "Headphones",
    link: "https://editrix.ai",
    thumbnail: "/images/products/pdx.jpg",
  },
  {
    title: "Sunglasses",
    link: "https://app.pixelperfect.quest",
    thumbnail: "/images/products/sunglasses.jpg",
  },

  {
    title: "Watch",
    link: "https://algochurn.com",
    thumbnail: "/images/products/watch.jpg",
  },
  //   {
  //     title: "Aceternity UI",
  //     link: "https://ui.aceternity.com",
  //     thumbnail:
  //       "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  //   },
  //   {
  //     title: "Tailwind Master Kit",
  //     link: "https://tailwindmasterkit.com",
  //     thumbnail:
  //       "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  //   },
  //   {
  //     title: "SmartBridge",
  //     link: "https://smartbridgetech.com",
  //     thumbnail:
  //       "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  //   },
  //   {
  //     title: "Renderwork Studio",
  //     link: "https://renderwork.studio",
  //     thumbnail:
  //       "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  //   },

  //   {
  //     title: "Creme Digital",
  //     link: "https://cremedigital.com",
  //     thumbnail:
  //       "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  //   },
  //   {
  //     title: "Golden Bells Academy",
  //     link: "https://goldenbellsacademy.com",
  //     thumbnail:
  //       "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  //   },
  //   {
  //     title: "Invoker Labs",
  //     link: "https://invoker.lol",
  //     thumbnail:
  //       "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  //   },
  //   {
  //     title: "E Free Invoice",
  //     link: "https://efreeinvoice.com",
  //     thumbnail:
  //       "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  //   },
];
