import axios from "../config/axiosInstance";
const urlBase = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";
const urlPost = urlBase + "/posts"

async function getPost(id) {
    try {
        const { data } = await axios.get(`${urlPost}/${id}`)
        return data;
    }
    catch (error) {
        console.log(error)
    }
}

async function getPosts() {
    try {
        const { data } = await axios.get(`${urlPost}`)
        return data;
    }
    catch (err) {
        console.log(err)
    }
}

async function createPost(payload) {
    try {
        const { data } = await axios.post(urlPost, payload)
        return data;
    }
    catch (error) {
        console.log(error)
    }
}

async function updatePost(id, payload) {
    try {
        const { data } = await axios.put(`${urlPost}/${id}`, payload)
        console.log(data)
        return data;
    }
    catch (err) {
        console.log(err)
    }

}

async function deletePost(id) {
    try {
        const { status } = await axios.del(`${urlPost}/${id}`)
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