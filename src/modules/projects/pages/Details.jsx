
import { useParams, Link } from "react-router";
import { useProject } from "../hooks/index.js";
import { useBreadcrumbStore } from "~/stores/breadcrumbStore.js";
import { useEffect } from 'react'
import { SquarePen, ClipboardList, CircleDollarSign, Calendar } from 'lucide-react'
import useAuthStore from "~/modules/auth/stores/authStore.js";

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

    const { isAdmin } = useAuthStore();

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

                {isAdmin && (
                    <Link
                        to={`/dashboard/projects/edit/${projectData.id}`}
                        className="btn btn-primary w-full sm:w-auto"
                    >
                        <SquarePen size={18} />
                        Edit Project
                    </Link>
                )}
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
                            <ClipboardList size={24} />
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
                            <CircleDollarSign size={24} />
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
                            <Calendar size={24} />
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
