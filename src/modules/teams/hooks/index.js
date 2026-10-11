import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTeams, createTeam } from "../services/index";
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
    });
}