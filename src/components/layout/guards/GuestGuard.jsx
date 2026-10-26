import useAuthStore from "~/modules/auth/stores/authStore.js";
import { Outlet, Navigate } from "react-router-dom";

function GuestGuard() {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}

export default GuestGuard;