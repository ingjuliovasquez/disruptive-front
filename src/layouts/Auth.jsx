import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function Auth() {
    const navigate = useNavigate();
    return (
        <div className="w-full bg-gray-200 h-screen flex flex-col items-center justify-center">
            <h3 className="font-bold mb-8 text-4xl" >Bienvenido</h3>
            <div className="w-full max-w-md mx-auto bg-white shadow rounded p-6 flex flex-col items-center">
                <Outlet />
            </div>
            <h3 className="mt-2 text-blue-700 cursor-pointer" onClick={() => navigate(-1)} >Continuar como invitado</h3>
        </div>
    )
}
