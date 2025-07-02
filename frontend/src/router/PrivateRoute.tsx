import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"
import useAuthStore from "../store/useAuthStore"

interface PrivateRouteProps{
    children:ReactNode
}


const PrivateRoute = ({children}:PrivateRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? (
    <>
     {children}
    </> 
  ) : ( <Navigate to="/login" replace/>)
}

export default PrivateRoute