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
    );
}

export default Login;