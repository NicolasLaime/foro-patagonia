import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import backendUrl from "../api/BackendUrl";


export interface Category{
    id:number
    name:string
    description?:string;
    postCount?:number;
    imageUrl?:string;

}


interface CategoryStore{
    categorias:Category[];
    loading:boolean;
    fetchCategorias: () => Promise<void>;
    crearCategoria: (name:string, description:string, imageUrl:string) => Promise<void>;
    eliminarCategoria:(id:number) => Promise<void>;
    actualizarCategoria: (id: number, name: string, description: string, imageUrl: string) => Promise<void>;
}


const useCategoryStore = create<CategoryStore>((set, get) => ({
   categorias: [],
  loading: false,

  fetchCategorias: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${backendUrl}/categories`);
      set({ categorias: res.data });
    } catch (err) {
      console.error("Error al traer categorías", err);
    } finally {
      set({ loading: false });
    }
  },

 crearCategoria: async (name, description, imageUrl) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${backendUrl}/categories`,
        { name, description, imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Categoría creada con éxito");
      await get().fetchCategorias();
    } catch (err) {
      toast.error("Error al crear la categoría");
      console.error(err);
    }
  },


  eliminarCategoria: async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${backendUrl}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Categoría eliminada");
      await get().fetchCategorias();
    } catch (err) {
      toast.error("Error al eliminar la categoría");
      console.error(err);
    }
  },

  actualizarCategoria: async (id, name, description, imageUrl) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${backendUrl}/categories/${id}`,
        { name, description, imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Categoría actualizada");
      await get().fetchCategorias();
    } catch (err) {
      toast.error("Error al actualizar la categoría");
      console.error(err);
    }
  },
 }))


export default useCategoryStore