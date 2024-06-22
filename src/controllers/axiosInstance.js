import axios from "axios";
import { useRecoilValueLoadable } from "recoil";
import userState from "../recoil/userState";

const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: url
});


axiosInstance.interceptors.request.use(
  (config) => {

    if (true) {
      config.headers.Authorization = `Bearer ${"user.jwt"}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function get(url) {
  return await axiosInstance.get(url);
}

async function post(url, payload) {
  return await axiosInstance.post(url, payload);
}

async function put(url, payload) {
  return await axiosInstance.put(url, payload);
}

async function del(url) {
  return await axiosInstance.delete(url)
}

export default {
  get, post, put, delete: del
}