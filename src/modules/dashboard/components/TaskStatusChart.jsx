import GenericChart from '~/components/GenericChart/index.jsx'

const taskStatuses = [
    { label: "To Do", count: 28, color: "#457b9d" },
    { label: "In Progress", count: 33, color: "#e09f3e" },
    { label: "In Review", count: 15, color: "#47982c" },
    { label: "Completed", count: 10, color: "#a8dadc" },
];

export default function TaskStatusChart() {
    const total = taskStatuses.reduce(
        (sum, status) => sum + status.count,
        0
    );

    let currentAngle = 0;

    const gradient = taskStatuses
        .map((status) => {
            const start = currentAngle;
            const percentage = (status.count / total) * 100;

            currentAngle += percentage;

            return `${status.color} ${start}% ${currentAngle}%`;
        })
        .join(", ");

    return (
        <section className="card h-full border border-base-300/80 bg-base-100 shadow-sm">
            <div className="card-body gap-5 p-5 tablet:p-6">
                <div>
                    <h2 className="text-lg font-bold text-base-content">
                        Task Status
                    </h2>
                    <p className="mt-1 text-sm text-base-content/55">
                        Distribution across all tasks
                    </p>
                </div>

                <div className="grid grid-cols-1 items-center gap-5 tablet:grid-cols-2 desktop:grid-cols-1 large-desktop:grid-cols-2">
                    <div className="relative min-w-0">
                        <GenericChart
                            type="donut"
                            data={taskStatuses}
                            dataKey="count"
                            nameKey="label"
                            height={220}
                        />

                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-base-content">
                                {total}
                            </span>
                            <span className="text-sm text-base-content/55">
                                Total tasks
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {taskStatuses.map((status) => (
                            <div
                                key={status.label}
                                className="flex items-center justify-between gap-3"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className="size-2.5 shrink-0 rounded-full"
                                        style={{
                                            backgroundColor: status.color,
                                        }}
                                    />

                                    <span className="text-sm text-base-content/75">
                                        {status.label}
                                    </span>
                                </div>

                                <div className="text-right">
                                    <span className="text-sm font-semibold text-base-content">
                                        {status.count}
                                    </span>
                                    <span className="ml-2 text-xs text-base-content/55">
                                        {Math.round(
                                            (status.count / total) * 100
                                        )}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}