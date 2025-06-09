import React from 'react'
import { Link } from 'react-router-dom'

const NavBar:React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
  <nav className="max-w-6xl mx-auto flex justify-between items-center p-4 text-white">
    <Link to={"/"} className="text-2xl font-bold">Foro</Link>
    <ul className="flex space-x-6">
      <li><Link to="/login" className="hover:text-blue-300 transition">Iniciar sesión</Link></li>
      <li><Link to="/register" className="hover:text-blue-300 transition">Registrarse</Link></li>
      <li><Link to="/nosotros" className="hover:text-blue-300 transition">Nosotros</Link></li>
    </ul>
  </nav>
</header>
  )
}

export default NavBar