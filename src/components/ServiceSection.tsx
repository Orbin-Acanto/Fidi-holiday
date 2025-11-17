"use client";

import React, { useState, useEffect } from "react";
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
  currentImageIndex: number;
  onImageChange: (idx: number) => void;
}> = ({ item, isImageLeft, currentImageIndex, onImageChange }) => {
  const normalizedIndex = currentImageIndex % item.images.length;
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const nextIndex = (normalizedIndex + 1) % item.images.length;
    if (!loadedImages.has(nextIndex)) {
      const img = new Image();
      img.src = item.images[nextIndex];
      img.onload = () => {
        setLoadedImages((prev) => new Set([...prev, nextIndex]));
      };
    }
  }, [normalizedIndex, item.images, loadedImages]);

  const goToImage = (idx: number) => {
    onImageChange(idx);
  };

  return (
    <div
      className={`flex flex-col ${
        isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-0`}
    >
      <div className="relative w-full lg:w-1/2">
        <div className="relative h-[400px] lg:h-[600px] overflow-hidden bg-black">
          <div className="absolute inset-0">
            <img
              src={item.images[normalizedIndex]}
              className="h-full w-full object-cover"
              alt={`${item.title} - Base`}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={normalizedIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            >
              <motion.img
                src={item.images[normalizedIndex]}
                className="h-full w-full object-cover"
                alt={`${item.title} - Image ${normalizedIndex + 1}`}
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{
                  duration: 4,
                  ease: "linear",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {item.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {item.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToImage(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === normalizedIndex
                      ? "bg-primary w-8"
                      : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
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
          <p
            className="mb-8 text-base leading-relaxed text-gray-600 lg:text-lg"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />

          <motion.a
            href={item.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const hasMultipleImages = items.some((item) => item.images.length > 1);
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <section className="w-full">
      {items.map((item, index) => {
        const isImageLeft = index % 2 === 0;
        return (
          <ServiceCard
            key={index}
            item={item}
            isImageLeft={isImageLeft}
            currentImageIndex={currentImageIndex}
            onImageChange={setCurrentImageIndex}
          />
        );
      })}
    </section>
  );
};
