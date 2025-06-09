import React from 'react';
import calafate from "../assets/calafate.jpg";

const VideoBanner: React.FC = () => {
  return (
    <div className="relative w-full aspect-video overflow-hidden">
      <img
        src={calafate}
        alt="Banner de la Patagonia"
        className="w-full h-full object-cover brightness-50"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg text-center px-4">
          Bienvenido al Foro de la Patagonia
        </h1>
      </div>
    </div>
  );
};

export default VideoBanner;
