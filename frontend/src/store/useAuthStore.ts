import { create, type StateCreator } from "zustand";
import { toast } from "react-toastify";



export type Role = "ROLE_ADMIN" | "ROLE_USER" | null;

interface AuthState{
    token:string | null;
    role:Role;
    isAuthenticated:boolean;
    loginAuth:(token:string, role:Role) => void
    logout:() => void;
}


const authStore:StateCreator<AuthState> = ((set) => ({
  token: localStorage.getItem("token"),
  role: (() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole === "ROLE_ADMIN" || storedRole === "ROLE_USER") return storedRole;
    return null;
  })(),
  isAuthenticated: !!localStorage.getItem("token"),

  loginAuth: (token, role) => {
    localStorage.setItem("token", token);
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");

    set({
      token,
      role,
      isAuthenticated: true,
    });

    toast.success("Inicio de sesión exitoso");
  },


  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    set({
      token: null,
      role: null,
      isAuthenticated: false,
    });

    toast.info("Sesión cerrada");
  },
}));


const useAuthStore = create<AuthState>(authStore);

export default useAuthStore;
