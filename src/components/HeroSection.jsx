import React from 'react';

function HeroSection() {
    return(
        <section className="min-h-screen flex flex-col justify-center items-center text-center p-5 bgradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-bold md-4">Rodrigo Silva</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8">Desarrollador fullstack</p>
        </section>
    )
}

export default HeroSection;