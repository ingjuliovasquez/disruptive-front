import { Link } from "react-router-dom"
import Search from "./Search"
import Button from "./Button"


export default function UserView() {



    return (
        <div className="w-full h-full ">  
            <div>
                <div className="flex flex-row w-full items-center justify-between">
                    <h1 className="font-semibold text-xl"> Contenido disponible</h1>
                    <div className="flex flex-row gap-3">
                        <Link to="/create-category" >
                            <Button type="submit" >
                            Crear categoria
                            </Button>
                        </Link>
                        <Link to="/create-post" >
                            <Button type="submit" >
                            Crear post
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center gap-2 flex-wrap p-4">
                    <span className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">Imágenes</span>
                    <span className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">Videos</span>
                    <span className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">Textos</span>
                </div>
                <Search />
            </div>
            
        </div>
    )
}
