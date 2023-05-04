import axios from "axios";
import { getData } from "./localStorageConfig";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(function (config) {
    const token = getData(import.meta.env.VITE_ACCESS_TOKEN);
    config.headers.Authorization =  `Bearer ${token}`;
     
    return config;
});

export default axiosInstance;