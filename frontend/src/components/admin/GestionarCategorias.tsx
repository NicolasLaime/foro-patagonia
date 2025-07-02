import { useEffect, useState } from "react"
import useCategoryStore, { type Category } from "../../store/UseCategoryStore"
import { useForm } from "react-hook-form"

const GestionarCategorias = () => {
  const { categorias, fetchCategorias, crearCategoria, eliminarCategoria, actualizarCategoria } = useCategoryStore()
  const [editando, setEditando] = useState<number | null>(null)
  const { register, handleSubmit, reset, setValue } = useForm<{ name: string; description: string; imageUrl: string }>()

  useEffect(() => {
    fetchCategorias()
  }, [])

  const onSubmit = async (data: { name: string; description: string; imageUrl: string }) => {
    try {
      if (editando !== null) {
        await actualizarCategoria(editando, data.name, data.description, data.imageUrl)
        setEditando(null)
      } else {
        await crearCategoria(data.name, data.description, data.imageUrl)
      }
      reset()
    } catch (error) {
      console.error("Error al guardar categoría:", error)
    }
  }

  const handleEditar = (cat: Category) => {
    setEditando(cat.id)
    setValue("name", cat.name)
    setValue("description", cat.description ?? "")
    setValue("imageUrl", cat.imageUrl ?? "")
  }

  const handleEliminar = async (id: number) => {
    const confirm = window.confirm("¿Estás seguro que quieres eliminar esta categoría?")
    if (confirm) {
      await eliminarCategoria(id)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Gestionar Categorías</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-8">
        <input
          {...register("name", { required: true })}
          placeholder="Nombre de la categoría"
          className="p-2 border rounded w-full"
        />

        <input
          {...register("imageUrl")}
          placeholder="Ingresa la url de la imagen"
          className="p-2 border rounded-2xl w-full"
        />

        <textarea
          {...register("description", { required: true })}
          placeholder="Descripción de la categoría"
          className="p-2 border rounded resize-none w-full min-h-[80px]"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full sm:w-auto"
        >
          {editando ? "Actualizar categoría" : "Crear categoría"}
        </button>
      </form>

      <div className="space-y-2">
        {categorias.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 p-3 rounded"
          >
            <div className="mb-2 sm:mb-0">
              <p className="font-semibold">{cat.name}</p>
              {cat.description && <p className="text-sm text-gray-600">{cat.description}</p>}
            </div>
            <div className="flex gap-4 sm:gap-2">
              <button
                onClick={() => handleEditar(cat)}
                className="text-blue-600 hover:underline whitespace-nowrap"
              >
                Editar
              </button>
              <button
                onClick={() => handleEliminar(cat.id)}
                className="text-red-600 hover:underline whitespace-nowrap"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GestionarCategorias
