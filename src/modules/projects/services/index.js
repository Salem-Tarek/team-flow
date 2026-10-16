import axiosClient from "~/lib/axios";

export const getProjects = (params) => {
    return axiosClient.get("/projects", { params })
        .then((res) => res.data)
}

export const getProject = (id) => {
    return axiosClient.get(`/projects/${id}`)
        .then((res) => res.data)
}

export const createProject = (data) => {
    return axiosClient.post("/projects", { data })
        .then((res) => res.data)
}

export const updateProject = ({ id, data }) => {
    return axiosClient.put(`/projects/${id}`, { data })
        .then((res) => res.data)
}