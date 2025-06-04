// src/components/AboutSection.jsx
import React from "react";

function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white text-gray-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-8 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Acerca de Mí
        </h2>

        <div className="space-y-6 text-lg md:text-xl leading-relaxed">
          <p>
            ¡Hola! Soy Rodrigo, un apasionado desarrollador Full Stack con un
            gran interés en crear soluciones web intuitivas, eficientes y
            visualmente atractivas. Mi viaje en el mundo de la programación
            comenzó con [cuenta brevemente cómo empezaste o qué te atrajo], y
            desde entonces, he estado en una constante búsqueda de aprendizaje y
            crecimiento.
          </p>
          <p>
            Disfruto trabajando tanto en el frontend como en el backend,
            utilizando tecnologías modernas para dar vida a las ideas. Me
            entusiasma resolver problemas complejos y colaborar en proyectos que
            tengan un impacto positivo.
          </p>
          <p>
            Cuando no estoy programando, me encontrarás [menciona algún hobby o
            interés personal]. Siempre estoy abierto a nuevas oportunidades y
            desafíos. ¡Conectemos!
          </p>
        </div>

        {/* Opcional: Podrías añadir un botón para descargar tu CV aquí más adelante */}
        {/* <div className="text-center mt-12">
          <a
            href="/ruta-a-tu-cv.pdf" // Reemplaza con la ruta a tu CV
            download
            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Descargar CV
          </a>
        </div> */}
      </div>
    </section>
  );
}

export default AboutSection;
