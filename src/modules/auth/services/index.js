import axiosClient from "~/lib/axios";

export const login = (data) => {
    return axiosClient.post("/auth/login", { data })
        .then((res) => res.data)
}

export const logout = () => {
    return axiosClient.post(`/auth/logout`)
        .then((res) => res.data)
}

export const getCurrentUser = () => {
    return axiosClient.get(`/auth/me`)
        .then((res) => res.data)
}