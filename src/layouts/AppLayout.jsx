import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"


export default function AppLayout() {
    return (
        <div>
            <NavBar />
            <div className="container mx-auto w-1/2 flex flex-col justify-center " >
                <Outlet />
            </div>

        </div>
    )
}
