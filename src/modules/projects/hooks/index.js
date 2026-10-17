import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, getProject, createProject, updateProject, deleteProject } from "../services/index";
import { reactQueryConfig } from "~/config/react-query.config.js";

// Get List
export function useProjects(params) {
    return useQuery({
        queryKey: ["projects", params],
        queryFn: () => getProjects(params),
        ...reactQueryConfig
    });
}

// Get Single Item 
export function useProject(id) {
    return useQuery({
        queryKey: ["projects", id],
        queryFn: () => getProject(id),
        ...reactQueryConfig,
        enabled: !!id
    });
}

// Create Item
export function useCreateProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProject,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
    });
}

// Update Item
export function useUpdateProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProject,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
    });
}

// Delete Item
export function useDeleteProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProject,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
    });
}