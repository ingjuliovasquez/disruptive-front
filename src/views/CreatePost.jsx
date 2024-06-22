import { useEffect, useState } from "react"
import postController from "../controllers/postController"
import categoriesController from "../controllers/categoriesController"
import Input from "../components/Input"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useSearchParams } from "react-router-dom"

export default function CreatePost() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const postId = searchParams.get("id")

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    content: "",
    authorId: "",
    categoryId: "",
  })

  async function getPost() {
    try {
      const data = await postController.getPost(postId)
      if (data) {
        const _formData = { post: data.post, permissions: data.permissions }
        setFormData(_formData)
      }
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    if (postId) {
      getPost()
    }
  }, [])



  const submitForm = async (e) => {
    e.preventDefault()
    try {
      if (postId) { // Editing
        const data = await postController.updatePost(postId, formData)
        if (data) {
          toast.success("Se ha actualizado post correctamente")
        }

      } else { // Creating
        const data = await postController.createPost(formData)
        if (data) {
          toast.success("Se ha creado post correctamente")
        }
      }
      navigate(-1)
    }
    catch (err) {
      console.log(err)
    }
  }

  const [categories, setCategories] = useState([])

  async function getCategories() {
      const data = await categoriesController.getCategories()
      if (data) {
          setCategories(data)
      }
  }

  useEffect(() => { getCategories() }, [])

  return (
    <>
      <div className="w-full max-w-xl bg-white mt-10 rounded-xl mx-auto p-5 flex flex-col" >
        <h2 className="text-xl font-bold">Crear post</h2>
        <form className="flex flex-col gap-5 w-full" onSubmit={submitForm}>
          <Input
            label="Titulo"
            value={formData.title}
            onChange={e => setFormData({ ...formData, post: e.target.value })}
          />
          <Input
            label="URL"
            value={formData.url}
            onChange={e => setFormData({ ...formData, post: e.target.value })}
          />
          <Input
            label="Contenido"
            value={formData.content}
            onChange={e => setFormData({ ...formData, post: e.target.value })}
          />  
          <div className="text-left flex flex-row items-end justify-end">
            <p className="text-blue-500 font-medium" >{formData.authorId} </p>
          </div>   
                
          <label className="text-sm font-medium text-gray-900">Tematicas disponibles</label>

          <select id={formData.categoryId} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            {
              categories.map(category => <option key={category._id}
                className="max-w-sm w-full bg-white rounded-xl overflow-hidden shadow hover:shadow-xl brightness-95 hover:brightness-100">
                <h3 className="font-bold text-center my-3 text-xl" >
                    {category.category}
                </h3>
            </option>)
            }
          </select>


          <div className="flex  justify-center gap-5 mt-5">
            <Button type="submit">Crear</Button>
            <Button variant="red" onClick={() => navigate(-1)}>Cancelar</Button>
          </div>
        </form>

      </div>
        {/* Post creado */}
      <div className="w-full max-w-xl bg-white mt-10 rounded-xl mx-auto p-5 flex flex-col gap-3" >
        <h2 className="font-bold text-xl text-blue-800">Post</h2>
        <div className="text-md">
              <img></img>
              <p>Contenido</p>
              <a>URL</a>
        </div>
        <h3 className="text-left text-blue-500 font-bold">Credits: </h3>
      </div>
    </>
  )
}
