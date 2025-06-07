// src/views/PortfolioPage.jsx
import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection.jsx";
import AboutSection from "../components/AboutSection.jsx";
import Navbar from "../components/Navbar.jsx";
// ... tus otras importaciones de secciones ...
import EstudiosSection from "../components/EstudiosSection.jsx";
import Desarrollando from "../components/Desarrollando.jsx";
import Arquitectura from "../components/Arquitectura.jsx";

function PortfolioPage() {
  const [scrollY, setScrollY] = useState(0); // Estado para guardar la posición del scroll
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [applyBlurToBackground, setApplyBlurToBackground] = useState(false);
  const [isMouseInteractionActive, setIsMouseInteractionActive] =
    useState(true);

  // Único useEffect para manejar todos los efectos basados en el scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY); // Actualiza el estado con la posición actual

      const viewportHeight = window.innerHeight;

      // Define los umbrales (puntos en el scroll donde cambian las cosas)
      const navbarShowThreshold = viewportHeight * 0.9; // Navbar aparece cuando el Hero casi ha desaparecido
      const blurStartThreshold = 100; // Blur aparece con un pequeño scroll
      const mouseInteractionStopThreshold = viewportHeight * 0.5; // El ratón se desactiva cuando el Hero ya no es la vista principal

      // Actualiza todos los estados basado en la posición del scroll
      setIsNavbarVisible(currentScrollY > navbarShowThreshold);
      setApplyBlurToBackground(currentScrollY > blurStartThreshold);
      setIsMouseInteractionActive(
        currentScrollY < mouseInteractionStopThreshold
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true }); // passive: true para mejor rendimiento

    // Limpieza
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Array vacío para que el listener se añada una sola vez

  const backgroundStyle = {
    backgroundColor: "#040317", // Tu color base oscuro de fallback
    backgroundImage: `
    radial-gradient(ellipse at 15% 25%, rgba(191, 131, 232, 0.25) -10%, transparent 40%),
    radial-gradient(ellipse at 80% 70%, rgba(30, 90, 140, 0.25) 0%, transparent 30%),
    linear-gradient(145deg, #0a0822 0%, #040317 50%, #110d2e 120%)
    `,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  };
  return (
    <div style={backgroundStyle}>
      {isNavbarVisible && <Navbar />}
      <HeroSection
        scrollY={scrollY} // <--- Pasamos la posición del scroll para el efecto parallax
        isMouseInteractive={isMouseInteractionActive}
        applyBlur={applyBlurToBackground}
      />
      <AboutSection />
      <EstudiosSection />
      <Desarrollando />
      <Arquitectura />
      {/* ... más contenido ... */}
      <div style={{ height: "50vh" }}></div>
    </div>
  );
}

export default PortfolioPage;
