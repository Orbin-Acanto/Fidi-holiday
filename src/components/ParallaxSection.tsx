import React from "react";

const ParallaxSection: React.FC = () => {
  return (
    <section
      className="
        relative 
        h-[60vh]
        overflow-hidden
        parallax-bg
        mt-24
      "
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/vid3.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <h2 className="text-white text-4xl text-center md:text-6xl font-light tracking-wide drop-shadow-xl uppercase font-primary">
          'tis the season for magical
          <br /> holiday celebrations
        </h2>
      </div>
    </section>
  );
};

export default ParallaxSection;
