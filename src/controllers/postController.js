import axios from "../config/axiosInstance";

const urlBase = "/posts"

async function getPost(id) {
    try {
        const { data } = await axios.get(urlBase + id);
        return data;
    } catch(e) {
        console.log(e)
    }
}

async function getPosts() {}