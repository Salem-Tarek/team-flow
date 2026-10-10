import { Outlet } from "react-router-dom";
import ThemeToggle from "~/components/ThemeToggle";
import lightLogo from '@/assets/images/light-logo.png'
import miniLightLogo from '@/assets/images/mini-light-logo.png'
import darkLogo from '@/assets/images/dark-logo.png'
import miniDarkLogo from '@/assets/images/mini-dark-logo.png'

function DashboardLayout() {
    return (
        <div className="min-h-screen bg-base-200 text-base-content transition-colors duration-200">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle inline" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300 justify-between sticky top-0 z-[999]">
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
                        <ul className="menu w-full grow">
                            {/* List item */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Home icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </button>
                            </li>

                            {/* List item */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                    {/* Settings icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                    <span className="is-drawer-close:hidden">Settings</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default DashboardLayout;