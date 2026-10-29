
import GenericBtn from "~/components/GenericBtn/index.jsx";
import { useBreadcrumbStore } from "~/stores/breadcrumbStore.js";
import { useEffect } from 'react'
import Icon from '../components/Icon.jsx'
import TaskStatusChart from '../components/TaskStatusChart.jsx'
import WeeklyActivityChart from '../components/WeeklyActivityChart.jsx'
import RecentTasks from '../components/RecentTasks.jsx'
import StatCard from '../components/StatCard.jsx'
import { useDashboard } from '../hooks/index.js'

export default function Dashboard() {
    const { setBreadcrumbItems } = useBreadcrumbStore()
    const { data: dashboardData, isFetching: isLoading, refetch
    } = useDashboard();

    const { stats = [], taskStatuses = [], weeklyActivity = [], recentTasks = [] } = dashboardData?.data || {};

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
                <TaskStatusChart taskStatuses={taskStatuses} />
                <WeeklyActivityChart weeklyActivity={weeklyActivity} />
            </section>

            {/* Recent tasks */}
            <RecentTasks recentTasks={recentTasks} />
        </main>
    );
}
