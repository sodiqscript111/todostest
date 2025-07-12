"use client";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import  { useMemo } from "react";

const AboutUs = () => {
  // Floating solid shapes
  const shapes = [
    { x: "20%", y: "15%", size: "w-24 h-24", delay: 0, type: "circle" },
    { x: "75%", y: "25%", size: "w-16 h-16", delay: 0.2, type: "star" },
    { x: "85%", y: "70%", size: "w-32 h-32", delay: 0.4, type: "circle" },
    { x: "15%", y: "80%", size: "w-20 h-20", delay: 0.6, type: "star" },
    { x: "45%", y: "10%", size: "w-8 h-8", delay: 0.8, type: "circle" },
    { x: "30%", y: "60%", size: "w-28 h-28", delay: 1.0, type: "star" },
    { x: "60%", y: "40%", size: "w-12 h-12", delay: 1.2, type: "circle" },
  ];

  // Black stars twinkling overlay
  const starPositions = useMemo(
    () =>
      Array.from({ length: 50 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      })),
    []
  );

  return (
    <section
      className={cn(
        "bg-white min-h-[60rem] max-sm:min-h-[40rem] relative overflow-hidden flex items-center justify-center px-8 py-16 md:px-12"
      )}
    >
      {/* Floating solid shapes */}
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={cn(
            "absolute bg-black",
            shape.size,
            shape.type === "circle" ? "rounded-full" : "clip-path-star"
          )}
          style={{ left: shape.x, top: shape.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1, rotate: [0, 360] }}
          transition={{
            opacity: { duration: 0.8, delay: shape.delay },
            scale: { duration: 0.8, delay: shape.delay },
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          }}
        />
      ))}

      {/* Black twinkling stars */}
      {starPositions.map((star, i) => (
        <motion.span
          key={`star-${i}`}
          className="absolute block h-0.5 w-0.5 rounded-full bg-black"
          style={{ top: `${star.top}%`, left: `${star.left}%` }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: star.duration,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main Content */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between w-full h-full mt-10">
        {/* Static Heading */}
        <div className="mb-6 md:mb-0">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black text-black leading-none">
            About Us
          </h1>
        </div>

        {/* Description & Line */}
        <div className="text-right">
          <motion.p
            className="text-xl md:text-2xl text-black/70 max-w-xl ml-auto mb-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            We are a passionate team dedicated to creating innovative and impactful
            designs that elevate brands and inspire communities. With years of
            experience in the industry, we blend creativity with technology to
            deliver tailored solutions that meet our clients' unique needs. Our mission
            is to transform ideas into visual stories that resonate and endure.
          </motion.p>

          <motion.div
            className="w-24 h-1 bg-black mx-auto md:mx-0"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
