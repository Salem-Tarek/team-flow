import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../stores/authStore";
import { login, logout, getCurrentUser } from "../services/index";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logout,
        onSettled: () => {
            navigate("/auth/login", { replace: true });
            setTimeout(() => {
                queryClient.cancelQueries();
                clearSession();
                queryClient.clear();
            }, 500)
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