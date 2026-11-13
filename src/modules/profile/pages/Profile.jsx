import { useState, useEffect } from "react";
import GenericForm from "~/components/form/GenericForm.jsx";
import GenericModal from "~/components/Modals/index.tsx";
import useAuthStore from "~/modules/auth/stores/authStore.js";
import { profileFields } from "~/app/constants/fields.js";
import GenericBtn from "~/components/GenericBtn/index.tsx";
import { useUpdateCurrentUser } from "~/modules/auth/hooks/useAuth.js";
import useNotificationsStore from "~/stores/notificationsStore.js";
import { useBreadcrumbStore } from "~/stores/breadcrumbStore.js";

function Row({ label, value }) {
    return (
        <div className="flex justify-between border-b border-base-200 py-3">
            <span className="text-base-content/60">{label}</span>
            <span className="font-medium">{value || "—"}</span>
        </div>
    );
}

function ProfilePage() {
    const user = useAuthStore((s) => s.user);
    const { mutate: updateProfileData, isPending } = useUpdateCurrentUser()
    const [formKey, setFormKey] = useState(0);
    const { addSuccessNotification, addErrorNotification } = useNotificationsStore();
    const { setBreadcrumbItems } = useBreadcrumbStore()

    const openModal = () => {
        setFormKey((k) => k + 1); // remount the form so it starts with the current data
        document.getElementById("profileModal").showModal();
    };

    const handleSubmit = (data, { reset }) => {
        // disabled inputs are not included in `data`, so merge with the old user
        updateProfileData(
            { id: user.id, name: data?.name, phone: data?.phone },
            {
                onSuccess: (res) => {
                    addSuccessNotification(res.message);
                    document.getElementById("profileModal").close();
                },
                onError: (error) => {
                    addErrorNotification(error?.response?.data?.message || error?.message)
                },
            }
        );
    };

    useEffect(() => {
        setBreadcrumbItems([
            { to: "/dashboard", label: "Dashboard" },
            { to: "", label: "Profile" }
        ])
    }, [])

    return (
        <div className="">
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="avatar avatar-placeholder">
                                <div className="w-14 rounded-full bg-primary text-primary-content">
                                    <span className="text-xl">{user?.name?.[0]?.toUpperCase()}</span>
                                </div>
                            </div>
                            <h2 className="card-title">{user?.name}</h2>
                        </div>
                        <GenericBtn text="Edit" className="btn-primary btn-sm px-8" onClick={openModal} />
                    </div>

                    <div className="mt-4">
                        <Row label="Name" value={user?.name} />
                        <Row label="Email" value={user?.email} />
                        <Row label="Phone" value={user?.phone} />
                        <Row label="Role" value={user?.role} />
                    </div>
                </div>
            </div>

            <GenericModal
                modalId="profileModal"
                modalHeader="Edit profile"
                footer={
                    <>
                        <GenericBtn text="Cancel" className="btn-sm brn-soft" />
                        <GenericBtn form="profile-form" className="btn-sm brn-soft btn-primary" text="Submit" />
                    </>
                }
            >
                <GenericForm
                    key={formKey}
                    id="profile-form"
                    fields={profileFields}
                    defaultValues={{ name: user?.name, email: user?.email, phone: user?.phone }}
                    onSubmit={(data, { reset }) => handleSubmit(data, { reset })}
                    showSubmitBtn={false}
                    isPending={isPending}
                    submitLabel="Save changes"
                />
            </GenericModal>
        </div>
    );
}

export default ProfilePage;
