import { useState, useEffect } from "react"
import categoriesController from "../controllers/categoriesController"
import { Link } from "react-router-dom"
import UserView from "../components/UserView"
import Categories from "./Categories"
import UsersData from "./UsersData"


export default function Home() {

    const [categories, setCategories] = useState([])

    async function getCategories() {
        const data = await categoriesController.getCategories()
        if (data) {
            setCategories(data)
        }
    }

    useEffect(() => { getCategories() }, [])

    return (
        <div className="flex flex-wrap w-full h-full gap-5 mx-auto mt-[40px] justify-center">
            <UserView />
            {
                categories.map(category => <Link key={category._id}
                    to={`/category?id=${category._id}`}
                    className="max-w-sm w-full bg-white rounded-xl overflow-hidden shadow hover:shadow-xl brightness-95 hover:brightness-100"
                >
                    <img
                        src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        className="max-h-32 w-full object-cover "
                    />
                    <h3 className="font-bold text-center my-3 text-xl" >
                        {category.category}
                    </h3>
                </Link>)
            }
            <div className="w-full flex flex-col gap-3 justify-center">
                <Categories />
                <UsersData />
            </div>
        </div>
    )
}
