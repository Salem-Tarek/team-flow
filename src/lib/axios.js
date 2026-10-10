import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://www.teamflow.com/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;