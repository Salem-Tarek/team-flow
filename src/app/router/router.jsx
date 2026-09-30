import { Routes, Route } from "react-router-dom";
import AuthLayout from "~/layouts/AuthLayout";
import DashboardLayout from "~/layouts/DashboardLayout";
import Login from '~/modules/auth/pages/Login'
import Overview from '~/modules/dashboard/pages/Overview'
import Components from '~/modules/dashboard/pages/Components'
import NotFound from "~/components/NotFound";
import ThemeToggle from "~/components/ThemeToggle";

export default function AppRoutes() {
    return (
        <>
            <ThemeToggle />
            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                </Route>
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Overview />} />
                    <Route path="components" element={<Components />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}