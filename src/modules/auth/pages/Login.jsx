import { useLogin } from "../hooks/useAuth.js";
import GenericForm from '~/components/form/GenericForm.jsx'
import { loginFields } from "~/app/constants/fields.js";
import useNotificationsStore from "~/stores/notificationsStore.js";
import { useNavigate } from "react-router-dom";

function Login() {
    const { mutate: login, isPending } = useLogin();
    const { addSuccessNotification, addErrorNotification } = useNotificationsStore();
    const navigate = useNavigate();

    const handleSubmit = async (data, { reset }) => {
        login(data, {
            onSuccess: (res) => {
                addSuccessNotification(res.message);
                navigate("/dashboard");
                setTimeout(() => {
                    reset()
                }, 500)
            },
            onError: (error) => {
                addErrorNotification(error?.response?.data?.message || error?.message)
            },
        });
    };

    return (
        <GenericForm
            key={'login'}
            fields={loginFields}
            onSubmit={(data, { reset }) => handleSubmit(data, { reset })}
            isPending={isPending}
            submitLabel="Login"
        />
        // <form className="space-y-4" onSubmit={handleSubmit}>
        //     <div>
        //         <label className="label text-xs font-semibold text-base-content/80 uppercase">
        //             Email Address
        //         </label>
        //         <input
        //             type="email"
        //             placeholder="you@company.com"
        //             value={formData.email}
        //             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        //             className="input input-bordered w-full bg-base-200 focus:bg-base-100 text-base-content"
        //         />
        //     </div>

        //     <div>
        //         <label className="label text-xs font-semibold text-base-content/80 uppercase">
        //             Password
        //         </label>
        //         <input
        //             type="password"
        //             placeholder="••••••••"
        //             value={formData.password}
        //             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        //             className="input input-bordered w-full bg-base-200 focus:bg-base-100 text-base-content"
        //         />
        //     </div>

        //     <div className="flex items-center justify-between text-xs pt-1">
        //         <label className="flex items-center gap-2 cursor-pointer">
        //             <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
        //             <span className="text-base-content/80">Remember me</span>
        //         </label>
        //         <a href="#forgot" className="text-primary hover:underline font-medium">
        //             Forgot password?
        //         </a>
        //     </div>

        //     <button type="submit" className="btn btn-primary w-full mt-2">
        //         Sign In
        //     </button>

        //     <div className="text-center text-xs text-base-content/70 pt-2">
        //         Don't have an account?{" "}
        //         <Link to="/dashboard" className="text-primary hover:underline font-semibold">
        //             Go to Dashboard
        //         </Link>
        //     </div>
        // </form>
    );
}

export default Login;