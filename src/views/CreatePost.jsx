import { useEffect, useState } from 'react'
import Input from "../components/Input";
import categoriesController from '../controllers/categoriesController';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userState from '../recoil/userState';

export default function CreatePost() {

  const user = useRecoilValue(userState);
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    content: "",
    url: ""
  })

  const navigate = useNavigate()

  const fetchCategories = async () => {
    try {
      const data = await categoriesController.getCategories()
      setCategories(data)
    }
    catch (err) {
      toast.error("Ha habido un error al descargar las categorías.")
    }
  }

  useEffect(() => { fetchCategories() }, [])

  useEffect(() => { 
    console.log(user)
    if(!user) {
      console.log("no hay usuario! Saliendo.")
    }

  }, [user])


  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...formData, authorId: user.username }
    
    //lógica de guardado
    
    navigate(-1)
  }

  const onChangeData = (id, value) => {
    setFormData({ ...formData, [id]: value })
  }

  return (
    <section className="mt-5 max-w-2xl mx-auto p-4 bg-white rounded-xl shadow " >
      <h2 className="text-2xl">Crear Post</h2>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col mt-4">
          <Input
            label="Título"
            required
            value={formData.title}
            onChange={e => onChangeData("title", e.target.value)}
          />
          <div className="my-2" >
            <label className='block mb-0 text-sm font-medium text-gray-900'>Categoría</label>
            <select
              required
              className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.categoryId}
              onChange={e => onChangeData("categoryId", e.target.value)}
            >
              <option value="" >Selecciona una</option>
              {categories.map(cat =>
                <option
                  key={cat._id}
                  value={cat._id}
                >
                  {cat.category}
                </option>
              )}
            </select>
          </div>
          <Input label="Contenido" required />
        </div>
        <div className="flex gap-4 justify-end mt-2">
          <button type="submit" className="px-3 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-xl">
            Guardar
          </button>
          <button className="px-3 py-2 bg-red-500 hover:bg-red-400 text-white rounded-xl">
            Volver
          </button>
        </div>
      </form>
    </section>
  )
}
