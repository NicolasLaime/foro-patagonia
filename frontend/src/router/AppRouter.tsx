import { Routes, Route } from "react-router-dom"
import Register from "../pages/auth/Register"
import Home from "../pages/Home"
import Login from "../pages/auth/Login"
import PrivateRoute from "./PrivateRoute"
import Dashboard from "../pages/Dashboard"
import PostDetails from "../pages/PostDetails"
import Nosotros from "../pages/Nosotros"


const AppRouter = () => {
  return (
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/post/:id" element={<PostDetails/>}/>
      <Route path="/nosotros" element={<Nosotros/>} />

      {/* Ruta Protegida */}

      <Route path="/dashboard/*" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>


    </Routes>
  )
}

export default AppRouter