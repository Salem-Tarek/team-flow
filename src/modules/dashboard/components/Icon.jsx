export default function Icon({ name, size = 20, className = "" }) {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className,
        "aria-hidden": true,
    };

    const icons = {
        folder: (
            <>
                <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <path d="M3 9h18" />
            </>
        ),
        tasks: (
            <>
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="m8 10 2 2 4-4" />
                <path d="M8 16h8" />
            </>
        ),
        check: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12 3 3 5-6" />
            </>
        ),
        users: (
            <>
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="10" cy="7" r="4" />
                <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </>
        ),
        chart: (
            <>
                <path d="M3 3v18h18" />
                <path d="m7 14 4-4 4 3 5-7" />
            </>
        ),
        list: (
            <>
                <path d="M9 6h11M9 12h11M9 18h11" />
                <circle cx="4" cy="6" r="1" />
                <circle cx="4" cy="12" r="1" />
                <circle cx="4" cy="18" r="1" />
            </>
        ),
        arrow: (
            <>
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
            </>
        ),
        plus: <path d="M12 5v14M5 12h14" />,
        calendar: (
            <>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 11h18" />
            </>
        ),
        trend: (
            <>
                <path d="m3 17 6-6 4 4 8-9" />
                <path d="M15 6h6v6" />
            </>
        ),
    };

    return <svg {...common}>{icons[name] || icons.chart}</svg>;
}