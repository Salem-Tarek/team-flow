import { Outlet } from "react-router-dom";
import ThemeToggle from "~/components/ThemeToggle";
import lightLogo from '@/assets/images/light-logo.png'
import miniLightLogo from '@/assets/images/mini-light-logo.png'
import darkLogo from '@/assets/images/dark-logo.png'
import miniDarkLogo from '@/assets/images/mini-dark-logo.png'
import { NavLink } from "react-router-dom";

function DashboardLayout() {
    const Icon = ({ children }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
            {children}
        </svg>
    );

    const navItems = [
        {
            to: "/dashboard",
            label: "Dashboard",
            icon: (
                <Icon>
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                </Icon>
            ),
        },
        {
            to: "/dashboard/users",
            label: "Users",
            icon: (
                <Icon>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </Icon>
            ),
        },
        {
            to: "/dashboard/teams",
            label: "Teams",
            icon: (
                <Icon>
                    <path d="M18 21a8 8 0 0 0-16 0" />
                    <circle cx="10" cy="8" r="5" />
                    <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
                </Icon>
            ),
        },
        {
            to: "/dashboard/projects",
            label: "Projects",
            icon: (
                <Icon>
                    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                </Icon>
            ),
        },
        {
            to: "/dashboard/tasks",
            label: "Tasks",
            icon: (
                <Icon>
                    <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5" />
                    <path d="m9 11 3 3L22 4" />
                </Icon>
            ),
        },
        {
            to: "/dashboard/profile",
            label: "Profile",
            icon: (
                <Icon>
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </Icon>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-base-200 text-base-content transition-colors duration-200">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle inline" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300 justify-between sticky top-0 z-[9]">
                        <div className="flex items-center gap-2">
                            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-sm btn-square btn-ghost drawer-button">
                                {/* Sidebar toggle icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                            </label>
                            <div className="flex-1">
                                <img className="max-w-[100px] py-2" src={lightLogo} alt="" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <ThemeToggle />
                            <details className="dropdown dropdown-end">
                                <summary className="btn m-1">Salem Tarek</summary>
                                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li><a>Profile</a></li>
                                    <li><a>Settings</a></li>
                                    <li><a>Logout</a></li>
                                </ul>
                            </details>
                        </div>
                    </nav>
                    {/* Page content here */}
                    <div className="grow">
                        {/* Main Content Area */}
                        <main className="flex-1 p-6">
                            <Outlet />
                        </main>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="drawer-side is-drawer-close:overflow-visible border-e border-border">

                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        <div className="flex items-center justify-center w-full">
                            {/* Light mode logos */}
                            <img
                                className="max-w-[120px] py-2 hidden dark:hidden is-drawer-open:block dark:is-drawer-open:hidden"
                                src={lightLogo}
                                alt=""
                            />
                            <img
                                className="max-w-[40px] hidden dark:hidden is-drawer-close:block dark:is-drawer-close:hidden"
                                src={miniLightLogo}
                                alt=""
                            />

                            {/* Dark mode logos */}
                            <img
                                className="max-w-[120px] py-2 hidden is-drawer-open:dark:block"
                                src={darkLogo}
                                alt=""
                            />
                            <img
                                className="max-w-[40px] hidden is-drawer-close:dark:block"
                                src={miniDarkLogo}
                                alt=""
                            />
                        </div>
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow gap-1">
                            {navItems.map(({ to, label, icon }) => (
                                <li key={to}>
                                    <NavLink
                                        end
                                        to={to}
                                        data-tip={label}
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "menu-active" : ""}`
                                        }
                                    >
                                        {icon}
                                        <span className="is-drawer-close:hidden">{label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default DashboardLayout;