import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTeams, createTeam, updateTeam, deleteTeam } from "../services/index";
import { reactQueryConfig } from "~/config/react-query.config.js";

// Get List
export function useTeams(params) {
    return useQuery({
        queryKey: ["teams", params],
        queryFn: () => getTeams(params),
        ...reactQueryConfig
    });
}

// Create Item
export function useCreateTeam() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTeam,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teams"] }),
        onError: () => { },
        onSettled: () => { }
    });
}

// Update Item
export function useUpdateTeam() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTeam,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teams"] }),
        onError: () => { },
        onSettled: () => { }
    });
}

// Delete Item
export function useDeleteTeam() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTeam,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teams"] }),
        onError: () => { }
    });
}