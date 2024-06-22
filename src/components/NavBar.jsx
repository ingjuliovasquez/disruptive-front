import { useRecoilState } from "recoil"
import userState from "../recoil/userState"
import { Link, useNavigate } from "react-router-dom"

const btnClass = "px-5 py-2 bg-gray-200 hover:bg-gray-100 cursor-pointer rounded"

function NavLink({ to, children }) {
    return (<Link to={to} className={btnClass} > {children} </Link>)
}

export default function NavBar() {

    const [user, setUser] = useRecoilState(userState)
    const navigate = useNavigate()

    const logout = () => {
        setUser(null)
        navigate("/")
    }

    return (
        <div className="w-full p-2 flex bg-white">
            <div className="container mx-auto flex justify-between">
                <h2 className="font-bold text-xl" >Disruptive</h2>
                <nav className="flex gap-2">
                    {
                        !user
                            ? <>
                                <NavLink to="/login">Iniciar sesión</NavLink>
                                <NavLink to="/signup">Registrarse</NavLink>
                            </>
                            : <>
                                {(user.role === "admin" || user.role === "publisher") && <NavLink to="/create-post">Crear post</NavLink>}
                                {user.role === "admin" && <NavLink to="/create-category">Crear categoría</NavLink>}
                                <button onClick={logout}
                                    className={btnClass}
                                >
                                    Cerrar sesión
                                </button>
                            </>
                    }
                </nav>
            </div>
        </div>
    )
}
