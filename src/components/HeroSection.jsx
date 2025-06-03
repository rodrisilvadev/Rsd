// src/components/HeroSection.jsx
import React from 'react';

function HeroSection() {
    return(
        <section 
        id='hero'
        className="min-h-screen relative  text-white" 
        style={{background: '#202020'}}> 

       
            <div className="min-h-screen flex flex-col justify-center items-center p-8 relative z-10">
        
                {/* Contenedor para el layout de foto Y texto */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-5xl">

                    {/*Columna izquierda con la imagen*/}
                    <div className='flex-shrink-0'>
                        <img 
                        src="/user.webp"
                        alt="Rodrigo Silva Díaz"
                        className='w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-white shadow-2xl'
                        />
                    </div>

                    {/*Columna derecha con los textos*/}
                    <div className='text-center md:text-left'> 
                        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-2'> 
                            Rodrigo Silva Díaz
                        </h1>
                        <p className='text-2xl sm:text-3xl md:text-4xl text-gray-300 mb-4'>
                            Full Stack Developer
                        </p>
                        <p className='text-lg sm:text-xl md:text-2xl text-gray-400'>
                            Bienvenido a mi porfolio.
                        </p>
                    </div>
                    
                </div> 
            </div>

            {/*Enlace de ingresar al contenido */}
            <a 
            href="#about" 
            className='absolute bottom-20 text-lg cursor-pointer z-20 animate-pulse md:right-32 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 font-bold '>
                INGRESAR {/* Añadí la flecha que tenías en la sugerencia anterior */}
            </a>
        </section>
    )
}

export default HeroSection;