import { Link, Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
        <div className="min-h-screen bg-base-200 text-base-content flex flex-col transition-colors duration-200">
            {/* Top Navbar */}
            <header className="bg-base-100 border-b border-base-300 px-6 py-4 flex items-center justify-between shadow-xs sticky top-0 z-30 transition-colors duration-200">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-content font-bold shadow-xs">
                        TF
                    </div>
                    <h1 className="text-xl font-bold text-base-content">TeamFlow</h1>
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center gap-6">
                    <Link
                        to="/dashboard"
                        className="text-base-content/70 hover:text-primary font-medium transition-colors"
                    >
                        Overview
                    </Link>
                    <Link
                        to="/dashboard/profile"
                        className="text-base-content/70 hover:text-primary font-medium transition-colors"
                    >
                        Profile
                    </Link>
                    <Link
                        to="/dashboard/settings"
                        className="text-base-content/70 hover:text-primary font-medium transition-colors"
                    >
                        Settings
                    </Link>
                </nav>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;