"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const images = [
    "https://i.ibb.co/WN08nCCh/Whats-App-Image-2025-07-06-at-14-24-34-27421a02.jpg",
    "https://i.ibb.co/xKPZVtGT/Whats-App-Image-2025-07-06-at-14-24-34-8fe47a0f.jpg",
    "https://i.ibb.co/S4pjXMzr/Whats-App-Image-2025-07-06-at-14-24-50-d6f8c1ef.jpg",
    "https://i.ibb.co/TxwVhTjt/Whats-App-Image-2025-07-06-at-14-24-37-161ad57c.jpg",
    "https://i.ibb.co/TDzYgSY0/Whats-App-Image-2025-07-06-at-14-24-47-9af0bf2b.jpg",
    "https://i.ibb.co/WNLvbtMX/Whats-App-Image-2025-07-06-at-14-24-46-b93a99f2.jpg",
    "https://i.ibb.co/S7Q7p95T/Whats-App-Image-2025-07-06-at-14-24-35-23a2f923.jpg",
    "https://i.ibb.co/9H3mhC2v/business-cards-791facf7936befec4c7b.png",
    "https://i.ibb.co/WSmLdfF/Latest-Work-010-31b6aac22e58ea04e9d5.png",
];

export const ParallaxScroll = ({
    className,
}: {
    className?: string;
}) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        container: gridRef,
        offset: ["start start", "end start"],
    });

    const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const translateThird = useTransform(scrollYProgress, [0, 1], [0, -300]);

    const third = Math.ceil(images.length / 3);

    const firstPart = images.slice(0, third);
    const secondPart = images.slice(third, 2 * third);
    const thirdPart = images.slice(2 * third);

    return (
        // Added overflow-x-hidden to prevent any horizontal scrollbar on the whole section
        <section className={cn("bg-black w-full py-16 overflow-x-hidden", className)}>
            <div className="text-center pt-12 pb-8">
                <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                    Our Work
                </h2>
                <p className="text-xl md:text-2xl text-white/80 mt-4 max-w-3xl mx-auto">
                    Discover our portfolio of creative projects that elevate brands.
                </p>
            </div>
            <div
                className="h-[60rem] items-start overflow-y-auto w-full scrollbar-hide"
                ref={gridRef}
            >
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-6xl mx-auto gap-6 md:gap-8 py-24 px-6 md:px-12"
                >
                    <div className="grid gap-6 md:gap-8">
                        {firstPart.map((el, idx) => (
                            <motion.div
                                style={{ y: translateFirst }}
                                key={"grid-1" + idx}
                                className="relative overflow-hidden rounded-xl shadow-lg"
                                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                            >
                                <img
                                    src={el}
                                    className="h-[28rem] w-full object-cover object-center rounded-xl"
                                    height="600"
                                    width="600"
                                    alt="portfolio thumbnail"
                                />
                            </motion.div>
                        ))}
                    </div>
                    <div className="grid gap-6 md:gap-8">
                        {secondPart.map((el, idx) => (
                            <motion.div
                                style={{ y: translateSecond }}
                                key={"grid-2" + idx}
                                className="relative overflow-hidden rounded-xl shadow-lg"
                                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                            >
                                <img
                                    src={el}
                                    className="h-[28rem] w-full object-cover object-center rounded-xl"
                                    height="600"
                                    width="600"
                                    alt="portfolio thumbnail"
                                />
                            </motion.div>
                        ))}
                    </div>
                    <div className="grid gap-6 md:gap-8">
                        {thirdPart.map((el, idx) => (
                            <motion.div
                                style={{ y: translateThird }}
                                key={"grid-3" + idx}
                                className="relative overflow-hidden rounded-xl shadow-lg"
                                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                            >
                                <img
                                    src={el}
                                    className="h-[28rem] w-full object-cover object-center rounded-xl"
                                    height="600"
                                    width="600"
                                    alt="portfolio thumbnail"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function OurWork() {
    return <ParallaxScroll />;
}