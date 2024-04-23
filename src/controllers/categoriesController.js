import axios from "./axiosInstance";

const urlBase = "/categories"

async function getCategory(id) {
    try {
        const { data } = await axios.get(`${urlBase}/${id}`)
        return data;
    }
    catch (error) {
        console.log(error)
    }
}

async function getCategories() {
    try {
        const { data } = await axios.get(urlBase)
        return data;
    }
    catch (err) {
        console.log(err)
    }
}

async function createCategory(payload) {
    try {
        const { data } = await axios.post(urlBase, payload)
        return data;
    }
    catch (error) {
        console.log(error)
    }
}

async function updateCategory(id, payload) {
    try {
        const { data } = await axios.put(`${urlBase}/${id}`, payload)
        console.log(data)
        return data;
    }
    catch (err) {
        console.log(err)
    }

}

async function deleteCategory(id) {
    try {
        const { status } = await axios.delete(`${urlBase}/${id}`)
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