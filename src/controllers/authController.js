import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";


async function login(payload) {
    try {
        const res = await axios.post(`${url}/login`, payload)
        return res.data
    } catch (err) {
        return {errors: err.response.data.errors}
    }
}

async function signup(payload) {
    try {
        const res = await axios.post(`${url}/signup`, payload)
        return res.data
    } catch (err) {
        return {errors: err.response.data.errors}
    }
}

export default { login, signup }