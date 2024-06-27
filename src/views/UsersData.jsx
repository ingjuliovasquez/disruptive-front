import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import postsController from '../controllers/postController'
import usersController from '../controllers/usersController'
import toast from "react-hot-toast"
import { useRecoilValue } from "recoil"
import userState from '../recoil/userState'
import categoriesController from "../controllers/categoriesController"

export default function UsersData() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const user = useRecoilValue(userState)

    async function getAuthors(posts) {
        let _postsAuthor = [];
        for (const post of posts) {
            try {
                const { data } = await usersController.getUserById(post.authorId);
                if (data) {
                    _postsAuthor.push({ ...post, author: data.username });
                } else {
                    _postsAuthor.push({ ...post });
                }
            } catch (error) {
                toast.error("Ha habido un problema al descargar los nombres de autor");
            }
        }
        return _postsAuthor;
    }

    async function getCategories(posts) {
        let _postsCat = [];
        for (const post of posts) {
            try {
                const cat = await categoriesController.getCategory(post.categoryId);
                if (data) {
                    _postsCat.push({ ...post, categoryName: cat.category })
                }
                else {
                    _postsCat.push({ ...post });
                }
            } catch (error) {
                toast.error("ha habido un error al obtener las categorías")
            }
        }
        return _postsCat;
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const posts = await postsController.getPosts()
            const _postsAuthor = await getAuthors(posts)
            const _postsCategories = await getCategories(_postsAuthor)
            setData(_postsCategories)
        }
        catch (error) {
            toast.error("Ha habido un error al descargar los datos")
        }
        setLoading(false)
    }
    useEffect(() => { fetchData() }, [])



    const deletePost = async (id) => {
        try {
            await postsController.deletePost(id)
            await fetchData()
        } catch (error) {
            toast.error("Ha habido un error al borrar")
        }
    }


    if (loading) return <p>Cargando...</p>;

    return (
        <div className="w-full flex flex-col gap-4">
            <h1 className="text-lg">Datos de usuarios</h1>
            <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Usuario
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Categoría
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Contenido
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(post => <tr className="bg-white border-b " key={post._id}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {post.author ? post.author : post.authorId}
                                </th>
                                <td className="px-6 py-4">
                                    {post.categoryName ? post.categoryName : post.categoryId}
                                </td>
                                <td className="px-6 py-4">
                                    {post.content.substring(0, 50)}
                                    {post.content.length > 50 && "..."}
                                </td>
                                <td className="px-6 py-4 flex gap-1">
                                    <Link to={`/post/${post._id}`} className="bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-xl text-white" >
                                        Ver
                                    </Link>
                                    {(user?.role === 'admin' || user?.role === "publisher") &&
                                        <Link to={`/update-post/${post._id}`} className="bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-xl text-white" >
                                            Editar
                                        </Link>
                                    }
                                    {(user?.role === "admin") &&
                                        <button onClick={() => deletePost(post._id)} className="bg-red-500 hover:bg-red-400 px-3 py-2 rounded-xl text-white" >
                                            Borrar
                                        </button>
                                    }

                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
