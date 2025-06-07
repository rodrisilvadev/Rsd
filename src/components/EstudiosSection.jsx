// src/components/EstudiosSection.jsx
import React from "react";

function EstudiosSection() {
  return (
    <section id="estudios" className="py-16 md:py-2 text-white">
      {" "}
      {/* Fondo ligeramente diferente para alternar */}
      <div className="container mx-auto px-6 md:px-12 lg:px-8 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Estudios
        </h2>
        <div className="text-lg md:text-xl text-center">
          <p>Aquí detallaré mi formación académica y cursos relevantes.</p>
          <p>(Contenido de Estudios en construcción...)</p>
        </div>
      </div>
    </section>
  );
}

export default EstudiosSection;
