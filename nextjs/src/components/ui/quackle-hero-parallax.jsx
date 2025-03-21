"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import SplitText from "./split-text";

export const QuackleHeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.id}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.id}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.id}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        <SplitText text={"Ducktronics"} />
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        Waddle into the Future of Technology!
      </p>
    </div>
  );
};

export const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.id}
      className="product-card group h-96 w-[30rem] relative shrink-0"
    >
      <Link
        href="/product/[id]"
        as={`/product/${product.id}`}
        key={product.id}
        className="block group-hover/product:shadow-2xl"
      >
        {/* Product Image */}
        <img
          src={`/images/${product.category}/${product.name}.jpg`}
          height="600"
          width="600"
          className="product-image object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.name}
        />
        {/* Overlay */}
        <div className="product-overlay absolute inset-0 h-full w-full group-hover:opacity-80 bg-black transition-opacity duration-300"></div>
        {/* Product Name */}
        <h2 className="product-name absolute bottom-4 left-4 text-white text-lg font-semibold  group-hover:opacity-100 transition-opacity duration-300 z-10">
          {product.name}
        </h2>
      </Link>
    </motion.div>
  );
};

export const ProductCard2 = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.name}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <Link
        href="/product/[id]"
        as={`/product/${product.id}`}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={`/images/${product.category}/${product.name}.jpg`}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.name}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.name}
      </h2>
    </motion.div>
  );
};
