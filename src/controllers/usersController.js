import axios from "../config/axiosInstance";
const urlBase = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";
const urlPost = urlBase + "/users"

async function getUserById(id) {
    try {
        const data = axios.get(`${urlPost}/${id}`)
        if (data) {
            return Promise.resolve(data)
        }
        else {
            return Promise.reject(null)
        }
    } catch (error) {
        return { error }
    }
}

export default { getUserById }