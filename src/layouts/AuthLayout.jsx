import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="min-h-screen grid grid-cols-1 desktop:grid-cols-2 bg-base-200 text-base-content transition-colors duration-200">
            {/* Left side: Image / Visual container */}
            <div className="w-full max-desktop:hidden flex items-center justify-center bg-base-300/50 p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/20 mix-blend-multiply z-10 pointer-events-none" />
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Auth visual"
                    className="max-w-full max-h-full h-full object-cover rounded-2xl shadow-xl z-0"
                />
            </div>

            {/* Right side: Form container */}
            <div className="w-full flex flex-col justify-center items-center p-8 bg-base-100 relative">
                <div className="w-full max-w-md">
                    {/* Dynamic Title / Form Content Container */}
                    <h2 className="text-2xl font-bold text-base-content mb-6 text-center">
                        Authentication Form
                    </h2>

                    {/* Child route form (Login, Signup, etc.) will render here */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;