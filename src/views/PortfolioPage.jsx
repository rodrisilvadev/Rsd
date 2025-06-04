// src/views/PortfolioPage.jsx
import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection.jsx";
import AboutSection from "../components/AboutSection.jsx";
import Navbar from "../components/Navbar.jsx";

// Comenta o elimina estas por ahora si aún no las has creado
// import EstudiosSection from '../components/EstudiosSection.jsx';
// import ExpDesarrollandoSection from '../components/ExpDesarrollandoSection.jsx';
// import ExpArquitecturaSection from '../components/ExpArquitecturaSection.jsx';

function PortfolioPage() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(true); // Inicia con el scroll bloqueado

  // Efecto para bloquear/desbloquear el scroll del body
  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Función de limpieza para asegurar que el scroll se restaure si el componente se desmonta
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isScrollLocked]); // Este efecto se ejecuta cada vez que 'isScrollLocked' cambia

  // Efecto para manejar la visibilidad del Navbar basado en el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrollLocked && window.scrollY > window.innerHeight * 0.7) {
        setIsNavbarVisible(true);
      } else {
        setIsNavbarVisible(false);
      }
    };

    if (!isScrollLocked) {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    } else {
      setIsNavbarVisible(false);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollLocked]);

  const handleIngresarClick = () => {
    setIsScrollLocked(false);
  };

  return (
    <div>
      {isNavbarVisible && <Navbar />}
      <HeroSection onIngresarClick={handleIngresarClick} />
      <AboutSection />
      <div
        id="estudios"
        style={{ height: "100vh", background: "#333", paddingTop: "80px" }}
      >
        <p className="text-white p-8 text-center">
          Sección Estudios (placeholder)
        </p>
      </div>
      <div
        id="exp-desarrollando"
        style={{ height: "100vh", background: "#444", paddingTop: "80px" }}
      >
        <p className="text-white p-8 text-center">
          Sección Exp. Desarrollando (placeholder)
        </p>
      </div>
      <div
        id="exp-arquitectura"
        style={{ height: "100vh", background: "#555", paddingTop: "80px" }}
      >
        <p className="text-white p-8 text-center">
          Sección Exp. Arquitectura (placeholder)
        </p>
      </div>
    </div>
  );
}

export default PortfolioPage;
