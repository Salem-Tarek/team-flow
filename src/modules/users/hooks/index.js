import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, createUser } from "../services/index";
import { reactQueryConfig } from "~/config/react-query.config.js";

// Get List
export function useUsers(params) {
    return useQuery({
        queryKey: ["users", params],
        queryFn: () => getUsers(params),
        ...reactQueryConfig
    });
}

// Create Item
export function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
}