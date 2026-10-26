import useAuthStore from "~/modules/auth/stores/authStore.js";
import { Outlet, Navigate } from "react-router-dom";

function AuthGuard() {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
}

export default AuthGuard;