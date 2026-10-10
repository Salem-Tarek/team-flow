import { Routes, Route } from "react-router-dom";
import AuthLayout from "~/layouts/AuthLayout";
import DashboardLayout from "~/layouts/DashboardLayout";
import Login from '~/modules/auth/pages/Login'
import Overview from '~/modules/dashboard/pages/Overview'
import Components from '~/modules/dashboard/pages/Components'
import NotFound from "~/components/NotFound";

// Modules
import UsersList from "~/modules/users/pages/List.jsx"

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                </Route>
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Overview />} />
                    <Route path="components" element={<Components />} />
                    <Route path="users" element={<UsersList />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}