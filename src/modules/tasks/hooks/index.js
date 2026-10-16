import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, getTask, createTask, updateTask } from "../services/index";
import { reactQueryConfig } from "~/config/react-query.config.js";

// Get List
export function useTasks(params) {
    return useQuery({
        queryKey: ["tasks", params],
        queryFn: () => getTasks(params),
        ...reactQueryConfig
    });
}

// Get Single Item 
export function useTask(id) {
    return useQuery({
        queryKey: ["tasks", id],
        queryFn: () => getTask(id),
        ...reactQueryConfig,
        enabled: !!id
    });
}

// Create Item
export function useCreateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTask,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
}

// Update Item
export function useUpdateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTask,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
}