import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, getTask, createTask, updateTask, deleteTask } from "../services/index";
import { reactQueryConfig } from "~/config/react-query.config.js";

// 1. Get List
export function useTasks(params) {
    return useQuery({
        queryKey: ["tasks", params],
        queryFn: () => getTasks(params),
        ...reactQueryConfig
    });
}

// 2. Get Single Item 
export function useTask(id) {
    return useQuery({
        queryKey: ["tasks", id],
        queryFn: () => getTask(id),
        ...reactQueryConfig,
        enabled: !!id
    });
}

// 3. Create Item
export function useCreateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTask,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
        onError: () => { },
        onSettled: () => { }
    });
}

// 4. Update Item
export function useUpdateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTask,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
        onError: () => { },
        onSettled: () => { }
    });
}

// 5. Delete Item
export function useDeleteTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTask,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
        onError: () => { }
    });
}