import React from "react";
import AnimatedBackground from "./AnimatedBackground.jsx";

// Recibe applyBlur
function HeroSection({ scrollY, isMouseInteractive, applyBlur }) {
  const parallaxOffsetY = scrollY * 0.35;
  const fadeOutOpacity = Math.max(0, 1 - scrollY / 250);

  return (
    <section id="hero" className="min-h-screen relative text-white">
      {/* Pasa ambas props a AnimatedBackground */}
      <AnimatedBackground
        isMouseInteractive={isMouseInteractive}
        applyBlur={applyBlur}
      />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
        <div
          title="Español"
          className="w-8 h-6 cursor-pointer flex justify-center items-center text-xs font-bold"
        >
          <img src="/ESP.png" alt="" />
        </div>
        <div
          title="English"
          className="w-8 h-6 cursor-pointer flex justify-center items-center text-xs font-bold"
        >
          <img src="/ENG.png" alt="" />
        </div>
      </div>

      <div
        className="min-h-screen flex flex-col justify-center items-center p-8 pt-24 md:pt-8 relative z-10"
        style={{
          transform: `translateY(${parallaxOffsetY}px)`,
          opacity: fadeOutOpacity,
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-5xl">
          {/* Foto */}
          <div className="flex-shrink-0">
            <img
              src="/user.webp"
              alt="Rodrigo Silva Díaz"
              className="w-auto max-w-[240px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[380px] h-auto object-contain grayscale hover:grayscale-0 transition duration-500 rounded-full border-4 border-white shadow-2xl"
            />
          </div>
          {/* Textos */}
          <div className="text-center md:text-left mt-6 md:mt-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
              Rodrigo Silva Díaz
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-300 mb-4">
              Full Stack Developer
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400">
              Bienvenido a mi porfolio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
