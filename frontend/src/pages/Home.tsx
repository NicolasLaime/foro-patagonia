import React from "react";
import VideoBanner from "../components/VideoBanner";


const Home: React.FC = () => {
  return (
    <div>
      <VideoBanner />
      <main className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Publicaciones recientes</h2>
        {/* Aquí irán los posts */}
        <p className="text-gray-500">Todavía no hay publicaciones...</p>
      </main>
    </div>
  );
};

export default Home;