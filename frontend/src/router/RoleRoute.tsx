import type { ReactNode } from "react";
import useAuthStore from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

interface RoleRouteProps{
    rolesPermitidos: string[]
    children:ReactNode;
}


const RoleRoute = ({rolesPermitidos, children}:RoleRouteProps) => {

    const {role,isAuthenticated} = useAuthStore()

    if(!isAuthenticated) return <Navigate to="/login" replace/>

    if(!rolesPermitidos.includes(role ?? "")) return <Navigate to="/dashboard" replace/>

    return <>{children}</>
}

export default RoleRoute
