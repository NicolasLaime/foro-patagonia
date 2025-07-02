import React from 'react'

const Footer = () => {
  return (
     <div className="bg-gray-100 mt-10">
      <div className="max-w-screen-lg py-10 px-4 sm:px-6 text-gray-800 sm:flex justify-between mx-auto">
        <div className="p-5 sm:w-2/12 border-r">
          <div className="text-sm uppercase text-indigo-600 font-bold">Menú</div>
          <ul>
            <li className="my-2">
              <a className="hover:text-indigo-600" href="#">Inicio</a>
            </li>
            <li>
               <a href="/login">Login</a> 
            </li>
            <li>
               <a href="/register">Register</a> 
            </li>
          </ul>
        </div>
        <div className="p-5 sm:w-7/12 border-r text-center">
          <h3 className="font-bold text-xl text-indigo-600 mb-4">Blog Patagonia</h3>
          <p className="text-gray-500 text-sm mb-10">
            Un espacio creado para compartir ideas, experiencias y reflexiones sobre la vida en la Patagonia. Historias que conectan con la naturaleza, la cultura y su gente.
          </p>
        </div>
        <div className="p-5 sm:w-3/12">
          <div className="text-sm uppercase text-indigo-600 font-bold">Contáctanos</div>
          <ul>
            <li className="my-2">
              <a className="hover:text-indigo-600" href="#">XXX XXXX, Piso 4, Buenos Aires</a>
            </li>
            <li className="my-2">
              <a className="hover:text-indigo-600" href="#">contacto@empresa.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex py-5 m-auto text-gray-800 text-sm flex-col items-center border-t max-w-screen-xl">
        <div className="my-5">© Copyright 2025. Nicolas Laime - Martin Lopez.</div>
      </div>
    </div>
  )
}

export default Footer
