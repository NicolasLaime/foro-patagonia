import { useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import SideBar from "../components/SideBar";
import GestionarCategorias from "../components/admin/GestionarCategorias";
import GestionDeUsuarios from "../components/admin/GestionDeUsuarios";
import GestiondePost from "../components/admin/GestiondePost";
import GestionarPost from "../components/user/GestionarPost";
import RoleRoute from "../router/RoleRoute";

const Dashboard = () => {
  const role = useAuthStore((state) => state.role);
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      if (role === "ROLE_ADMIN") {
        navigate("/dashboard/categorias");
      } else if (role === "ROLE_USER") {
        navigate("/dashboard/gestionar-post");
      }
    }
  }, [location.pathname, role, navigate]);

  if (!role) return null;

  return (
    <div className="flex">
      <SideBar role={role} />

      <main className="flex-1 p-8 bg-blue-400 min-h-screen my-10">
        <Routes>
          {/* RUTAS ADMIN */}
          <Route
            path="categorias"
            element={
              <RoleRoute rolesPermitidos={["ROLE_ADMIN"]}>
                <GestionarCategorias />
              </RoleRoute>
            }
          />
          <Route
            path="usuarios"
            element={
              <RoleRoute rolesPermitidos={["ROLE_ADMIN"]}>
                <GestionDeUsuarios />
              </RoleRoute>
            }
          />
          <Route
            path="posts"
            element={
              <RoleRoute rolesPermitidos={["ROLE_ADMIN"]}>
                <GestiondePost />
              </RoleRoute>
            }
          />

          {/* RUTAS USER */}
          <Route
            path="gestionar-post"
            element={
              <RoleRoute rolesPermitidos={["ROLE_USER"]}>
                <GestionarPost />
              </RoleRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
