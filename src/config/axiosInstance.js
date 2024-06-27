import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

const instance = axios.create({
  baseURL: url
});

async function get(url) {
  return await instance.get(url);
}

async function post(url, payload) {
  return await instance.post(url, payload);
}

async function put(url, payload) {
  return await instance.put(url, payload);
}

async function del(url) {
  return await instance.delete(url)
}

export default {
  get, post, put, del, instance
}