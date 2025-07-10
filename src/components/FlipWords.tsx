"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      setTimeout(() => {
        startAnimation();
      }, duration);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <div className={cn("z-10 flex items-center text-left", className)} aria-live="polite">
      <span className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
        What service would you need today
      </span>
      <AnimatePresence
        onExitComplete={() => {
          setIsAnimating(false);
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          exit={{
            opacity: 0,
            y: -40,
            filter: "blur(8px)",
            scale: 1.5,
            position: "absolute",
          }}
          className="inline-block text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 px-2"
          key={currentWord}
        >
          &quot;{currentWord}&quot;?
        </motion.span>
      </AnimatePresence>
    </div>
  );
};