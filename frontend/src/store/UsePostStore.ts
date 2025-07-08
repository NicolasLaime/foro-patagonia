import axios from "axios"
import { create } from "zustand"
import backendUrl from "../api/BackendUrl"
import { toast } from "react-toastify";


interface PostCreateDto{
    idea:string
    author: string
    imageUrl?: string
    categoryId: number
    content?: string;
}

interface PostResponseDTO {
  id: number
  idea: string
  date: string 
  author: string
  categoryId: number
  imageUrl?: string
  content?: string;
  userId:number

}


interface PostState{
    posts: PostResponseDTO[]
    loading:boolean
    error: string | null

    fetchPosts: () => Promise<void>
    createPost:(nuevoPost:PostCreateDto) => Promise<void>
    updatePost:(id:number, datosActualizados:PostCreateDto) => Promise<void>
    deletePost:(id:number) => Promise<void>

}

const API = `${backendUrl}/posts`;


const usePostStore = create<PostState>((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    try {
      set({ loading: true, error: null })
      const token = localStorage.getItem("token");
      const res = await axios.get<PostResponseDTO[]>(API,{
         headers: {
        Authorization: `Bearer ${token}`,
      },
      })
      set({ posts: res.data, loading: false })
    } catch (err) {
      set({ error: 'Error al obtener los posts', loading: false })
            console.log(err)
    }
  },

 createPost: async (nuevoPost) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");
      const res = await axios.post<PostResponseDTO>(API, nuevoPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        posts: [...state.posts, res.data],
        loading: false,
      }));
      toast.success("Post creado");
    } catch (err) {
      set({ error: "Error al crear el post", loading: false });
      toast.error("Error al crear el post");
      console.error(err);
    }
  },

  updatePost: async (id, datosActualizados) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");
      const res = await axios.put<PostResponseDTO>(
        `${API}/${id}`,
        datosActualizados,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        posts: state.posts.map((p) => (p.id === id ? res.data : p)),
        loading: false,
      }));
      toast.success("Post actualizado");
    } catch (err) {
      set({ error: "Error al actualizar el post", loading: false });
      toast.error("Error al actualizar el post");
      console.error(err);
    }
  },

  deletePost: async (id) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== id),
        loading: false,
      }));
      toast.success("Post eliminado");
    } catch (err) {
      set({ error: "Error al eliminar el post", loading: false });
      toast.error("Error al eliminar el post");
      console.error(err);
    }
  },
}))


export default usePostStore;