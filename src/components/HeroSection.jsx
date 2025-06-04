import React from "react";
import AnimatedBackground from "./AnimatedBackground.jsx";

// Recibe applyBlur
function HeroSection({ onIngresarClick, isHeroViewActive, applyBlur }) {
  return (
    <section
      id="hero"
      className="min-h-screen relative text-white"
      style={{ background: "#202020" }}
    >
      {/* Pasa ambas props a AnimatedBackground */}
      <AnimatedBackground isHeroViewActive={isHeroViewActive} applyBlur={applyBlur}/>
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

      <div className="min-h-screen flex flex-col justify-center items-center p-8 pt-20 md:pt-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-5xl">
          <div className="flex-shrink-0">
            <img
              src="/user.webp"
              alt="Rodrigo Silva Díaz"
              className="w-auto max-w-[300px] md:max-w-[350px] lg:max-w-[400px] h-auto object-contain grayscale hover:grayscale-0 transition duration-500"
            />
          </div>
          <div className="text-center md:text-left">
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

      <a
        href="#about"
        onClick={onIngresarClick} // <--- LLAMA a la función al hacer clic
        className="absolute bottom-8 text-lg cursor-pointer z-20 animate-pulse md:right-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 font-bold hover:text-yellow-400 transition-colors duration-300"
      >
        INGRESAR
      </a>
    </section>
  );
}

export default HeroSection;
