
import GenericBtn from "~/components/GenericBtn/index.jsx";
import { useBreadcrumbStore } from "~/stores/breadcrumbStore.js";
import { useEffect } from 'react'
import Icon from '../components/Icon.jsx'
import TaskStatusChart from '../components/TaskStatusChart.jsx'
import WeeklyActivityChart from '../components/WeeklyActivityChart.jsx'
import RecentTasks from '../components/RecentTasks.jsx'

// Static data — replace with your MSW-backed API response later.
const stats = [
    {
        title: "Total Projects",
        value: 12,
        subtitle: "8 active projects",
        change: "+12%",
        icon: "folder",
        color: "text-primary",
        iconBg: "bg-primary/10",
        progress: 72,
        progressColor: "bg-primary",
    },
    {
        title: "Total Tasks",
        value: 86,
        subtitle: "24 in progress",
        change: "+8%",
        icon: "tasks",
        color: "text-primary",
        iconBg: "bg-primary/10",
        progress: 64,
        progressColor: "bg-primary",
    },
    {
        title: "Completed Tasks",
        value: 54,
        subtitle: "63% completion rate",
        change: "+18%",
        icon: "check",
        color: "text-success",
        iconBg: "bg-success/10",
        progress: 63,
        progressColor: "bg-success",
    },
    {
        title: "Team Members",
        value: 18,
        subtitle: "Across 4 teams",
        change: "+5%",
        icon: "users",
        color: "text-primary",
        iconBg: "bg-primary/10",
        progress: 80,
        progressColor: "bg-primary",
    },
];

function StatCard({ stat }) {
    return (
        <div className="card border border-base-300/80 bg-base-100 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="card-body gap-4 p-4 tablet:p-5">
                <div className="flex items-center justify-between gap-3">
                    <div
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.color}`}
                    >
                        <Icon name={stat.icon} size={23} />
                    </div>
                </div>

                <div>
                    <p className="text-sm font-medium text-base-content/65">
                        {stat.title}
                    </p>
                    <p className="mt-1 text-3xl font-bold tracking-tight text-base-content">
                        {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-base-content/55">
                        {stat.subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const { setBreadcrumbItems } = useBreadcrumbStore()
    useEffect(() => {
        setBreadcrumbItems([
            { to: "", label: "Dashboard" },
        ])
    }, [])

    return (
        <main className="min-h-full space-y-5 bg-base-200/50 p-3 mobile:p-4 tablet:space-y-6 tablet:p-6 desktop:p-7 large-desktop:p-8">
            {/* Welcome header */}
            <section className="relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-r from-secondary/45 via-base-100 to-primary/10 p-5 tablet:p-7 desktop:p-8">
                <div
                    className="pointer-events-none absolute -right-10 -top-16 size-52 rounded-full border-[28px] border-primary/5"
                    aria-hidden="true"
                />

                <div
                    className="pointer-events-none absolute -bottom-20 right-1/4 size-40 rounded-full bg-secondary/20 blur-2xl"
                    aria-hidden="true"
                />

                <div className="relative flex flex-col gap-5 tablet:flex-row tablet:items-center tablet:justify-between">
                    <div className="min-w-0">
                        <p className="mb-2 text-sm font-medium text-primary">
                            YOUR WORKSPACE
                        </p>

                        <h1 className="text-2xl font-bold tracking-tight text-base-content tablet:text-3xl">
                            Good morning, Salem!
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-base-content/65 tablet:text-base">
                            Here's an overview of your workspace. Keep your
                            team aligned and your projects moving forward.
                        </p>
                    </div>

                    <GenericBtn
                        text="Create Task"
                        icon={<Icon name="plus" size={19} />}
                        iconClass="order-first"
                        className="btn-primary w-full shrink-0 tablet:w-auto"
                        to="/dashboard/tasks?createtask=true"
                    />
                </div>
            </section>

            {/* Statistics */}
            <section
                className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-4"
                aria-label="Workspace statistics"
            >
                {stats.map((stat) => (
                    <StatCard key={stat.title} stat={stat} />
                ))}
            </section>

            {/* Analytics */}
            <section className="grid grid-cols-1 gap-5 desktop:grid-cols-2">
                <TaskStatusChart />
                <WeeklyActivityChart />
            </section>

            {/* Recent tasks */}
            <RecentTasks />
        </main>
    );
}
