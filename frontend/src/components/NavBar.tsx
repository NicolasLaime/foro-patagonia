import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

const NavBar: React.FC = () => {
  const { isAuthenticated, logout, role } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    if (confirm('¿Seguro que querés cerrar sesión?')) logout()
  }

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          
          <div className="flex text-2xl text-black">
            <Link to="/" className="flex items-center">
              <p className="text-violet-600 font-semibold">Patagonia</p>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <Link
              to="/nosotros"
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition hover:bg-gray-100 hover:text-violet-600"
            >
              Nosotros
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition hover:bg-gray-100 hover:text-violet-600"
              >
                Dashboard
              </Link>
            )}
          </div>

          
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-500">Rol: {role?.replace('ROLE_', '')}</span>
                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center rounded-xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-violet-500"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
             
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

       
        {menuOpen && (
          <div className="mt-4 flex flex-col gap-3 md:hidden">
            <Link
              to="/nosotros"
              className="text-sm text-gray-700 hover:text-violet-600"
              onClick={() => setMenuOpen(false)}
            >
              Nosotros
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-sm text-gray-700 hover:text-violet-600"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
                className="text-sm text-gray-700 hover:text-red-600 text-left"
              >
                Cerrar sesión
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-700 hover:text-violet-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="text-sm text-gray-700 hover:text-violet-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default NavBar
