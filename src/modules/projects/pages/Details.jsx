
import { useParams, Link } from "react-router";
import { useProject } from "../hooks/index.js";
import { useBreadcrumbStore } from "~/stores/breadcrumbStore.js";
import { useEffect } from 'react'

const statusColor = {
    planning: "badge-info",
    active: "badge-success",
    on_hold: "badge-warning",
    completed: "badge-neutral",
};

const priorityColor = {
    low: "badge-ghost",
    medium: "badge-info",
    high: "badge-warning",
    urgent: "badge-error",
};

const formatDate = (d) => new Date(d).toLocaleDateString();
const label = (s) => s.replace("_", " ");

function Info({ title, value }) {
    return (
        <div className="min-w-0 space-y-1">
            <p className="text-sm text-base-content/60">{title}</p>
            <p className="font-medium break-words">
                {value || "-"}
            </p>
        </div>
    );
}

function ProjectDetailsSkeleton() {
    return (
        <div className="flex flex-col gap-6 animate-pulse">
            {/* Header skeleton */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                    <div className="skeleton h-8 w-56 max-w-full" />

                    <div className="flex gap-2">
                        <div className="skeleton h-6 w-20 rounded-full" />
                        <div className="skeleton h-6 w-28 rounded-full" />
                    </div>
                </div>

                <div className="skeleton h-12 w-28 rounded-btn" />
            </div>

            {/* Progress skeleton */}
            <div className="card border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-4">
                    <div className="flex justify-between gap-4">
                        <div className="skeleton h-6 w-28" />
                        <div className="skeleton h-6 w-12" />
                    </div>
                    <div className="skeleton h-3 w-full rounded-full" />
                </div>
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="card border border-base-300 bg-base-100 shadow-sm"
                    >
                        <div className="card-body gap-3 p-5">
                            <div className="skeleton h-4 w-20" />
                            <div className="skeleton h-8 w-28 max-w-full" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Details skeleton */}
            <div className="card border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-6">
                    <div className="skeleton h-6 w-24" />

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="space-y-2">
                                <div className="skeleton h-4 w-20" />
                                <div className="skeleton h-5 w-32 max-w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Description skeleton */}
            <div className="card border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-4">
                    <div className="skeleton h-6 w-32" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-4/5" />
                </div>
            </div>
        </div>
    );
}

function ProjectDetails() {
    const { id } = useParams();
    const { data: projectData, isLoading } = useProject(id);
    const { setBreadcrumbItems } = useBreadcrumbStore()
    useEffect(() => {
        if (!projectData) return;
        setBreadcrumbItems([
            { to: "/dashboard", label: "Dashboard" },
            { to: `/dashboard/projects`, label: "Projects" },
            { to: ``, label: projectData?.name }
        ])
    }, [projectData])

    if (isLoading) return <ProjectDetailsSkeleton />;

    if (!projectData) {
        return (
            <div className="card border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body items-center py-12 text-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-base-200">
                        <span className="text-2xl">!</span>
                    </div>
                    <h2 className="card-title">Project not found</h2>
                    <p className="text-sm text-base-content/60">
                        The project may have been removed or the link is incorrect.
                    </p>
                    <Link
                        to="/dashboard/projects"
                        className="btn btn-primary mt-2"
                    >
                        Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="min-w-0 space-y-3">
                    <div>
                        <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
                            {projectData.name}
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span
                            className={`badge capitalize ${statusColor[projectData.status]}`}
                        >
                            {label(projectData.status)}
                        </span>

                        <span
                            className={`badge badge-outline capitalize ${priorityColor[projectData.priority]}`}
                        >
                            {projectData.priority} priority
                        </span>
                    </div>
                </div>

                <Link
                    to={`/dashboard/projects/edit/${projectData.id}`}
                    className="btn btn-primary w-full sm:w-auto"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="size-5"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13l-2.685.896.896-2.685a4.5 4.5 0 0 1 1.13-1.897l8.836-8.836Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 7.125 16.875 4.5M18 13.5V19.125A1.875 1.875 0 0 1 16.125 21H4.875A1.875 1.875 0 0 1 3 19.125V7.875A1.875 1.875 0 0 1 4.875 6H10.5"
                        />
                    </svg>
                    Edit Project
                </Link>
            </div>

            {/* Progress */}
            <div className="card border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="card-title text-base">
                                Project Progress
                            </h2>
                            <p className="mt-1 text-sm text-base-content/60">
                                Overall completion
                            </p>
                        </div>

                        <span className="text-2xl font-bold tabular-nums text-primary">
                            {projectData.progress}%
                        </span>
                    </div>

                    <progress
                        className="progress progress-primary h-3 w-full"
                        value={projectData.progress}
                        max="100"
                        aria-label="Project progress"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="stat rounded-box border border-base-300 bg-base-100 shadow-sm">
                    <div className="stat-figure text-primary">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="size-6"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5.25H6.75A2.25 2.25 0 0 0 4.5 7.5v12A2.25 2.25 0 0 0 6.75 21.75h10.5A2.25 2.25 0 0 0 19.5 19.5v-12a2.25 2.25 0 0 0-2.25-2.25H15M9 5.25a2.25 2.25 0 0 1 2.25-2.25h1.5A2.25 2.25 0 0 1 15 5.25M9 5.25A2.25 2.25 0 0 0 11.25 7.5h1.5A2.25 2.25 0 0 0 15 5.25M8.25 12h7.5M8.25 16.5h7.5"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="stat-title">Tasks</div>
                    <div className="stat-value text-3xl text-primary">
                        {projectData.taskCount}
                    </div>
                    <div className="stat-desc">Total project tasks</div>
                </div>

                <div className="stat rounded-box border border-base-300 bg-base-100 shadow-sm">
                    <div className="stat-figure text-secondary">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-secondary/15">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="size-6"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 8c-2.21 0-4 .895-4 2s1.79 2 4 2 4 .895 4 2-1.79 2-4 2m0-8c1.11 0 2.08.31 2.75.8M12 8V6m0 2v10m0 0v2m0-2c-1.11 0-2.08-.31-2.75-.8M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="stat-title">Budget</div>
                    <div className="stat-value text-2xl break-words">
                        {projectData.budget?.toLocaleString() ?? "-"}
                    </div>
                    <div className="stat-desc">Allocated project budget</div>
                </div>

                <div className="stat rounded-box border border-base-300 bg-base-100 shadow-sm">
                    <div className="stat-figure text-accent">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="size-6"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M5.25 4.5h13.5A1.5 1.5 0 0 1 20.25 6v13.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5Z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="stat-title">Due Date</div>
                    <div className="stat-value text-xl break-words">
                        {formatDate(projectData.dueDate)}
                    </div>
                    <div className="stat-desc">Project deadline</div>
                </div>
            </div>

            {/* Details */}
            <div className="card border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-6">
                    <div>
                        <h2 className="card-title">Project Details</h2>
                        <p className="mt-1 text-sm text-base-content/60">
                            Key information about this project
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Info
                            title="Client"
                            value={projectData.clientName}
                        />
                        <Info
                            title="Team"
                            value={projectData.teamName}
                        />
                        <Info
                            title="Owner"
                            value={projectData.ownerName}
                        />
                        <Info
                            title="Start date"
                            value={formatDate(projectData.startDate)}
                        />
                        <Info
                            title="Due date"
                            value={formatDate(projectData.dueDate)}
                        />
                        <Info
                            title="Created"
                            value={formatDate(projectData.createdAt)}
                        />
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="card border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-3">
                    <h2 className="card-title">Description</h2>
                    <p className="whitespace-pre-line break-words leading-7 text-base-content/80">
                        {projectData.description || "No description."}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;
