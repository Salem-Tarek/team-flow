import GenericBtn from "~/components/GenericBtn/index.jsx";
import Icon from "./Icon.jsx"

const statusStyles = {
    "To Do": "bg-base-200 text-base-content",
    "In Progress": "bg-info/10 text-info",
    "In Review": "bg-warning/15 text-warning",
    Completed: "bg-success/10 text-success",
};

const priorityStyles = {
    Low: "text-base-content/60",
    Medium: "text-info",
    High: "text-warning",
    Urgent: "text-error",
};

export default function RecentTasks({ recentTasks = [] }) {
    return (
        <section className="card border border-base-300/80 bg-base-100 shadow-sm">
            <div className="card-body gap-4 p-4 tablet:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-bold text-base-content">
                            Recent Tasks
                        </h2>
                        <p className="mt-1 text-sm text-base-content/55">
                            Latest updates from your workspace
                        </p>
                    </div>

                    <GenericBtn
                        text="View all"
                        icon={<Icon name="arrow" size={16} />}
                        className="btn-ghost btn-sm text-primary"
                        to="/dashboard/tasks"
                    />
                </div>

                <div className="space-y-1">
                    {recentTasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex flex-col gap-3 rounded-xl border border-transparent p-3 transition-colors hover:border-base-300 hover:bg-base-200/50 tablet:flex-row tablet:items-center"
                        >
                            <div className="flex min-w-0 flex-1 items-center gap-3">
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-base-content">
                                        {task.title}
                                    </p>
                                    <p className="mt-1 truncate text-xs text-base-content/55">
                                        {task.project}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3 tablet:justify-end">
                                <span
                                    className={`badge border-0 ${priorityStyles[task.priority]}`}
                                >
                                    {task.priority}
                                </span>

                                <span
                                    className={`badge border-0 ${statusStyles[task.status]}`}
                                >
                                    {task.status}
                                </span>

                                <div className="flex items-center gap-1.5 text-xs text-base-content/60">
                                    <Icon name="calendar" size={14} />
                                    {task.dueDate}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}