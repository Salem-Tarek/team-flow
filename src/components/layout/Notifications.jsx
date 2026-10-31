import useNotificationsStore from "~/stores/notificationsStore.js";
import { X } from "lucide-react";

function Notifications() {
    const { notifications, removeNotification } = useNotificationsStore();
    return (
        <div className="toast toast-top toast-end z-[999] max-h-[95vh] overflow-auto">
            {notifications.map((notification) => (
                <div key={notification.id} className={`grid grid-cols-[auto_20px] toaster toaster-${notification.type} justify-between items-center`}>
                    <span>{notification.message}</span>
                    <span onClick={() => removeNotification(notification.id)} className="cursor-pointer flex justify-center hover:opacity-80">
                        <X size={18} />
                    </span>
                </div>
            ))}
        </div>
    )
}

export default Notifications;