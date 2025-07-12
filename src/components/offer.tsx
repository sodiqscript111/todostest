"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CarouselProps {
  items: React.ReactNode[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  content: (props: { handleClose: () => void }) => React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * index;
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full bg-black">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className={cn("flex flex-row justify-start gap-4 pl-4", "mx-auto max-w-7xl")}>
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index, ease: "easeOut" }}
                viewport={{ once: true }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-black" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <IconArrowNarrowRight className="h-6 w-6 text-black" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        onCardClose(index);
      }
    }
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, index, onCardClose]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 max-w-5xl rounded-3xl bg-black p-6 font-sans md:p-10 shadow-lg"
            >
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-white"
              >
          
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-4 text-3xl font-semibold text-white md:text-5xl"
              >
                {card.title}
              </motion.p>
              <div className="py-6">{card.content({ handleClose })}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-black md:h-[40rem] md:w-96 cursor-pointer"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-8">
          <motion.p
           
            className="text-left font-sans text-sm font-medium text-white md:text-base"
          >
          
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl"
          >
            {card.title}
          </motion.p>
        </div>
        <img
          src={card.src}
          alt={card.title}
          className="absolute inset-0 z-10 h-full w-full object-cover"
          draggable={false}
        />
      </motion.button>
    </>
  );
};

interface ServiceCardContentProps {
  description: string;
  link: string;
  handleClose: () => void;
  subPoints?: string[];
}

const ServiceCardContent = ({
  description,
  link,
  handleClose,
  subPoints = [],
}: ServiceCardContentProps) => (
  <div>
    <p className="text-base text-white">{description}</p>

    {subPoints.length > 0 && (
      <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white list-disc list-inside">
        {subPoints.map((point, idx) => (
          <li key={idx} className="text-white/80">
            {point}
          </li>
        ))}
      </ul>
    )}

    <div className="flex justify-center items-center gap-4 mt-6">
      <Link
        to={link}
        className="inline-block px-6 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition"
      >
        Learn More
      </Link>
      <button
        onClick={handleClose}
        className="bg-black text-white text-sm font-medium py-2 px-4 border border-white/20 hover:bg-gray-800 transition"
      >
        No Thanks
      </button>
    </div>
  </div>
);

const services = [
  {
    image: "https://i.ibb.co/n8swZkrg/socialmedia.jpg",
    title: "Social Media Design",
    description:
      "Engaging branded graphics for Facebook, Instagram, LinkedIn, Twitter, and more.",
    link: "/social-media-design",
    subPoints: [
      "Custom templates tailored for each platform",
      "Consistent brand messaging",
      "Analytics-driven content optimization",
    ],
  },
  {
    image: "https://i.ibb.co/Ng0X5rjw/graphis.jpg",
    title: "Graphic Design",
    description: "Stunning visuals for digital and print: logos, banners, ads, and more.",
    link: "/graphic-design",
    subPoints: [
      "Logo & identity design",
      "Print & digital assets",
      "Brand collateral development",
    ],
  },
  {
    image: "https://i.ibb.co/kgCs62Yn/printing.png",
    title: "Printing",
    description: "Flyers, posters, banners, business cards—high-quality offline branding.",
    link: "/printing",
    subPoints: [
      "Offset and digital printing",
      "High-quality materials",
      "Fast turnaround times",
    ],
  },
  {
    image: "https://i.ibb.co/ymQdvrbd/branding.jpg",
    title: "Branding",
    description: "Complete identity systems to build and maintain a strong brand voice.",
    link: "/branding",
    subPoints: [
      "Logo and style guide development",
      "Voice and messaging strategy",
      "Brand consistency audits",
    ],
  },
  {
    image: "https://i.ibb.co/B2Y0Bd8S/webdevlopment.jpg",
    title: "Website Design",
    description: "Responsive, modern web design tailored to your audience and goals.",
    link: "/website-design",
    subPoints: [
      "Mobile-first approach",
      "SEO best practices",
      "User experience optimization",
    ],
  },
  {
    image: "https://i.ibb.co/gMbYrRdM/video.png",
    title: "Video Editing",
    description: "Creative video cuts and motion graphics for ads, promos, and social content.",
    link: "/video-editing",
    subPoints: [
      "Motion graphics integration",
      "Color grading",
      "Audio enhancement",
    ],
  },
];

export default function OffersCarousel() {
  return (
    <section className="h-screen bg-black px-6 md:px-28 pt-6 md:pt-10 pb-10 flex flex-col justify-between">
      <div className="text-center mt-[40px]">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">What We Offer</h2>
        <p className="text-xl md:text-2xl text-white mt-4">
          Explore our range of services tailored to elevate your brand.
        </p>
      </div>
      <div className="flex-1 pt-10">
        <Carousel
          items={services.map((svc, index) => (
            <Card
              key={index}
              card={{
                src: svc.image,
                title: svc.title,
                content: ({ handleClose }) => (
                  <ServiceCardContent
                    description={svc.description}
                    link={svc.link}
                    handleClose={handleClose}
                    subPoints={svc.subPoints}
                  />
                ),
              }}
              index={index}
            />
          ))}
        />
      </div>
      <div className="text-center mt-6 w-full">
        <Link
          to="/all-services"
          className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black text-base font-semibold rounded-full hover:bg-gray-200 transition"
          aria-label="View all services"
        >
          All Services
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
