import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import usePostStore from '../store/UsePostStore';

const PostDetails = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const {posts , fetchPosts} = usePostStore()

    useEffect(() => {
        if(posts.length === 0){
            fetchPosts()
        }
    },[fetchPosts,posts.length])

    const post = posts.find((p) => p.id === Number(id));

    if(!post){
        return <div className='text-center text-gray-500 mt-20'>Publicacion no encontrada</div>
    }

  return (
    <div className='max-w-4xl mx-auto px-4 py-12 my-15'>
        {post.imageUrl && (
            <img src={post.imageUrl} alt={post.idea} className='w-full h-64 object-cover rounded-lg shadow mb-8'/>


        )}

        <h1 className="text-3xl font-bold text-slate-800 mb-2">{post.idea}</h1>

            <p className="text-sm text-slate-500 mb-6">
             Publicado por <strong>{post.author}</strong> el{" "}
            {new Date(post.date).toLocaleDateString()}
             </p>

             <div className="prose max-w-none text-gray-700">
             <p>{post.content}</p>
            </div>

        <button onClick={() => navigate(-1)} className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl shadow transition duration-300'>
            ← Volver
        </button>

    </div>
  )
}

export default PostDetails
