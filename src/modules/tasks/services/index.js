import axiosClient from "~/lib/axios";

export const getTasks = (params) => {
    return axiosClient.get("/tasks", { params })
        .then((res) => res.data)
}

export const getTask = (id) => {
    return axiosClient.get(`/tasks/${id}`)
        .then((res) => res.data)
}

export const createTask = (data) => {
    return axiosClient.post("/tasks", { data })
        .then((res) => res.data)
}

export const updateTask = ({ id, data }) => {
    return axiosClient.put(`/tasks/${id}`, { data })
        .then((res) => res.data)
}