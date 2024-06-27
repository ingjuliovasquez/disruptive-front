import UserView from "../components/UserView"
import UsersData from "./UsersData"


export default function Home() {

    return (
        <div className="flex flex-wrap w-full h-full gap-5 mx-auto mt-[40px] justify-center">
            <UserView />
           
            <div className="w-full flex flex-col gap-3 justify-center">
                <UsersData />
            </div>
        </div>
    )
}
