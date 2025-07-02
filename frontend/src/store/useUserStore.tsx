import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";

interface User{
    id:number;
    name:string;
    email:string;
    role:string;
}

interface Post{
  id:number;
  idea:string;
  content:string;
  author:string;
  categoryId: number;
  imageUrl?:string;
}

interface UserStore{
    users:User[];
    userPosts: Record<number,Post[]>

    fetchUsers:() => Promise<void>
    deleteUser: (id: number) => Promise<void>;

    fetchPostsByUserId:(userId:number) => Promise<void>;
    deletePostFromUser:(userId:number, postId:number) => Promise<void>

}


const useUserStore = create<UserStore>((set,get) => ({
    users:[],
    userPosts:{},

    fetchUsers: async () => {
        const token = localStorage.getItem("token")
        const res = await axios.get("http://localhost:8080/admin/users", {
            headers:{
                Authorization: `Bearer ${token}`
            },
        })
        set({users:res.data})
    },

    deleteUser: async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Usuario eliminado");
      await get().fetchUsers();
    } catch (err) {
      toast.error("Error al eliminar usuario");
      console.error(err);
    }
  },

  fetchPostsByUserId: async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:8080/admin/users/${userId}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        userPosts: { ...state.userPosts, [userId]: res.data },
      }));
    } catch (err) {
      toast.error("Error al cargar los posts del usuario");
      console.error(err);
    }
  },

  deletePostFromUser: async (userId, postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8080/admin/users/${userId}/posts/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Post eliminado del usuario");
      await get().fetchPostsByUserId(userId);
    } catch (err) {
      toast.error("Error al eliminar el post del usuario");
      console.error(err);
    }
  },
    
}))


export default useUserStore;