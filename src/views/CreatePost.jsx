import { useEffect, useState } from "react"
import postController from "../controllers/postController"
import categoriesController from "../controllers/categoriesController"
import Input from "../components/Input"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import userState from "../recoil/userState"

export default function CreatePost() {

  const navigate = useNavigate()
  const { id } = useParams()
  const [categories, setCategories] = useState([])
  const user = useRecoilValue(userState)

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    content: "",
    authorId: "",
    categoryId: "",
  })

  async function getPost() {
    try {
      const data = await postController.getPost(id)
      if (data) {
        setFormData(data)
      }
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    if (id) {
      getPost()
    }
  }, [])


  const submitForm = async (e) => {
    e.preventDefault()
    try {
      if (id) { // Editing
        const data = await postController.updatePost(id, formData)
        if (data) {
          toast.success("Se ha actualizado post correctamente")
        }

      } else { // Creating
        const payload = { ...formData, authorId: user.userId }
        const data = await postController.createPost(payload)
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
            required
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
          <Input
            textarea
            required
            label="Contenido"
            value={formData.content}
            onChange={e => setFormData({ ...formData, content: e.target.value })}
          />

          <label className="text-sm font-medium text-gray-900">Tematicas disponibles</label>
          <select
            value={formData.categoryId}
            required
            onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
            id={formData.categoryId}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="" ></option>
            {
              categories.map(category =>
                <option key={category._id} value={category._id} > {category.category} </option>)
            }
          </select>


          <div className="flex  justify-center gap-5 mt-5">
            <Button type="submit">
              {
                id
                ? "Actualizar"
                : "Crear"
              }
            </Button>
            <Button variant="red" onClick={() => navigate(-1)}>Cancelar</Button>
          </div>
        </form>

      </div>

    </>
  )
}
