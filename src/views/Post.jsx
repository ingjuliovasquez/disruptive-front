import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import toast from "react-hot-toast"

import postController from "../controllers/postController"
import categoriesController from "../controllers/categoriesController"
import usersController from "../controllers/usersController"


export default function Post() {

    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(false)

    async function fetchData() {
        setLoading(true)
        try {
            const _post = await postController.getPost(id)
            const _category = await categoriesController.getCategory(_post.categoryId)
            const _author = await usersController.getUserById(_post.authorId)
            setPost({ ..._post, categoryName: _category.category, author: _author.data.username })
        } catch (error) {
            toast.error("Ha habido un error al descargar el contenido del post")
            console.error(error)
        }
        setLoading(false)
    }

    useEffect(() => { fetchData() }, [])

    if (loading) return <p>Cargando...</p>
    if (!post) return null;
    return (
        <div>
            <div className="w-full h-52 mb-5">
                <img src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="books" className="w-full h-full object-cover" />
                <h2 className="text-4xl font-bold relative text-center bottom-32 z-20 text-white drop-shadow ">{post.categoryName}</h2>
            </div>
            <Link to={-1} className="text-blue-500" >Regresar</Link>
            <div className="container mx-auto my-10">
                <h2 className="text-4xl"> {post.title} </h2>
                <h3>{post.author}</h3>
                <hr className="border-black my-5" />
                <p>
                    {post.content}
                </p>
            </div>
            <Link to={-1} className="text-blue-500" >Regresar</Link>
        </div>
    )
}
