import GenericChart from '~/components/GenericChart/index.jsx'

const weeklyActivity = [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 72 },
    { day: "Wed", value: 55 },
    { day: "Thu", value: 88 },
    { day: "Fri", value: 65 },
    { day: "Sat", value: 35 },
    { day: "Sun", value: 48 },
];

export default function WeeklyActivityChart() {
    return (
        <section className="card border border-base-300/80 bg-base-100 shadow-sm">
            <div className="card-body gap-5 p-5 tablet:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-bold text-base-content">
                            Weekly Activity
                        </h2>
                        <p className="mt-1 text-sm text-base-content/55">
                            Tasks completed this week
                        </p>
                    </div>

                    <span className="badge badge-ghost">
                        This week
                    </span>
                </div>

                <GenericChart
                    type="bar"
                    data={weeklyActivity}
                    dataKey="value"
                    xKey="day"
                    height={240}
                />
            </div>
        </section>
    );
}