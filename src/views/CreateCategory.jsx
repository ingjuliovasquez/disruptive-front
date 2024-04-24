import { useEffect, useState } from "react"
import categoriesController from "../controllers/categoriesController"
import Input from "../components/Input"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import Toggle from '../components/Toggle'
import toast from "react-hot-toast"
import { useSearchParams } from "react-router-dom"

export default function CreateCategory() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get("id")

  const [formData, setFormData] = useState({
    category: "",
    permissions: {
      addVideo: false,
      addImage: false,
      addText: false
    }
  })

  async function getCategory() {
    try {
      const data = await categoriesController.getCategory(categoryId)
      if (data) {
        const _formData = { category: data.category, permissions: data.permissions }
        setFormData(_formData)
      }
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    if (categoryId) {
      getCategory()
    }
  }, [])



  const submitForm = async (e) => {
    e.preventDefault()
    try {
      if (categoryId) { // Editing
        const data = await categoriesController.updateCategory(categoryId, formData)
        if (data) {
          toast.success("Se ha actualizado la categoría correctamente")
        }

      } else { // Creating
        const data = await categoriesController.createCategory(formData)
        if (data) {
          toast.success("Se ha creado la categoría correctamente")
        }
      }
      navigate(-1)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full max-w-xl bg-white mt-10 rounded-xl mx-auto p-5 flex flex-col" >
      <h2 className="text-xl font-bold">Crear categoría</h2>
      <form className="flex flex-col gap-5 w-full" onSubmit={submitForm}>
        <Input
          label="Nombre"
          value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
        />

        <label className="text-sm font-medium text-gray-900">Se le puede agregar:</label>
        <div className="flex  justify-center gap-10">
          <Toggle
            label="Imágenes"
            value={formData.permissions.addImage}
            onChange={e => setFormData({
              ...formData,
              permissions: {
                ...formData.permissions, addImage: e.target.checked
              }
            })}
          />
          <Toggle
            label="Video de youtube"
            value={formData.permissions.addVideo}
            onChange={e => setFormData({
              ...formData,
              permissions: {
                ...formData.permissions, addVideo: e.target.checked
              }
            })}
          />
                    <Toggle
            label="Archivo de texto"
            value={formData.permissions.addText}
            onChange={e => setFormData({
              ...formData,
              permissions: {
                ...formData.permissions, addText: e.target.checked
              }
            })}
          />
        </div>
        <div className="flex  justify-center gap-5 mt-5">
          <Button type="submit">Crear</Button>
          <Button variant="red" onClick={() => navigate(-1)}>Cancelar</Button>
        </div>
      </form>
    </div>
  )
}
