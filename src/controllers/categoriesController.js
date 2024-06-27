import axios from "../config/axiosInstance";
const urlBase = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";
const urlCategory = urlBase + "/categories"

async function getCategory(id) {
    try {
        const { data } = await axios.get(`${urlCategory}/${id}`)
        return data;
    }
    catch (error) {
        console.log(error)
    }
}

async function getCategories() {
    try {
        const { data } = await axios.get(urlCategory)
        return data;
    }
    catch (err) {
        console.log(err)
    }
}

async function createCategory(payload) {
    try {
        const { data } = await axios.post(urlCategory, payload)
        return data;
    }
    catch (error) {
        console.log(error)
    }
}

async function updateCategory(id, payload) {
    try {
        const { data } = await axios.put(`${urlCategory}/${id}`, payload)
        console.log(data)
        return data;
    }
    catch (err) {
        console.log(err)
    }

}

async function deleteCategory(id) {
    try {
        const { status } = await axios.delete(`${urlCategory}/${id}`)
        return status;
    }
    catch (err) {
        console.log(err)
    }
}

export default {
    getCategory,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}