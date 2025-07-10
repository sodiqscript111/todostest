import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(true); // Show popup on load

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative mx-4 h-[500px] w-full max-w-md bg-black rounded-lg shadow-xl"
          >
            {/* Image (65% of height) */}
            <div className="h-[65%] w-full">
              <img
                src="https://i.imghippo.com/files/mUt6925kJY.png"
                alt="TodoDigitals Card"
                className="h-full w-full object-cover rounded-t-lg"
              />
            </div>

            {/* Content (35% of height) */}
            <div className="flex h-[35%] flex-col justify-between p-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white text-center">
                  Order Your TodoDigitals Card Today
                </h2>
                <p className="mt-4 text-base text-white text-center">
                  A digital business card for you and your team — instantly share your latest business info, stand out with tech, and easily capture leads.
                </p>
              </div>
              <div className="flex justify-center items-center gap-4 mt-4">
                <Link
                  to="/order"
                  className="block w-full max-w-[150px] bg-white text-black text-sm font-semibold py-2 text-center hover:bg-gray-200 transition"
                  aria-label="Order TodoDigitals Card"
                >
                  Order Now
                </Link>
                <button
                  onClick={handleClose}
                  className="bg-black text-white text-sm font-medium py-2 px-4 border border-white/20 hover:bg-gray-800 transition"
                  aria-label="Dismiss popup"
                >
                  No Thanks
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}