import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from 'react'

import AuthLayout from "~/layouts/AuthLayout";
import DashboardLayout from "~/layouts/DashboardLayout";

const Login = lazy(() => import('~/modules/auth/pages/Login'));
const Overview = lazy(() => import('~/modules/dashboard/pages/Overview'));
const Components = lazy(() => import('~/modules/dashboard/pages/Components'));
const NotFound = lazy(() => import("~/components/NotFound"));

// Modules
const UsersList = lazy(() => import("~/modules/users/pages/List.jsx"));
const TeamsList = lazy(() => import("~/modules/teams/pages/List.jsx"));
const ProjectsList = lazy(() => import("~/modules/projects/pages/List.jsx"));
const ProjectsAddEdit = lazy(() => import("~/modules/projects/pages/AddEdit.jsx"));
const ProjectDetails = lazy(() => import("~/modules/projects/pages/Details.jsx"));
const TasksList = lazy(() => import("~/modules/tasks/pages/List.jsx"));
const Profile = lazy(() => import("~/modules/profile/pages/Profile.jsx"));

// Guards
import AuthGuard from "~/components/layout/guards/AuthGuard.jsx"
import GuestGuard from "~/components/layout/guards/GuestGuard.jsx"
import AdminGuard from "~/components/layout/guards/AdminGuard.jsx"

export default function AppRoutes() {
    return (
        <>
            <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
                            <Route element={<AdminGuard />}>
                                <Route path="projects/:id" element={<ProjectDetails />} />
                                <Route path="projects/add" element={<ProjectsAddEdit />} />
                                <Route path="projects/edit/:id" element={<ProjectsAddEdit />} />
                            </Route>
                            <Route path="tasks" element={<TasksList />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </>
    )
}