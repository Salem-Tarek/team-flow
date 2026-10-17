import axiosClient from "~/lib/axios";

export const getUsers = (params) => {
    return axiosClient.get("/users", { params })
        .then((res) => res.data)
}

export const createUser = (payload) => {
    return axiosClient.post("/users", { data: payload })
        .then((res) => res.data)
}

export const deleteUser = (id) => {
    return axiosClient.delete(`/users/${id}`)
        .then((res) => res.data)
}