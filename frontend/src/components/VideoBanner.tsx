import React from 'react';
import calafate from "../assets/calafate.jpg";

const VideoBanner: React.FC = () => {
  return (
   <div className="relative flex flex-col items-center mx-auto lg:flex-row-reverse lg:max-w-5xl lg:mt-12 xl:max-w-6xl">
      {/* Imagen */}
      <div className="w-full h-64 lg:w-1/2 lg:h-auto my-10">
        <img
          src={calafate}
          alt="Imagen de la Patagonia"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Texto */}
      <div className="max-w-lg bg-white md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12">
        <div className="flex flex-col p-8 md:px-12">
          <h2 className="text-2xl font-bold uppercase text-indigo-800 lg:text-4xl">
            Foro de la Patagonia
          </h2>
          <p className="mt-4 text-gray-700 text-sm md:text-base">
            Compartí ideas, historias y experiencias sobre el sur argentino. Un espacio para conectar con la comunidad patagónica.
          </p>

          <div className="mt-8">
            <h1
              className="inline-block w-full text-center text-base font-medium text-white bg-indigo-600 border-2 border-indigo-600 py-3 px-6 hover:bg-indigo-700 hover:shadow-md md:w-48 transition duration-300"
            >
              Explora!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
