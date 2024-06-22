import Input from "../../components/Input"
import { useState } from "react"
import Button from "../../components/Button"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import authController from "../../controllers/authController"
import { useSetRecoilState } from "recoil";
import userStateAtom from "../../recoil/userState"

export default function Login() {

    const navigate = useNavigate();

    const setUserState = useSetRecoilState(userStateAtom)

    const [userForm, setUserForm] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState([])


    async function submitForm(e) {
        e.preventDefault()

        let _errors = [];

        try {
            const res = await authController.login(userForm)
            if (res.errors) {
                if (res.errors.email) { 
                    toast.error(res.errors.email)
                    _errors.push("email")
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
            toast.success("Ha iniciado sesión correctamente")
        }
        catch (err) {
            console.log(err)
        }
    }



    return (
        <div className="w-full flex-col gap-4">
            <h4 className="text-2xl">Iniciar sesión</h4>
            <form onSubmit={submitForm} >
                <Input
                    id="login-email"
                    type="email"
                    value={userForm.email}
                    onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                    placeholder="example@test.com"
                    label="Email"
                    required
                    error={errors.includes("email")}
                />
                <Input
                    id="login-pwd"
                    type="password"
                    value={userForm.password}
                    onChange={e => setUserForm({ ...userForm, password: e.target.value })}
                    label="Password"
                    required
                    error={errors.includes("password")}
                />
                <div className="flex flex-col mt-3 w-full items-center gap-4" >
                    <Button type="submit" >
                        Iniciar sesión
                    </Button>
                    <Link className="text-center text-blue-500" to="/signup" replace >¿No tienes cuenta? Regístrate</Link>
                </div>
            </form>
        </div>
    )
}
