import axios from "./axiosInstance";
const urlBase = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";
const urlPost = "post"

async function getPost(id) {
    try {
        const { data } = await axios.get(`${urlBase}/${urlPost}/${id}`)
        return data;
    }
    catch (error) {
        console.log(error)
    }
}

async function getPosts() {
    try {
        const { data } = await axios.get(urlBase)
        return data;
    }
    catch (err) {
        console.log(err)
    }
}

async function createPost(payload) {
    try {
        const { data } = await axios.post(urlBase, payload)
        return data;
    }
    catch (error) {
        console.log(error)
    }
}

async function updatePost(id, payload) {
    try {
        const { data } = await axios.put(`${urlBase}/${id}`, payload)
        console.log(data)
        return data;
    }
    catch (err) {
        console.log(err)
    }

}

async function deletePost(id) {
    try {
        const { status } = await axios.delete(`${urlBase}/${id}`)
        return status;
    }
    catch (err) {
        console.log(err)
    }
}

export default {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost
}