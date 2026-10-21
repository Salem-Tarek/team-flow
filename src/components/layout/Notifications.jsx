import useNotificationsStore from "~/stores/notificationsStore.js";

function Notifications() {
    const { notifications, removeNotification } = useNotificationsStore();
    return (
        <div className="toast toast-top toast-end z-[999] max-h-[95vh] overflow-auto">
            {notifications.map((notification) => (
                <div key={notification.id} className={`grid grid-cols-[auto_20px] toaster toaster-${notification.type} justify-between items-center`}>
                    <span>{notification.message}</span>
                    <span onClick={() => removeNotification(notification.id)} className="cursor-pointer flex justify-center hover:opacity-80">
                        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
                    </span>
                </div>
            ))}
        </div>
    )
}

export default Notifications;