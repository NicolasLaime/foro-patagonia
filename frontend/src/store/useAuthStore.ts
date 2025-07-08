import { create, type StateCreator } from "zustand";
import { toast } from "react-toastify";

export type Role = "ROLE_ADMIN" | "ROLE_USER" | null;

interface AuthState {
  token: string | null;
  role: Role;
  userId: number | null;
  isAuthenticated: boolean;
  loginAuth: (token: string, role: Role, userId: number) => void;
  logout: () => void;
}

const authStore: StateCreator<AuthState> = (set) => ({
  token: localStorage.getItem("token"),
  role: (() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole === "ROLE_ADMIN" || storedRole === "ROLE_USER") return storedRole;
    return null;
  })(),

   userId: (() => {
    const storedId = localStorage.getItem("userId");
    if (!storedId) return null;
    const num = Number(storedId);
    return isNaN(num) ? null : num; 
  })(),

  isAuthenticated: !!localStorage.getItem("token"),

  loginAuth: (token, role, userId) => {
    localStorage.setItem("token", token);
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");

    localStorage.setItem("userId", String(userId));

    set({
      token,
      role,
      userId,
      isAuthenticated: true,
    });

    toast.success("Inicio de sesión exitoso");
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    set({
      token: null,
      role: null,
      userId: null,
      isAuthenticated: false,
    });

    toast.info("Sesión cerrada");
  },
});

const useAuthStore = create<AuthState>(authStore);

export default useAuthStore;
