import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../services/index";
import { reactQueryConfig } from "~/config/react-query.config.js";

export function useDashboard() {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: () => getDashboard(),
        ...reactQueryConfig,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0
    });
}