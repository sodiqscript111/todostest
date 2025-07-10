import { cn } from "@/lib/utils";
import React from "react";
import { FlipWords } from "./FlipWords";

export function GridBackgroundDemo() {
  const words = ["Branding", "Printing", "Marketing", "Design"];

  return (
    <div className="relative flex h-[40rem] w-full items-start justify-start bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="relative z-20 flex flex-col items-start justify-start max-w-[900px] p-8 pt-16 md:p-16 md:pt-24 text-left">
        <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-4">
          Your Ultimate Creative Partner
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 leading-tight">
          All Your Brand Needs to Grow and Stand Out
        </h1>
        <FlipWords
          words={words}
          duration={3000}
          className="text-neutral-900 dark:text-neutral-100 mb-6"
        />
        <button
          className="bg-white text-black px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200"
          aria-label="Start a project"
        >
          Start a Project
        </button>
      </div>
    </div>
  );
}