import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import usePostStore from "../../store/UsePostStore";
import useCategoryStore from "../../store/UseCategoryStore";
import useAuthStore from "../../store/useAuthStore";

interface FormInputs {
  idea: string;
  author: string;
  imageUrl?: string;
  categoryId: number;
  content?: string;
}

const GestionarPost = () => {
  const {
    posts,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    loading,
    error,
  } = usePostStore();

  const { userId } = useAuthStore();
  const { categorias, fetchCategorias } = useCategoryStore();
  const [editId, setEditId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    fetchPosts();
    fetchCategorias();
  }, []);

  // Filtrar posts para mostrar solo los del usuario actual
  const misPosts = posts.filter(post => post.userId === userId);

  const onSubmit = async (data: FormInputs) => {
    const dataWithUser = { ...data, userId };
    try {
      if (editId) {
        await updatePost(editId, dataWithUser);
        setEditId(null);
      } else {
        await createPost(dataWithUser);
      }
      reset();
      fetchPosts(); 
    } catch (err) {
      console.log(err, "error")
    }
  };

  const handleEdit = (postId: number) => {
    const post = posts.find((p) => p.id === postId);
    if (post && post.userId === userId) {
      setValue("idea", post.idea);
      setValue("author", post.author);
      setValue("imageUrl", post.imageUrl || "");
      setValue("categoryId", post.categoryId);
      setValue("content", post.content || "");
      setEditId(post.id);
    }
  };

  const handleDelete = async (postId: number) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    if (post.userId !== userId) {
      alert("No tienes permiso para eliminar este post");
      return;
    }

    if (window.confirm("¿Seguro quieres eliminar este post?")) {
      await deletePost(postId);
      fetchPosts();
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">
        {editId ? "Editar Post" : "Crear Post"}
      </h2>

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg text-white"
      >
        <input
          {...register("idea", { required: "La idea es obligatoria" })}
          placeholder="Idea"
          className="w-full p-3 rounded bg-gray-700 text-white"
        />
        {errors.idea && (
          <p className="text-red-400 text-sm">{errors.idea.message}</p>
        )}

        <input
          {...register("author", { required: "El autor es obligatorio" })}
          placeholder="Autor"
          className="w-full p-3 rounded bg-gray-700 text-white"
        
        />
        {errors.author && (
          <p className="text-red-400 text-sm">{errors.author.message}</p>
        )}

        <input
          {...register("imageUrl")}
          placeholder="URL de imagen (opcional)"
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <select
          {...register("categoryId", {
            required: "La categoría es obligatoria",
          })}
          className="w-full p-3 rounded bg-white text-black"
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-400 text-sm">{errors.categoryId.message}</p>
        )}

        <textarea
          {...register("content")}
          placeholder="Contenido del post"
          className="w-full p-3 rounded bg-gray-700 text-white h-32"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white w-full sm:w-auto"
        >
          {editId ? "Actualizar" : "Crear"} Post
        </button>
      </form>

      {/* MENSAJES */}
      {loading && <p className="text-yellow-300 mt-4">Cargando...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* LISTADO DE POSTS filtrados */}
      {misPosts.length === 0 ? (
        <p className="text-center text-white mt-4">No creaste ningún post</p>
      ) : (
        <ul className="space-y-4 mt-6">
          {misPosts.map((post) => (
            <li
              key={post.id}
              className="p-4 bg-gray-700 text-white rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold">{post.idea}</h3>
              <p className="text-sm">Autor: {post.author}</p>
              <p className="text-sm">Categoría ID: {post.categoryId}</p>
              <p className="text-sm text-gray-400">
                Fecha: {new Date(post.date).toLocaleString()}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded text-white"
                  onClick={() => handleEdit(post.id)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-white"
                  onClick={() => handleDelete(post.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GestionarPost;
