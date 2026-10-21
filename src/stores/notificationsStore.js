import { create } from "zustand";

const useNotificationsStore = create((set, get) => ({
    notifications: [],
    addNotification: (notification) => {
        const id = Date.now();
        const newNotification = {
            id,
            ...notification
        }

        set((state) => ({ notifications: [...state.notifications, newNotification] }));
        setTimeout(() => {
            get().removeNotification(id);
        }, 5000);
    },
    addSuccessNotification: (message) => get().addNotification({ message, type: "success" }),
    addInfoNotification: (message) => get().addNotification({ message, type: "info" }),
    addWarningNotification: (message) => get().addNotification({ message, type: "warning" }),
    addErrorNotification: (message) => get().addNotification({ message, type: "error" }),
    removeNotification: (id) => set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
    clearNotifications: () => set({ notifications: [] }),
}));

export default useNotificationsStore;