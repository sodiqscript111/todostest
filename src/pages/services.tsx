"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

/** ------------------------------------------------------------------
 * Types & Data
 * ------------------------------------------------------------------*/
interface Service {
  title: string;
  description: string;
  image: string;
  subPoints: string[];
}

const servicesData: Service[] = [
  {
    title: "Digital Marketing",
    description:
      "We help your brand grow through SEO, social media, and paid ads with measurable results.",
    image: "https://i.ibb.co/ymQdvrbd/branding.jpg",
    subPoints: [
      "SEO Optimization",
      "Google Ads",
      "Facebook/Instagram Ads",
      "Email Marketing",
      "Content Creation",
      "Analytics & Reports",
    ],
  },
  {
    title: "Web Development",
    description:
      "Custom, responsive websites tailored to your goals and your users’ expectations.",
    image: "https://i.ibb.co/B2Y0Bd8S/webdevlopment.jpg",
    subPoints: [
      "Responsive Layouts",
      "Frontend/Backend Dev",
      "CMS Integration",
      "Performance Optimization",
      "Hosting Setup",
      "Maintenance & Updates",
    ],
  },
  {
    title: "Branding",
    description:
      "Craft a unique identity across platforms that captures your brand’s voice and tone.",
    image: "https://i.ibb.co/Ng0X5rjw/graphis.jpg",
    subPoints: [
      "Logo Design",
      "Typography & Color",
      "Visual Language",
      "Style Guidelines",
      "Stationery Kit",
      "Brand Strategy",
    ],
  },
  {
    title: "UI Design",
    description:
      "Design delightful user interfaces that elevate usability and user engagement.",
    image: "https://i.ibb.co/n8swZkrg/socialmedia.jpg",
    subPoints: [
      "Wireframing",
      "Prototyping",
      "Mobile‑First Design",
      "UI Libraries",
      "Accessibility",
      "Design Systems",
    ],
  },
  {
    title: "Video Production",
    description:
      "We produce captivating videos that tell your story and leave a lasting impact.",
    image: "https://i.ibb.co/gMbYrRdM/video.png",
    subPoints: [
      "Corporate Videos",
      "Event Coverage",
      "Animation & Motion Graphics",
      "Promotional Videos",
      "Social Media Content",
      "Post‑Production Editing",
    ],
  },
];

/** ------------------------------------------------------------------
 * Utility Components
 * ------------------------------------------------------------------*/
function Stars({ count = 40 }: { count?: number }) {
  const positions = useMemo(() =>
    Array.from({ length: count }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    })),
  [count]);

  return (
    <>
      {positions.map((star, idx) => (
        <motion.span
          key={`star-${idx}`}
          className="absolute block h-0.5 w-0.5 rounded-full bg-white/90 dark:bg-neutral-50/90"
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
    </>
  );
}

const shapes = [
  { type: "circle", size: "w-24 h-24", top: "top-10", left: "left-10", delay: 0 },
  { type: "triangle", size: "w-16 h-16", top: "top-1/2", left: "left-1/4", delay: 2 },
  { type: "square", size: "w-20 h-20", top: "top-2/3", left: "left-3/4", delay: 4 },
];

function Shape({ type, size, top, left, delay = 0 }: { type: string; size: string; top: string; left: string; delay?: number }) {
  const baseClass = cn("absolute opacity-20 dark:opacity-25", size, top, left);

  return (
    <motion.div
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: [0.8, 1.1, 0.8], rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, delay, ease: "linear" }}
      className={cn(baseClass, {
        "rounded-full bg-primary-500/20 dark:bg-primary-400/20 backdrop-blur-sm": type === "circle",
        "bg-primary-500/20 dark:bg-primary-400/20 backdrop-blur-sm": type === "square",
        "clip-path-[polygon(50%_0%,_0%_100%,_100%_100%)] bg-primary-500/20 dark:bg-primary-400/20 backdrop-blur-sm": type === "triangle",
      })}
    />
  );
}

/** ------------------------------------------------------------------
 * Main Component
 * ------------------------------------------------------------------*/
export default function ServicesSection() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const activeService = servicesData[activeServiceIndex];

  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-white dark:bg-black px-4 lg:px-8 py-24 lg:py-32">
      {/* ─── Static Grid Background ─────────────────────────────── */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <Stars count={60} />
      {shapes.map((shape, idx) => (
        <Shape key={`shape-${idx}`} {...shape} />
      ))}

      <div className="relative z-20 mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-3">Your Ultimate Creative Partner</p>
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 leading-tight">
            All Your Brand Needs to Grow and Stand Out
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-14 lg:gap-24">
          <nav className="flex-1 space-y-2 lg:space-y-4">
            {servicesData.map((service, index) => (
              <button
                key={service.title}
                onClick={() => setActiveServiceIndex(index)}
                className={cn(
                  "block w-full text-left text-xl md:text-2xl font-medium transition-colors",
                  index === activeServiceIndex
                    ? "text-primary-500 dark:text-primary-400"
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300",
                )}
              >
                {service.title}
              </button>
            ))}
          </nav>

          <div className="flex-[2] space-y-6 md:space-y-8">
            <motion.h2
              key={activeService.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-neutral-100"
            >
              {activeService.title}
            </motion.h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
              {activeService.description}
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {activeService.subPoints.map((point, index) => (
                <li key={point} className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
                  <span className="text-primary-500 dark:text-primary-400 font-bold">+</span>
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {point}
                  </motion.span>
                </li>
              ))}
            </ul>

            <button
              className="mt-6 inline-flex items-center justify-center rounded-lg border border-primary-500 px-6 py-3 text-primary-500 hover:bg-primary-500 hover:text-white transition-colors"
            >
              Discuss your project with us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
