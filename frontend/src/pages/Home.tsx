import React, { useEffect, useState } from "react";
import VideoBanner from "../components/VideoBanner";
import usePostStore from "../store/UsePostStore";
import useCategoryStore from "../store/UseCategoryStore";
import PostCard from "../components/PostCard";

const Home: React.FC = () => {
  const { fetchPosts, posts, loading: loadingPosts, error } = usePostStore();
  const { fetchCategorias, categorias } = useCategoryStore();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
    fetchCategorias();
  }, []);

  
  const postsFiltrados = categoriaSeleccionada
    ? posts.filter((post) => post.categoryId === categoriaSeleccionada)
    : posts;

  return (
    <div>
      <VideoBanner />

      
      <section className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
        <div className="flex flex-col justify-center items-center space-y-10">
          <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-black">
            Temas de Interés
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 w-full">
           
            <div
              className={`relative group flex justify-center items-center cursor-pointer border p-4 ${
                categoriaSeleccionada === null ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setCategoriaSeleccionada(null)}
              style={{ height: "250px" }}
            >
              <span className="text-xl font-semibol">Todas las categorías</span>
            </div>

            
            {categorias.map((cat) => (
              <div
                key={cat.id}
                className={`relative group flex justify-center items-center cursor-pointer border overflow-hidden rounded-lg my-2 ${
                  categoriaSeleccionada === cat.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setCategoriaSeleccionada(cat.id)}
                style={{ height: "250px" }}
              >
                <img
                  src={cat.imageUrl}
                  alt={`Imagen representativa de ${cat.name.trim()}`}
                  className="object-center object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
                />
                <button className="absolute bottom-4 z-10 bg-white text-gray-800 py-2 px-6 font-medium rounded">
                  {cat.name}
                </button>
                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-full bg-white bg-opacity-50"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6">Publicaciones recientes</h2>

        {loadingPosts && <p className="text-gray-500">Cargando publicaciones...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loadingPosts && postsFiltrados.length === 0 && (
          <p className="text-gray-500">No hay publicaciones en esta categoría.</p>
        )}

        {!loadingPosts && postsFiltrados.length > 0 && (
          <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start">
            {postsFiltrados.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                idea={post.idea}
                author={post.author}
                date={post.date}
                imageUrl={post.imageUrl}
                category={
                  categorias.find((c) => c.id === post.categoryId)?.name || ""
                }
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default Home;
