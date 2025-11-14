"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceItem {
  title: string;
  description: string;
  images: string[];
  buttonText: string;
  buttonLink: string;
  pillLabel?: string;
}

interface ServiceSectionProps {
  items: ServiceItem[];
}

const ServiceCard: React.FC<{
  item: ServiceItem;
  isImageLeft: boolean;
}> = ({ item, isImageLeft }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToImage = (idx: number) => {
    setCurrentImageIndex(idx);
  };

  return (
    <div
      className={`flex flex-col ${
        isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-0`}
    >
      <div className="relative w-full lg:w-1/2">
        <div className="relative h-[400px] lg:h-[600px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={item.images[currentImageIndex]}
              alt={`${item.title} - Image ${currentImageIndex + 1}`}
              className="h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          {item.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {item.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToImage(idx)}
                  className={`h-2 transition-all duration-300 ${
                    idx === currentImageIndex
                      ? "bg-primary w-8"
                      : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full items-center bg-gray-50 lg:w-1/2">
        <div className="w-full px-8 py-12 lg:px-16 lg:py-20">
          <div className="mb-4 inline-flex bg-primary px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white">
            {item.pillLabel}
          </div>

          <h2 className="mb-6 text-3xl font-light text-gray-900 lg:text-4xl xl:text-5xl">
            {item.title}
          </h2>
          <p className="mb-8 text-base leading-relaxed text-gray-600 lg:text-lg">
            {item.description}
          </p>

          <motion.a
            href={item.buttonLink}
            className="group relative inline-block overflow-hidden border border-primary bg-transparent px-8 py-3 text-sm font-medium text-primary transition-colors duration-300 hover:text-white"
            whileHover="hover"
          >
            <motion.span
              className="absolute inset-0 bg-primary"
              initial={{ x: "-100%" }}
              variants={{
                hover: { x: 0 },
              }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">{item.buttonText}</span>
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export const ServiceSection: React.FC<ServiceSectionProps> = ({ items }) => {
  return (
    <section className="w-full">
      {items.map((item, index) => {
        const isImageLeft = index % 2 === 0;
        return (
          <ServiceCard key={index} item={item} isImageLeft={isImageLeft} />
        );
      })}
    </section>
  );
};
