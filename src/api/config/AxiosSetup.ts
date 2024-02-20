
import axios from "axios";
import setupInterceptorsTo from "./axiosInterceptors";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    //timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
});

const http = setupInterceptorsTo(axiosInstance);

export default http;