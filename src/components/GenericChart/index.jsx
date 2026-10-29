
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

const DEFAULT_COLORS = [
    "#457b9d",
    "#e09f3e",
    "#47982c",
    "#a8dadc",
    "#e63946",
];

function GenericChart({
    type = "bar",
    data = [],
    dataKey = "value",
    nameKey = "name",
    xKey = "name",
    colors = DEFAULT_COLORS,
    height = 260,
}) {
    if (!data.length) {
        return (
            <div
                className="flex items-center justify-center rounded-lg bg-base-200/50 text-sm text-base-content/60"
                style={{ height }}
            >
                No chart data available
            </div>
        );
    }

    if (type === "donut") {
        return (
            <div className="w-full" style={{ height }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey={dataKey}
                            nameKey={nameKey}
                            cx="50%"
                            cy="50%"
                            innerRadius="62%"
                            outerRadius="82%"
                            paddingAngle={3}
                            stroke="none"
                        >
                            {data.map((item, index) => (
                                <Cell
                                    key={`${item[nameKey]}-${index}`}
                                    fill={
                                        item.color ||
                                        colors[index % colors.length]
                                    }
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value, name) => [value, name]}
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #d7e5ee",
                                backgroundColor: "#ffffff",
                                color: "#1d3557",
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }

    if (type === "bar") {
        return (
            <div className="w-full" style={{ height }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 8,
                            right: 8,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            stroke="#d7e5ee"
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey={xKey}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#1d3557", fontSize: 12 }}
                            dy={8}
                        />

                        <YAxis
                            allowDecimals={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#1d3557", fontSize: 12 }}
                        />

                        <Tooltip
                            cursor={{ fill: "#a8dadc", fillOpacity: 0.2 }}
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #d7e5ee",
                                backgroundColor: "#ffffff",
                                color: "#1d3557",
                            }}
                        />

                        <Bar
                            dataKey={dataKey}
                            name={dataKey}
                            fill={colors[0]}
                            radius={[6, 6, 0, 0]}
                            maxBarSize={42}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }

    return (
        <div
            className="flex items-center justify-center text-sm text-error"
            style={{ height }}
        >
            Unsupported chart type: {type}
        </div>
    );
}

export default GenericChart;
