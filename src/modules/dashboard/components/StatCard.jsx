import Icon from './Icon.jsx'

export default function StatCard({ stat }) {
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