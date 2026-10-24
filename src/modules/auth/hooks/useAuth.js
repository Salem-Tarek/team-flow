import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAuthStore from "../stores/authStore";

import { login, logout, getCurrentUser } from "../services/index";

export function useLogin() {
    const { setSession } = useAuthStore();

    return useMutation({
        mutationFn: login,
        onSuccess: (res) => setSession(res.data),
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    const { clearSession } = useAuthStore();

    return useMutation({
        mutationFn: logout,
        onSettled: () => {
            clearSession();
            queryClient.clear();
        },
    });
}

export function useGetCurrentUser() {
    const { setSession } = useAuthStore();

    return useQuery({
        queryKey: ["auth", "current-user"],
        queryFn: getCurrentUser,
        onSuccess: (res) => setSession(res.data),
    });
}