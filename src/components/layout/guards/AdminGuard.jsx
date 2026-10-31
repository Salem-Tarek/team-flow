import useAuthStore from "~/modules/auth/stores/authStore.js";
import { Outlet, Navigate } from "react-router-dom";

function AdminGuard() {
    const { isAdmin } = useAuthStore();

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default AdminGuard;