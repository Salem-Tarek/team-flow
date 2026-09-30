import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center gap-4 min-h-screen bg-base-200 text-base-content p-6">
            <div className="badge badge-error badge-lg py-4 px-6 text-sm font-semibold tracking-wider uppercase">
                404 Error
            </div>
            <h1 className="text-4xl font-extrabold text-base-content text-center">
                Page Not Found
            </h1>
            <p className="text-base-content/70 text-center max-w-md">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/dashboard">
                <button className="btn btn-primary mt-2">
                    Back to Dashboard
                </button>
            </Link>
        </div>
    );
}

export default NotFound;