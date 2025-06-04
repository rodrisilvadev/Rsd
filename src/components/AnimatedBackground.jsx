// src/components/AnimatedBackground.jsx
import React, { useRef, useEffect } from 'react';

function AnimatedBackground({ isHeroViewActive, applyBlur }) {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const pointsArrayRef = useRef([]);
  const mousePositionRef = useRef({ x: undefined, y: undefined });

  const isHeroViewActiveRef = useRef(isHeroViewActive);
  useEffect(() => {
    isHeroViewActiveRef.current = isHeroViewActive;
  }, [isHeroViewActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- 1. Cantidad de Puntos Responsiva ---
    let numPoints; // Lo definimos como 'let' para poder cambiarlo

    const pointConnectionRadius = 120; 
    const mouseConnectionRadius = 180;

    function setResponsiveNumPoints(currentWidth) {
      if (currentWidth < 600) { // Móviles pequeños
        numPoints = 40;
      } else if (currentWidth < 900) { // Tablets / Móviles grandes
        numPoints = 70;
      } else { // Escritorio
        numPoints = 100; // Tu valor original, o puedes aumentarlo más
      }
    }

    function createPoint(currentWidth, currentHeight) {
      return {
        x: Math.random() * currentWidth,
        y: Math.random() * currentHeight,
        radius: Math.random() * 2 + 0.8, // Radios ligeramente ajustados: 0.8px a 2.8px
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})` // Opacidad 0.3 a 0.8
      };
    }

    function initPoints(currentWidth, currentHeight) {
      setResponsiveNumPoints(currentWidth); // Establecer numPoints antes de crear los puntos
      pointsArrayRef.current = [];
      for (let i = 0; i < numPoints; i++) {
        pointsArrayRef.current.push(createPoint(currentWidth, currentHeight));
      }
    }

    function drawPoints() {
      pointsArrayRef.current.forEach(point => {
        // --- 3. Aureola en los Puntos ---
        ctx.shadowBlur = 10; // Intensidad del desenfoque de la sombra (aureola)
        ctx.shadowColor = point.color; // Color de la aureola (igual al del punto, o puedes usar 'rgba(255,255,255,0.5)' para una blanca)
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();

        // Resetear sombra para que no afecte otros dibujos (importante si dibujas más cosas)
        ctx.shadowBlur = 0; 
      });
    }

    function updatePoints() {
      pointsArrayRef.current.forEach(point => {
        point.x += point.dx;
        point.y += point.dy;
        if (point.x + point.radius > canvas.width || point.x - point.radius < 0) point.dx *= -1;
        if (point.y + point.radius > canvas.height || point.y - point.radius < 0) point.dy *= -1;
      });
    }

    function connectNearbyPoints() {
      const points = pointsArrayRef.current;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const p1 = points[i];
          const p2 = points[j];
          const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
          if (distance < pointConnectionRadius) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // --- 2. Líneas Menos Transparentes (Malla) ---
            // Aumentamos el multiplicador de opacidad (antes 0.3, ahora 0.5)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 * (1 - distance / pointConnectionRadius)})`; 
            ctx.lineWidth = 0.25; // Ligeramente más gruesas si quieres
            ctx.stroke();
          }
        }
      }
    }

    function drawLinesToMouse() {
      if (!isHeroViewActiveRef.current || mousePositionRef.current.x === undefined) return;
      pointsArrayRef.current.forEach(point => {
        const distance = Math.sqrt(Math.pow(point.x - mousePositionRef.current.x, 2) + Math.pow(point.y - mousePositionRef.current.y, 2));
        if (distance < mouseConnectionRadius) {
          ctx.beginPath();
          ctx.moveTo(mousePositionRef.current.x, mousePositionRef.current.y);
          ctx.lineTo(point.x, point.y);
          // --- 2. Líneas Menos Transparentes (Ratón) ---
          // Aumentamos el multiplicador de opacidad (antes 0.4, ahora 0.6)
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.7 * (1 - distance / mouseConnectionRadius)})`; 
          ctx.lineWidth = 0.35; // Ligeramente más gruesas
          ctx.stroke();
        }
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updatePoints();
      drawPoints();
      connectNearbyPoints();
      drawLinesToMouse();
      animationFrameIdRef.current = requestAnimationFrame(animate);
    }

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initPoints(canvas.width, canvas.height); // initPoints ahora usará el numPoints responsivo
    };

    const handleMouseMove = (event) => {
      if (!isHeroViewActiveRef.current || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current.x = event.clientX - rect.left;
      mousePositionRef.current.y = event.clientY - rect.top;
    };

    const handleCanvasMouseOut = () => {
      mousePositionRef.current.x = undefined;
      mousePositionRef.current.y = undefined;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseout', handleCanvasMouseOut);
    window.addEventListener('resize', resizeCanvas);
    
    resizeCanvas(); 
    animate();      

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseout', handleCanvasMouseOut);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []); 

  const canvasClassName = `absolute top-0 left-0 w-full h-full z-0 transition-all duration-300 ease-in-out ${applyBlur ? 'filter blur-sm' : ''}`;

  return (
    <canvas
      ref={canvasRef}
      className={canvasClassName}
    />
  );
}

export default AnimatedBackground;