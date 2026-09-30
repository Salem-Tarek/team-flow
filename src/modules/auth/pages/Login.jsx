import { Link } from "react-router-dom";

function Login() {
    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
                <label className="label text-xs font-semibold text-base-content/80 uppercase">
                    Email Address
                </label>
                <input
                    type="email"
                    placeholder="you@company.com"
                    className="input input-bordered w-full bg-base-200 focus:bg-base-100 text-base-content"
                />
            </div>

            <div>
                <label className="label text-xs font-semibold text-base-content/80 uppercase">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full bg-base-200 focus:bg-base-100 text-base-content"
                />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                    <span className="text-base-content/80">Remember me</span>
                </label>
                <a href="#forgot" className="text-primary hover:underline font-medium">
                    Forgot password?
                </a>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
                Sign In
            </button>

            <div className="text-center text-xs text-base-content/70 pt-2">
                Don't have an account?{" "}
                <Link to="/dashboard" className="text-primary hover:underline font-semibold">
                    Go to Dashboard
                </Link>
            </div>
        </form>
    );
}

export default Login;