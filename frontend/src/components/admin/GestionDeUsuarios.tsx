import { useEffect, useState } from "react"
import useUserStore from "../../store/useUserStore"

const GestionDeUsuarios = () => {
  const { users, userPosts, fetchUsers, deleteUser, fetchPostsByUserId, deletePostFromUser } = useUserStore()

  const [expandedUserId, setExpandedUserId] = useState<number | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro que quieres eliminar este usuario?")) {
      await deleteUser(id)
    }
  }

  const handleViewPosts = async (userId: number) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null)
    } else {
      await fetchPostsByUserId(userId)
      setExpandedUserId(userId)
    }
  }

  const handleDeletePost = async (userId: number, postId: number) => {
    if (window.confirm("¿Eliminar este Post?")) {
      await deletePostFromUser(userId, postId)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">Gestión de Usuarios</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded p-4 bg-gray-100 shadow-sm space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="mb-3 sm:mb-0">
                <p className="font-semibold text-lg">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-blue-600">Rol: {user.role}</p>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-2 items-center">
                <button
                  onClick={() => handleViewPosts(user.id)}
                  className="text-blue-600 hover:underline whitespace-nowrap"
                >
                  {expandedUserId === user.id ? "Ocultar posts" : "Ver posts"}
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:underline whitespace-nowrap"
                >
                  Eliminar
                </button>
              </div>
            </div>

            {expandedUserId === user.id && (
              <div className="mt-2 bg-white rounded p-3 border max-h-64 overflow-y-auto">
                {userPosts[user.id]?.length === 0 ? (
                  <p className="text-gray-500 text-sm">Este usuario no tiene posts.</p>
                ) : (
                  userPosts[user.id]?.map((post) => (
                    <div
                      key={post.id}
                      className="border-b py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
                    >
                      <div>
                        <p className="font-semibold">{post.idea}</p>
                        <p className="text-sm text-gray-700">{post.content}</p>
                      </div>
                      <button
                        onClick={() => handleDeletePost(user.id, post.id)}
                        className="text-red-500 hover:underline text-sm whitespace-nowrap self-start sm:self-auto"
                      >
                        Eliminar post
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GestionDeUsuarios
