import { useEffect } from "react"
import usePostStore from "../../store/UsePostStore"
import useUserStore from "../../store/useUserStore"

const GestiondePost = () => {
  const { posts, fetchPosts, deletePost, loading } = usePostStore()
  const { users, fetchUsers } = useUserStore()

  useEffect(() => {
    fetchPosts()
    fetchUsers()
  }, [])

  const getUserNameById = (userId: number) => {
    const user = users.find((u) => u.id === userId)
    return user ? user.name : "Desconocido"
  }

  const handleDelete = async (postId: number) => {
    if (window.confirm("¿Estás seguro de eliminar este post?")) {
      await deletePost(postId)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">Gestión de Posts</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Cargando posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500 text-center">No hay posts disponibles.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border rounded p-4 bg-white shadow-sm space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="flex-1">
                  <p className="font-semibold">{post.idea}</p>
                  <p className="text-sm text-gray-700">{post.content}</p>
                  <p className="text-sm text-blue-600">
                    Autor: {getUserNameById(post.author as unknown as number)}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:underline text-sm whitespace-nowrap self-start sm:self-auto"
                >
                  Eliminar post
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GestiondePost
