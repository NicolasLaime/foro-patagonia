import React, { useState } from "react";
import axios from "axios";
import { register } from "../../services/AuthService";
import type { RegisterRequest, RegisterResponse } from "../../services/AuthInterface";
import registerImagen from "../../assets/register.jpg"

const Register = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    email: "",
    password: "",
    role: "USER",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response: RegisterResponse = await register(formData);
      setSuccess(response.message);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Ocurrió un error inesperado.");
      }
    }
  };

  return (
    <div className="h-screen md:flex">
      {/* Lado izquierdo con fondo (sin overlay por ahora) */}
      <div
        className="relative w-1/2 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: `url(${registerImagen})` }}
      ></div>

      {/* Lado derecho con formulario */}
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-amber-100">
        <form onSubmit={handleSubmit} className="bg-white w-full max-w-md px-6 rounded-4xl">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Crear Cuenta</h1>
          <p className="text-sm font-normal text-gray-600 mb-4">Bienvenido/a</p>

          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-500 mb-2">{success}</p>}

          {/* Email */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9" />
            </svg>
            <input
              className="pl-2 outline-none border-none w-full"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none w-full"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Rol */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none w-full"
              type="text"
              name="role"
              placeholder="Rol (USER o ADMIN)"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
