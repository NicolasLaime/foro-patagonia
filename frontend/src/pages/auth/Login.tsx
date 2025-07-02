import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import type { LoginRequest, LoginResponse } from "../../services/AuthInterface";
import loginImagen from "../../assets/login.jpg";
import { jwtDecode } from "jwt-decode";
import {useForm} from 'react-hook-form'
import useAuthStore from "../../store/useAuthStore";

interface DecodedToken {
  role: "ROLE_ADMIN" | "ROLE_USER"
}



const Login = () => {
  
  const {register, handleSubmit , formState:{errors}} = useForm<LoginRequest>()
  
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const loginAuth = useAuthStore((state) => state.loginAuth);

  const onSubmit = async (data: LoginRequest) => {
    setError(null);
    try {
      const response: LoginResponse = await login(data);
      const decoded: DecodedToken = jwtDecode(response.token);
      loginAuth(response.token, decoded.role); // guardamos en zustand
      navigate("/");
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus datos.");
      console.error(error);
    }
  };

    

  return (
    <div className="h-screen md:flex">
     
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full max-w-md px-6 rounded-4xl my-10">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Iniciar Sesión</h1>
          <p className="text-sm font-normal text-gray-600 mb-4">Ingresa tus datos para continuar</p>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          {/* Email */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input
              className="pl-2 outline-none border-none w-full"
              type="email"
              placeholder="Correo electrónico"
              {...register("email", {required: "El corre es obligatorio"})}
            />
            {errors.email && <p className="text-red-400 mb-2">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input
              className="pl-2 outline-none border-none w-full"
              type="password"
              placeholder="Contraseña"
             {...register("password", { required: "La contraseña es obligatoria" })}
            />
            {errors.password && <p className="text-red-400 mb-2">{errors.password.message}</p>}
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
