import { useState } from "react"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { Link } from "react-router-dom"
import authController from "../../controllers/authController"
import toast from "react-hot-toast"
import { useSetRecoilState } from "recoil"
import userState from "../../recoil/userState"
import { useNavigate } from "react-router-dom"

export default function Signup() {

    const navigate = useNavigate()

    const setUserState = useSetRecoilState(userState)

    const [userForm, setUserForm] = useState({
        email: "", password: "", confirmPassword: "", username: "", type: ""
    })

    const [errors, setErrors] = useState([])


    async function submitForm(e) {
        e.preventDefault()

        //validate form
        let _errors = []
        if (userForm.password != userForm.confirmPassword) { _errors.push("confirmPassword") }
        if (_errors.length > 0) {
            setErrors(_errors)
            toast.error("Las contraseñas no coinciden")
            return
        }

        try {
            const res = await authController.signup(userForm)
            if (res.errors) {
                if (res.errors.email) {
                    toast.error(res.errors.email)
                    _errors.push("email")
                }
                if (res.errors.username) {
                    toast.error(res.errors.username)
                    _errors.push("username")
                }
                if (res.errors.password) {
                    toast.error(res.errors.password)
                    _errors.push("password")
                }
                setErrors(_errors)
                return
            }
            setUserState({ ...res })
            navigate(-1)
            toast.success("Registro completado")
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="w-full flex-col gap-4">
            <h4 className="text-2xl">Registro</h4>
            <form onSubmit={submitForm}>
                <Input
                    type="email"
                    value={userForm.email}
                    onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                    placeholder="example@test.com"
                    label="Email"
                    required
                    error={errors.includes("email")}
                />
                <Input
                    type="text"
                    value={userForm.username}
                    onChange={e => setUserForm({ ...userForm, username: e.target.value })}
                    placeholder="username"
                    label="Nombre de usuario"
                    required
                    error={errors.includes("username")}
                />
                <Input
                    type="password"
                    value={userForm.password}
                    onChange={e => setUserForm({ ...userForm, password: e.target.value })}
                    label="Contraseña"
                    placeholder="123456"
                    required
                    error={errors.includes("password")}
                />
                <Input
                    type="password"
                    value={userForm.confirmPassword}
                    onChange={e => setUserForm({ ...userForm, confirmPassword: e.target.value })}
                    label="Confirmar contraseña"
                    placeholder="123456"
                    required
                    error={errors.includes("confirmPassword")}
                />
                <label className="block mb-0 text-sm font-medium text-gray-900"> Tipo </label>
                <select id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="reader">Lector</option>
                    <option value="publisher">Creador</option>
                </select>
                <div className="flex flex-col mt-3 w-full items-center gap-4" >
                    <Button type="submit">
                        Registrarse
                    </Button>
                    <Link className="text-center text-blue-500" to="/login" replace >Ya tengo una cuenta</Link>
                </div>
            </form>
        </div>
    )
}
