// src/components/AnimatedBackground.jsx
import React, { useRef, useEffect } from "react";

function AnimatedBackground({ isMouseInteractive, applyBlur }) {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const pointsArrayRef = useRef([]);
  const mousePositionRef = useRef({ x: undefined, y: undefined });
  const contextRef = useRef(null); // Ref para el contexto del canvas

  // Ref para el estado de isMouseInteractive, para acceso inmediato en el bucle
  const isMouseInteractiveRef = useRef(isMouseInteractive);
  useEffect(() => {
    isMouseInteractiveRef.current = isMouseInteractive;
  }, [isMouseInteractive]);

  // --- Lógica de la animación (movida fuera del useEffect principal) ---

  // El bucle de animación. Ahora es una función independiente en el componente.
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePoints();
    drawPoints();
    connectNearbyPoints();

    // La interactividad del ratón ahora se controla aquí, leyendo la ref actualizada
    if (isMouseInteractiveRef.current) {
      drawLinesToMouse();
    }

    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  const updatePoints = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    pointsArrayRef.current.forEach((point) => {
      point.x += point.dx;
      point.y += point.dy;
      if (point.x + point.radius > canvas.width || point.x - point.radius < 0)
        point.dx *= -1;
      if (point.y + point.radius > canvas.height || point.y - point.radius < 0)
        point.dy *= -1;
    });
  };

  const drawPoints = () => {
    const ctx = contextRef.current;
    if (!ctx) return;
    pointsArrayRef.current.forEach((point) => {
      ctx.shadowBlur = 10;
      ctx.shadowColor = point.color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      ctx.fillStyle = point.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  };

  const connectNearbyPoints = () => {
    const ctx = contextRef.current;
    if (!ctx) return;
    const connectionRadius = 120;
    const points = pointsArrayRef.current;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const p1 = points[i];
        const p2 = points[j];
        const distance = Math.sqrt(
          Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
        );
        if (distance < connectionRadius) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${
            0.5 * (1 - distance / connectionRadius)
          })`; // Opacidad aumentada
          ctx.lineWidth = 0.25;
          ctx.stroke();
        }
      }
    }
  };

  const drawLinesToMouse = () => {
    const ctx = contextRef.current;
    if (!ctx || mousePositionRef.current.x === undefined) return;
    const mouseConnectionRadius = 180;
    pointsArrayRef.current.forEach((point) => {
      const distance = Math.sqrt(
        Math.pow(point.x - mousePositionRef.current.x, 2) +
          Math.pow(point.y - mousePositionRef.current.y, 2)
      );
      if (distance < mouseConnectionRadius) {
        ctx.beginPath();
        ctx.moveTo(mousePositionRef.current.x, mousePositionRef.current.y);
        ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${
          0.7 * (1 - distance / mouseConnectionRadius)
        })`; // Opacidad aumentada
        ctx.lineWidth = 0.35;
        ctx.stroke();
      }
    });
  };

  // useEffect principal: solo para configuración inicial y limpieza
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    contextRef.current = canvas.getContext("2d"); // Guardamos el contexto en una ref
    if (!contextRef.current) return;

    let numPoints;

    function setResponsiveNumPoints(currentWidth) {
      if (currentWidth < 600) numPoints = 40;
      else if (currentWidth < 900) numPoints = 70;
      else numPoints = 100;
    }

    function createPoint(currentWidth, currentHeight) {
      return {
        x: Math.random() * currentWidth,
        y: Math.random() * currentHeight,
        radius: Math.random() * 2 + 0.8,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`,
      };
    }

    function initPoints(currentWidth, currentHeight) {
      setResponsiveNumPoints(currentWidth);
      pointsArrayRef.current = [];
      for (let i = 0; i < numPoints; i++) {
        pointsArrayRef.current.push(createPoint(currentWidth, currentHeight));
      }
    }

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initPoints(canvas.width, canvas.height);
    };

    const handleMouseMove = (event) => {
      if (!canvas) return;
      // La condición de si está activo o no se chequea en 'animate', aquí solo guardamos la posición
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current.x = event.clientX - rect.left;
      mousePositionRef.current.y = event.clientY - rect.top;
    };

    const handleCanvasMouseOut = () => {
      mousePositionRef.current.x = undefined;
      mousePositionRef.current.y = undefined;
    };

    // Añadir listeners
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseout", handleCanvasMouseOut);
    window.addEventListener("resize", resizeCanvas);

    resizeCanvas(); // Configuración inicial
    animationFrameIdRef.current = requestAnimationFrame(animate); // Iniciar animación

    // Limpieza
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseout", handleCanvasMouseOut);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []); // Array de dependencias vacío, se ejecuta una sola vez.

  // Clases condicionales para el efecto de blur
  const canvasClassName = `absolute top-0 left-0 w-full h-full z-0 transition-all duration-300 ease-in-out ${
    applyBlur ? "filter blur-sm" : ""
  }`;

  return <canvas ref={canvasRef} className={canvasClassName} />;
}

export default AnimatedBackground;
