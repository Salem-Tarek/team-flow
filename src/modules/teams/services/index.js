import axiosClient from "~/lib/axios";

export const getTeams = (params) => {
    return axiosClient.get("/teams", { params })
        .then((res) => res.data)
}

export const createTeam = (payload) => {
    return axiosClient.post("/teams", { data: payload })
        .then((res) => res.data)
}

export const deleteTeam = (id) => {
    return axiosClient.delete(`/teams/${id}`)
        .then((res) => res.data)
}