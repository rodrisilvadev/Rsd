// src/views/PortfolioPage.jsx
import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import Navbar from '../components/Navbar.jsx';
// ... tus otras importaciones de secciones ...

function PortfolioPage() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const [applyBlurToBackground, setApplyBlurToBackground] = useState(false); // <--- NUEVO ESTADO PARA EL BLUR

  // Efecto para bloquear/desbloquear el scroll del body
  useEffect(() => {
    document.body.style.overflow = isScrollLocked ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isScrollLocked]);

  // Efecto para manejar la visibilidad del Navbar Y EL BLUR DEL FONDO
  useEffect(() => {
    const handleScroll = () => {
      const showNavbarThreshold = window.innerHeight * 0.7; // Umbral para mostrar Navbar
      // El blur se activa un poco antes o al mismo tiempo que el navbar, pero solo si el scroll no está bloqueado
      const showBlurThreshold = window.innerHeight * 0.1; // Aparece blur con un pequeño scroll

      if (!isScrollLocked) {
        if (window.scrollY > showNavbarThreshold) {
          setIsNavbarVisible(true);
        } else {
          setIsNavbarVisible(false);
        }
        // Control del blur
        if (window.scrollY > showBlurThreshold) {
          setApplyBlurToBackground(true);
        } else {
          // Si volvemos arriba del todo (o casi), quitamos el blur
          setApplyBlurToBackground(false); 
        }
      } else {
        // Si el scroll está bloqueado (vista Hero inicial), no hay navbar ni blur
        setIsNavbarVisible(false);
        setApplyBlurToBackground(false);
      }
    };

    if (!isScrollLocked) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Chequeo inicial si ya está scrolleado y desbloqueado
    } else {
      // Asegurarse de que estén desactivados si se vuelve a bloquear el scroll (si implementáramos esa lógica)
      setIsNavbarVisible(false);
      setApplyBlurToBackground(false);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrollLocked]); // Este efecto depende crucialmente de isScrollLocked

  const handleIngresarClick = () => {
    setIsScrollLocked(false);
    // El scroll a #about lo maneja el href del enlace
  };

  return (
    <div>
      {isNavbarVisible && <Navbar />}
      <HeroSection
        onIngresarClick={handleIngresarClick}
        isHeroViewActive={isScrollLocked} // Para la interactividad del ratón en el canvas
        applyBlur={applyBlurToBackground} // <--- NUEVA PROP PARA EL BLUR
      />
      <AboutSection />
      {/* ... tus otras secciones con sus IDs ... */}
      <div id="estudios" style={{ height: '100vh', background: '#333', paddingTop: '80px' }}><p className="text-white p-8 text-center">Sección Estudios (placeholder)</p></div>
      <div id="exp-desarrollando" style={{ height: '100vh', background: '#444', paddingTop: '80px' }}><p className="text-white p-8 text-center">Sección Exp. Desarrollando (placeholder)</p></div>
      <div id="exp-arquitectura" style={{ height: '100vh', background: '#555', paddingTop: '80px' }}><p className="text-white p-8 text-center">Sección Exp. Arquitectura (placeholder)</p></div>
    </div>
  );
}

export default PortfolioPage;