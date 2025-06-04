// src/components/Navbar.jsx
import React from "react";

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 
                 bg-black bg-opacity-80 backdrop-blur-md 
                 shadow-lg transition-all duration-300 ease-in-out"
      // bg-opacity-80 para 80% de opacidad (Tailwind v3) o bg-black/80 (Tailwind v3.1+)
      // backdrop-blur-md para el efecto de desenfoque del fondo
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Contenedor para centrar el contenido del navbar */}
        <ul className="flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 md:gap-x-10 gap-y-2 py-3">
          {" "}
          {/* py-3 para padding vertical */}
          <li>
            <a
              href="#about"
              className="text-white text-md sm:text-lg hover:text-yellow-400 transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-yellow-400"
            >
              Sobre mí
            </a>
          </li>
          <li>
            <a
              href="#estudios"
              className="text-white text-md sm:text-lg hover:text-yellow-400 transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-yellow-400"
            >
              Estudios
            </a>
          </li>
          <li>
            <a
              href="#exp-desarrollando"
              className="text-white text-md sm:text-lg hover:text-yellow-400 transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-yellow-400"
            >
              Exp. desarrollando
            </a>
          </li>
          <li>
            <a
              href="#exp-arquitectura"
              className="text-white text-md sm:text-lg hover:text-yellow-400 transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-yellow-400"
            >
              Exp. Arquitectura
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
