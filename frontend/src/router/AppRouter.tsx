import { Routes, Route } from "react-router-dom"
import Register from "../pages/auth/Register"
import Home from "../pages/Home"
import Login from "../pages/auth/Login"


const AppRouter = () => {
  return (
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default AppRouter