import { Link } from "react-router-dom"
import Button from "./Button"
import { useRecoilValue } from "recoil"
import userState from "../recoil/userState"

export default function UserView() {

    const user = useRecoilValue(userState);

    return (
        <div className="w-full h-full ">
            <div>
                <div className="flex flex-row w-full items-center justify-between">
                    <h1 className="font-semibold text-xl"> Contenido disponible</h1>
                    <div className="flex flex-row gap-3">
                        {
                            user?.role === "admin" &&
                            <Link to="/create-category" >
                                <Button type="submit" >
                                    Crear categoria
                                </Button>
                            </Link>
                        }
                        {
                            (user?.role === "publisher" || user?.role === "admin") &&
                            <Link to="/create-post" >
                                <Button type="submit" >
                                    Crear post
                                </Button>
                            </Link>
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}
