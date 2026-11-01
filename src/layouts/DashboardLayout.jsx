import { Outlet, Link } from "react-router-dom";
import ThemeToggle from "~/components/ThemeToggle";
import lightLogo from '@/assets/images/light-logo.png'
import miniLightLogo from '@/assets/images/mini-light-logo.png'
import darkLogo from '@/assets/images/dark-logo.png'
import miniDarkLogo from '@/assets/images/mini-dark-logo.png'
import { NavLink } from "react-router-dom";
import GenericBtn from "~/components/GenericBtn/index.jsx";
import { useConfirmContext } from "~/app/providers/ConfirmationProvider.jsx";
import { useBreadcrumbStore } from "~/stores/breadcrumbStore.js";
import useNotificationsStore from "~/stores/notificationsStore.js";
import { useQueryClient } from "@tanstack/react-query";
import Breadcrumb from "~/components/layout/Breadcrumb.jsx";
import { useLogout } from '~/modules/auth/hooks/useAuth.js'
import useAuthStore from '~/modules/auth/stores/authStore.js'
import { useNavigate } from "react-router-dom";
import { RefreshCcw, PanelLeftOpen, LayoutDashboard, Users, UserGroup, Folder, SquareCheckBig } from "lucide-react";

function DashboardLayout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { confirm } = useConfirmContext();
    const { breadcrumbItems } = useBreadcrumbStore();
    const { addSuccessNotification, addErrorNotification } = useNotificationsStore();
    const { mutate: logout } = useLogout();
    const { user } = useAuthStore();

    const navItems = [
        {
            to: "/dashboard",
            label: "Dashboard",
            icon: (
                <LayoutDashboard size={18} />
            ),
        },
        {
            to: "/dashboard/users",
            label: "Users",
            icon: (
                <Users size={18} />
            ),
        },
        {
            to: "/dashboard/teams",
            label: "Teams",
            icon: (
                <UserGroup size={18} />
            ),
        },
        {
            to: "/dashboard/projects",
            label: "Projects",
            icon: (
                <Folder size={18} />
            ),
        },
        {
            to: "/dashboard/tasks",
            label: "Tasks",
            icon: (
                <SquareCheckBig size={18} />
            ),
        },
        // {
        //     to: "/dashboard/profile",
        //     label: "Profile",
        //     icon: (
        //         <Icon>
        //             <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        //             <circle cx="12" cy="7" r="4" />
        //         </Icon>
        //     ),
        // },
    ];

    const clearAllDataUpdates = () => {
        localStorage.removeItem('users');
        localStorage.removeItem('tasks');
        localStorage.removeItem('projects');
        localStorage.removeItem('teams');
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["teams"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }

    const handleLogout = () => {
        logout({}, {
            onSuccess: (res) => {
                // navigate("/auth/login", { replace: true });
                // queryClient.clear();
                addSuccessNotification(res.message);
            },
            onError: (error) => {
                navigate("/auth/login", { replace: true });
                queryClient.clear();
                addErrorNotification(error?.response?.data?.message || error?.message);
            },
        });
    }

    const resetData = async () => {
        const ok = await confirm({
            modalHeader: 'Reset Data',
            confirmBtnText: 'Reset',
            message:
                <>
                    Are you sure you want to reset <span className="text-error font-bold">All the TeamFlow data</span> to be default dummy data?
                </>,
        });

        if (ok) {
            clearAllDataUpdates()
            addSuccessNotification('Data Reseted Successfully');
        }
    }

    return (
        <div className="min-h-screen bg-base-200 text-base-content transition-colors duration-200">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle inline" />
                <div className="drawer-content">
                    <nav className="navbar w-full bg-base-300 justify-between sticky top-0 z-[9]">
                        <div className="flex items-center gap-2">
                            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-sm btn-square btn-ghost drawer-button">
                                <PanelLeftOpen size={18} />
                            </label>
                            <div className="flex-1">
                                <img className="max-w-[100px] py-2" src={lightLogo} alt="" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <ThemeToggle />
                            <details className="dropdown dropdown-end">
                                <summary className="btn m-1">{user?.name || '-'}</summary>
                                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li><Link to="/dashboard/profile">Profile</Link></li>
                                    {/* <li><a>Settings</a></li> */}
                                    <li onClick={handleLogout}><span>Logout</span></li>
                                </ul>
                            </details>
                        </div>
                    </nav>
                    {/* Page content here */}
                    <div className="grow">
                        {/* Main Content Area */}
                        <main className="flex-1 p-6">
                            <div className="flex justify-end mb-6">
                                <Breadcrumb items={breadcrumbItems} />
                            </div>
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
                        <div className="px-2 w-full">
                            <GenericBtn data-tip="Reset All Data" textClass="is-drawer-close:hidden" text="Reset All Data" icon={
                                <RefreshCcw size={16} />
                            } onClick={() => resetData()} className="btn-sm btn-error w-full my-2 is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-error" />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default DashboardLayout;