import { NavLink } from "react-router-dom";

interface Props {
  role: string;
}

const SideBar = ({ role }: Props) => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive ? "underline font-bold" : "hover:underline cursor-pointer";

  return (
    <aside className="p-4 bg-gray-800 text-white w-64 min-h-screen my-10">
      <h2 className="text-lg font-semibold mb-4 my-2">Menú</h2>
      <ul className="space-y-2">
        {role === "ROLE_ADMIN" && (
          <>
            <li>
              <NavLink to="/dashboard/categorias" className={linkClasses}>
                Gestionar Categorías
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/usuarios" className={linkClasses}>
                Gestionar Usuarios
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/posts" className={linkClasses}>
                Gestionar Posts
              </NavLink>
            </li>
          </>
        )}

        {role === "ROLE_USER" && (
          <>
            <li>
              <NavLink to="/dashboard/gestionar-post" className={linkClasses}>
                Gestionar Mis Posts
              </NavLink>
            </li>
            
          </>
        )}
      </ul>
    </aside>
  );
};

export default SideBar;
