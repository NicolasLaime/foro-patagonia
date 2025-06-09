import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import type { LoginRequest, LoginResponse } from "../../services/AuthInterface";
import axios from "axios";
import loginImagen from "../../assets/login.jpg";

const Login = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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

    try {
      const response: LoginResponse = await login(formData);
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error inesperado, intenta nuevamente.");
      }
    }
  };

  return (
    <div className="h-screen md:flex">
      {/* Lado izquierdo: formulario */}
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-amber-100">
        <form onSubmit={handleSubmit} className="bg-white w-full max-w-md px-6 rounded-4xl">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Iniciar Sesión</h1>
          <p className="text-sm font-normal text-gray-600 mb-4">Ingresa tus datos para continuar</p>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          {/* Email */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
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

          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Ingresar
          </button>
        </form>
      </div>

      {/* Lado derecho: imagen */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginImagen})` }}
      ></div>
    </div>
  );
};

export default Login;
