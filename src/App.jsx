import Router from "./router/router"
import { Toaster } from "react-hot-toast"
import toasterOptions from "./config/toasterOptions"
import useAxiosConfig from "./config/useAxiosConfig"

function App() {

  useAxiosConfig()

  return (
    <>
      <Router />
      <Toaster position="bottom-right" toastOptions={toasterOptions} />
    </>
  )
}

export default App
