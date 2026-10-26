import { Routes, Route } from "react-router-dom";
import AuthLayout from "~/layouts/AuthLayout";
import DashboardLayout from "~/layouts/DashboardLayout";
import Login from '~/modules/auth/pages/Login'
import Overview from '~/modules/dashboard/pages/Overview'
import Components from '~/modules/dashboard/pages/Components'
import NotFound from "~/components/NotFound";

// Modules
import UsersList from "~/modules/users/pages/List.jsx"
import TeamsList from "~/modules/teams/pages/List.jsx"
import ProjectsList from "~/modules/projects/pages/List.jsx"
import ProjectsAddEdit from "~/modules/projects/pages/AddEdit.jsx"
import ProjectDetails from "~/modules/projects/pages/Details.jsx"
import TasksList from "~/modules/tasks/pages/List.jsx"
import AuthGuard from "~/components/layout/guards/AuthGuard.jsx"
import GuestGuard from "~/components/layout/guards/GuestGuard.jsx"

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route element={<GuestGuard />}>
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route path="login" element={<Login />} />
                    </Route>
                </Route>

                <Route element={<AuthGuard />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Overview />} />
                        <Route path="components" element={<Components />} />
                        <Route path="users" element={<UsersList />} />
                        <Route path="teams" element={<TeamsList />} />
                        <Route path="projects" element={<ProjectsList />} />
                        <Route path="projects/:id" element={<ProjectDetails />} />
                        <Route path="projects/add" element={<ProjectsAddEdit />} />
                        <Route path="projects/edit/:id" element={<ProjectsAddEdit />} />
                        <Route path="tasks" element={<TasksList />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}